(function(exports){

  var SignatureJs = function() {
    this.script = this.CurrentlyExecutedScript();
    this.signing_id = this.script.getAttribute("data-signature-signing-id");
    this.signature_api_root = "https://signature-api.herokuapp.com";
    this.jafja = undefined;
    this.state = undefined;
    this.text_element_json = {};
    this.signature_element_json = {};

    return this;
  };

  SignatureJs.prototype.init = function() {
    var _this = this;
    if (this.script) {
      this.script.className += " signature-js-script";
      this.script.id        = "signature-js-script-"+this.uuid;

      signature_document.jafja = jafja;
      signature_signing.jafja = jafja;
      signature_chrome.jafja = jafja;

      signature_document.init();

      jafja.bind('signature_document.rendered', function(result) {
        signature_signing.fabrics = result.fabrics;
        signature_signing.multiplier = result.multiplier;
        signature_signing.init();
        signature_chrome.init(signature_document.document);
      });

      jafja.bind('signature_chrome.state.changed', function(result) {
        _this.state = result.current;
      });

      jafja.bind('signature_document.object.modified', function(result) {
        var element_update_url;
        if (result.type == "signature_element") {
          element_update_url = _this.signature_api_root + "/api/v0/signature_elements/" + result.id + "/update.json";
        }
        if (result.type == "text_element") {
          element_update_url = _this.signature_api_root + "/api/v0/text_elements/" + result.id + "/update.json";
        }

        if (element_update_url) {
          _this.Post(element_update_url, result, function(resp) { });
        } else {
          console.error("Moved object but not updated");
        }
      });

      jafja.bind('signature_document.fabric.clicked', function(result) {
        if (_this.state === "text_mode") {
          _this.text_element_json.x = result.x;
          _this.text_element_json.y = result.y;
          _this.text_element_json.page_number = result.page_number;

          signature_chrome.promptText();
        }
        if (_this.state === "sign_mode") {
          _this.signature_element_json.x = result.x;
          _this.signature_element_json.y = result.y;
          _this.signature_element_json.page_number = result.page_number;

          signature_chrome.promptSignature();
        }
      });

      jafja.bind('signature_chrome.text', function(text) {
        _this.text_element_json.content = text;
        _this.text_element_json.signing_id = _this.signing_id;
        signature_signing.drawTextElement(_this.text_element_json, function(element) {
          var text_element_create_url = _this.signature_api_root + "/api/v0/text_elements/create.json";
          _this.Post(text_element_create_url, _this.text_element_json, function(resp) {
            element.text_element_id = resp.text_elements[0].id;
          });

          _this.text_element_json = {};
        });
      });

      jafja.bind('signature_chrome.signature', function(url) {
        _this.signature_element_json.url = url;
        _this.signature_element_json.signing_id = _this.signing_id;
        var element = signature_signing.drawSignatureElement(_this.signature_element_json, function(element) {
           var signature_element_create_url = _this.signature_api_root + "/api/v0/signature_elements/create.json";
          _this.Post(signature_element_create_url, _this.signature_element_json, function(resp) {
            element.signature_element_id = resp.signature_elements[0].id;
          });
         
          _this.signature_element_json = {};
        });
      });

      jafja.bind('signature_document.object.selected', function(result) {
        signature_chrome.setState(signature_document.document, "trash_mode");
      });

      jafja.bind('signature_signing.object.removed', function(result) {
        var element_delete_url;
        if (result.type == "signature_element") {
          element_delete_url = _this.signature_api_root + "/api/v0/signature_elements/" + result.id + "/delete.json";
        }
        if (result.type == "text_element") {
          element_delete_url = _this.signature_api_root + "/api/v0/text_elements/" + result.id + "/delete.json";
        }

        if (element_delete_url) {
          _this.Post(element_delete_url, result, function(resp) { });
        } else {
          console.error("Object unable to be deleted");
        }
      });

      jafja.bind('signature_chrome.trash_mode.clicked', function(result) {
        signature_signing.removeSelectedObject();
      });

    } else {
      console.error("Could not find script tag to initialize on.");
    }
  };

  SignatureJs.prototype.CurrentlyExecutedScript = function() {
    var script;

    if (document) {
      var scripts = document.getElementsByTagName('script');
      script      = scripts[scripts.length - 1];  
    }
    return script;
  };

  SignatureJs.prototype.Post = function(url, data, callback){
    // only pass string values to API
    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        data[k] = String(data[k]);
      }
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.onreadystatechange = function(){
      if (xmlhttp.readyState==4){
        if (xmlhttp.status==200){
          callback(JSON.parse(xmlhttp.responseText));
        } else {
          console.error("Ajax error");
        }
      }
    };

    xmlhttp.send(JSON.stringify(data));
  };

  exports.SignatureJs = SignatureJs;

})(this);

var signature_js = new SignatureJs();
signature_js.init();
