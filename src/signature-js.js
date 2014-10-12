(function(exports){

  var SignatureJs = function() {
    this.script = this.CurrentlyExecutedScript();
    this.jafja = undefined;
    this.state = undefined;

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
          signature_chrome.promptText();
        }
      });

      jafja.bind('signature_chrome.text', function(text) {
        alert(text);
        // var payload = {x:1,y:1,content:text,page_number:1}
        //signature_document.AddTextElement(text);
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
