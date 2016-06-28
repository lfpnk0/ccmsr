  qk = new Object();
  qk.init = function(){
    $('.qk-parts').collapse({toggle: false});
  }
  qk.shell = new ActiveXObject("WScript.Shell");
  qk.sendKeys = function(key){
    this.shell.appActivate('CaptionNet');
    this.shell.SendKeys(key);
  }
  qk.init();
