function init(){
  window.moveTo(screen.availWidth-227, 0);
  window.resizeTo(227, screen.availHeight);
  var h = screen.availHeight-40;
  document.getElementsByTagName('iframe')[0].height = h;
  document.getElementsByTagName('iframe')[0].contentWindow.document.body = h;
}
init();
