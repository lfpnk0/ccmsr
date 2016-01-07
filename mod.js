mod = {};
mod.options = [' none','menu_01','quickkeys_01','survey_01','messages_01','clock_01','links_01'];
mod.options.sort();
mod.defaults = ['menu_01','survey_01','survey_01','messages_01','clock_01','links_01'];
mod.list = function(){
  var e = document.getElementsByClassName('module');
  for (var i = 0; i < e.length; i++) {
    e[i].parentNode.removeChild(e[i]);
  }
  var m = document.createElement('div');
  m.id = 'modListForm';
  m.className = 'module';
  var d = document.createElement('div');
  d.id = 'modPicker';
  m.appendChild(d);
  m.appendChild(document.createElement('br'));
  var ba = document.createElement('button');
  ba.innerHTML = 'Add';
  ba.onclick = mod.listAdd;
  m.appendChild(ba);
  var bg = document.createElement('button');
  bg.innerHTML = 'Get';
  bg.onclick = mod.get;
  m.appendChild(bg);
  document.body.appendChild(m);
  for (i = 0; i < mod.defaults.length; i++) {
    mod.listAdd(mod.defaults[i]);
  }
};
mod.listAdd = function(opt){
  if(typeof(opt)==='undefined'){opt=false;}
  var s = document.createElement('select');
  for (var i = 0; i < mod.options.length; i++) {
    var o = document.createElement("option");
    o.value = mod.options[i];
    o.text = mod.options[i];
    if(opt===mod.options[i]){
      o.selected = true;
    }
    s.appendChild(o);
  }
  document.getElementById('modPicker').appendChild(s);
  document.getElementById('modPicker').appendChild(document.createElement('br'));
  mod.winResize();
};
mod.get = function(){
  var d = document.getElementById('modPicker');
  var m = d.getElementsByTagName('select');
  for (i = 0; i < m.length; i++) {
    var mval = m[i].options[m[i].selectedIndex].value;
  }
  var e = document.getElementsByClassName('module');
  for (var i = 0; i < e.length; i++) {
    e[i].parentNode.removeChild(e[i]);
  }
  for (i = 0; i < mval.length; i++) {
    if(mval!=' none'){
      mod.append(mval);
    }
  }
  mod.winDock();
};
mod.append = function(name, before){
  url = 'https://api.github.com/repos/lfpnk0/ccmsr/contents/'+name+'/index.htm?ref=gh-pages';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.setRequestHeader("Accept", "application/vnd.github.3.raw");
  xhr.send();
  xhr.onload = function(){
    var e = document.createElement('div');
    e.className = 'module';
    e.innerHTML = xhr.responseText;
    if (typeof(before)==='undefined'){
      document.body.appendChild(e);
    }
    else{
      document.body.insertBefore(e, before);
    }
  };
};
mod.winResize = function(){
  var w = 200;
  var h = document.getElementById('modListForm').offsetHeight;
  document.getElementById('modListForm').style.width = w+'px';
  var x = (screen.availWidth-(w+10))/2;
  var y = (screen.availHeight-(h+10))/2;
  window.moveTo(x, y);
  window.resizeTo(w+10,h+10);
};
mod.winDock = function(dir){
  if(typeof(dir)==='undefined'){dir='left';}
  switch(dir){
    case 'left':
      window.moveTo(0,0);
      window.resizeTo(250,screen.availHeight);
      break;
    case 'right':
      window.moveTo(250-screen.availWidth,0);
      window.resizeTo(250,screen.availHeight);
      break;
    case 'top':
      window.moveTo(0,0);
      window.resizeTo(screen.availWidth,250);
      break;
    case 'bottom':
      window.moveTo(0,screen.availHeight-250);
      window.resizeTo(screen.availWidth,250);
      break;
  }
};
mod.loadResource = function(filePath){
  var e;
  var ext = filePath.substr(filePath.lastIndexOf('.'),4);
  switch(ext){
    case '.js':
      e=document.createElement('script');
      e.setAttribute('type','text/javascript');
      e.setAttribute('src', filePath);
      break;
    case '.css':
      e=document.createElement('link');
      e.setAttribute('rel', 'stylesheet');
      e.setAttribute('type', 'text/css');
      e.setAttribute('href', filePath);
  }
  document.getElementsByTagName('head')[0].appendChild(e);
};
mod.loadResource('http://lfpnk0.github.io/ccmsr/style.css');
mod.list();
