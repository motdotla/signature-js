(function(exports){

  var SignatureJs = function() {
    this.script = this.CurrentlyExecutedScript();
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
        console.log('signature_chrome.state.changed', result);
        _this.state = result.current;
      });

      jafja.bind('signature_document.fabric.clicked', function(result) {
        console.log('signature_document.fabric.clicked', result);
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
        signature_signing.drawTextElement(_this.text_element_json);
        // fire API request here to save the element to the db
        _this.text_element_json = {};
      });

      jafja.bind('signature_chrome.signature', function(url) {
        _this.signature_element_json.url = url;
        signature_signing.drawSignatureElement(_this.signature_element_json);
        // fire API request here to save the element to the db
        _this.signature_element_json = {};
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

  exports.SignatureJs = SignatureJs;

})(this);

var signature_js = new SignatureJs();
signature_js.init();
