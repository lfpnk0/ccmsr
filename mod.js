  mod = new Object();
  mod.options = ['none','menu_01','quickkeys_01','survey_01','messages_01','clock_01','links_01'];
  mod.options.sort();
  mod.defaults = ['menu_01','quickkeys_01','survey_01','messages_01','clock_01','links_01'];
  mod.list = function(){
    var m = document.createElement('div');
    m.id = 'modListForm';
    var d = document.createElement('div');
    d.id = 'modPicker';
    m.appendChild(d);
    var ba = document.createElement('button');
    ba.innerHTML = 'Add';
    ba.onclick = mod.listAdd;
    m.appendChild(ba);
    var bg = document.createElement('button');
    bg.innerHTML = 'Get';
    bg.onclick = mod.Get;
    m.appendChild(bg);
    document.body.appendChild(m);
    for (var i = 0; i < mod.defaults.length; i++) {
      mod.listAdd(mod.defaults[i]);
    }
  }
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
  }
  mod.get = function(){
    var e = document.getElementsByClassName('module');
    for (var i = 0; i < e.length; i++) {
      e[i].parentNode.removeChild(e[i]);
    }
    var d = document.getElementById('modPicker');
    var m = d.getElementsByTagName('select');
    for (var i = 0; i < m.length; i++) {
      var mod = m[i].options[m[i].selectedIndex].value;
      if(mod!='false'){
        mod.append(mod);
      }
    }
  }
  mod.append = function(mod, before){
	  var url = 'http://lfpnk0.github.io/ccmsr/'+mod;
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
  		if (xhttp.readyState == 4 && xhttp.status == 200) {
			  var e = document.createElement('div');
			  e.className = 'module';a
			  e.innerHTML = xhttp.responseText;
			  if (typeof(before)==='undefined'){
			    document.body.appendChild(e);
			  }
			  else{
          document.body.insertBefore(e, before);
        }
		  }
	  };
	  xhttp.open('GET', url, true);
	  xhttp.send();
  }
  mod.list();
