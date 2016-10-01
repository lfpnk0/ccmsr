function collapse(mod){
 var c = document.getElementById('content').style.display;
 var s = document.getElementById('settings').style.display;
 if(s == 'block' || c == 'block'){
  document.getElementById('content').style.display = 'none';
  document.getElementById('settings').style.display = 'none';
  window.parent.document.getElementById(mod.id).height = '31 px';
 }
 else{
  document.getElementById('content').style.display = 'block';
  window.parent.document.getElementById(mod.id).height = mod.height;
 }
}
function settings(mod){
 var s = document.getElementById('settings').style.display;
 var c = document.getElementById('content').style.display;
 if(s == 'none' && c == 'none'){
   collapse(mod);
 }
 if(s == 'block'){
  document.getElementById('content').style.display = 'block';
  document.getElementById('settings').style.display = 'none';
 }
 if(c == 'block'){
  document.getElementById('content').style.display = 'none';
  document.getElementById('settings').style.display = 'block';
 }
}
function height(h){
 window.parent.document.getElementById('qk').height = h+'px';
 var arr = document.getElementsByClassName('scrollable');
 for (i = 0; i < arr.length; i++) { 
  arr[i].style.height = (h-38)+'px';
 }
 var el = document.getElementById('settings');
  el.getElementsByClassName('scrollable')[0].style.height = (h-76)+'px';
 }
function getSettings(){
  //var str = get file contents;
  var obj = JSON.parse(str);
  
}
function saveSettings(){
 var obj = new Object();
 var form = document.getElementById('settingsForm');
 for ( var i = 0; i < form.elements.length; i++ ) {
  var e = form.elements[i];
  if(e.tagName == 'select'){
   obj[e.name] = e.options[e.selectedIndex].value;
  }
  if(e.tagName == 'input'){
   obj[e.name] = e.value;
  }
 }
 alert(JSON.stringify(obj));
 //save file
}

  
  
  
  
  
  
  
  
  
