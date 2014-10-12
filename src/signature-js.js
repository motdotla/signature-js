(function(exports){

  var SignatureJs = function() {
    this.script = this.CurrentlyExecutedScript();
    this.jafja = undefined;

    return this;
  };

  SignatureJs.prototype.init = function() {
    if (this.script) {
      this.script.className += " signature-js-script";
      this.script.id        = "signature-js-script-"+this.uuid;

      signature_document.jafja = jafja;
      signature_signing.jafja = jafja;
      signature_chrome.jafja = jafja;

      signature_document.init();

      jafja.bind('signature_document.rendered', function(values) {
        signature_signing.fabrics = values.fabrics;
        signature_signing.multiplier = values.multiplier;
        signature_signing.init();
        signature_chrome.init(signature_document.document);
      });

      jafja.bind('signature_chrome.state.changed', function(result) {
        console.log('signature_chrome.state.changed', result);
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
