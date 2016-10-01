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
      arr[i].style.height = (h-100)+'px';
      arr[i].style.backgroundColor = 'red';
    }
  }
