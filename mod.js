msr = {};
msr.mod = {};
msr.mod.options = [' none','menu_01','quickkeys_01','survey_01','messages_01','clock_01','links_01'];
msr.mod.defaults = ['menu_01','quickkeys_01','survey_01','messages_01','clock_01','links_01'];
msr.mod.options.sort();
msr.mod.list = function(){
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
  ba.onclick = msr.mod.listAdd;
  m.appendChild(ba);
  var bg = document.createElement('button');
  bg.innerHTML = 'Get';
  bg.onclick = msr.mod.get;
  m.appendChild(bg);
  m.appendChild(document.createElement('br'));
  document.body.appendChild(m);
  for (i = 0; i < msr.mod.defaults.length; i++) {
    msr.mod.listAdd(msr.mod.defaults[i]);
  }
};
msr.mod.listAdd = function(opt){
  if(typeof(opt)==='undefined'){opt=false;}
  var s = document.createElement('select');
  for (var i = 0; i < msr.mod.options.length; i++) {
    var o = document.createElement("option");
    o.value = msr.mod.options[i];
    o.text = msr.mod.options[i];
    if(opt===msr.mod.options[i]){
      o.selected = true;
    }
    s.appendChild(o);
  }
  document.getElementById('modPicker').appendChild(s);
  document.getElementById('modPicker').appendChild(document.createElement('br'));
  msr.mod.winResize();
};
msr.mod.get = function(){
  var d = document.getElementById('modPicker');
  var m = d.getElementsByTagName('select');
  var mval = [];
  for (i = 0; i < m.length; i++) {
    mval[i] = m[i].options[m[i].selectedIndex].value;
  }
  var e = document.getElementsByClassName('module');
  for (var i = 0; i < e.length; i++) {
    e[i].parentNode.removeChild(e[i]);
  }
  for (i = 0; i < mval.length; i++) {
    if(mval[i]!=' none'){
      msr.mod.append(mval[i]);
    }
  }
  msr.winDock();
};
msr.mod.append = function(name, before){
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
msr.mod.winResize = function(){
  var w = 200;
  var h = document.getElementById('modListForm').offsetHeight;
  document.getElementById('modListForm').style.width = w+'px';
  var x = (screen.availWidth-(w+10))/2;
  var y = (screen.availHeight-(h+10))/2;
  window.moveTo(x, y);
  window.resizeTo(w+10,h+10);
};
msr.winDock = function(dir){
  if(typeof(dir)==='undefined'){dir='left';}
  switch(dir){
    case 'left':
      window.moveTo(0,0);
      window.resizeTo(250,screen.availHeight);
      break;
    case 'right':
      window.moveTo(screen.availWidth-250,0);
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
msr.loadResource = function(filePath){
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
msr.loadResource('http://lfpnk0.github.io/ccmsr/style.css');
msr.mod.list();
