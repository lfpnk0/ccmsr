function init(){
  var el = document.createElement('link');
  el.setAttribute('rel', 'stylesheet');
  el.setAttribute('type', 'text/css');
  el.setAttribute('href', 'http://lfpnk0.github.io/ccmsr/msr.css');
  document.getElementsByTagName('head')[0].appendChild(el);
  alert('hi');
  el = document.createElement('iframe');
  el.src = 'http://lfpnk0.github.io/ccmsr/app';
  el.setAttribute('scrolling', 'no');
  el.setAttribute('application', 'yes');
  document.getElementsByTagName('body')[0].appendChild(element);
}
init();
