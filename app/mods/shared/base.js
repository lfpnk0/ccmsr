  function collapse(){
   var c = document.getElementById('content').style.display;
   var s = document.getElementById('settings').style.display;
   if(s == 'block' || c == 'block'){
    document.getElementById('content').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
   }
   else{
    document.getElementById('content').style.display = 'block';
   }
  }
  function settings(){
   var s = document.getElementById('settings').style.display;
   if(s == 'block'){
    document.getElementById('content').style.display = 'block';
    document.getElementById('settings').style.display = 'none';
   }
   else{
    document.getElementById('content').style.display = 'none';
    document.getElementById('settings').style.display = 'block';
   }
  }
