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
  var el = form.elements[i];
  if(el.tagName == 'SELECT'){
   obj[el.name] = el.options[el.selectedIndex].value;
  }
  if(el.tagName == 'INPUT'){
   obj[el.name] = el.value;
  }
 }
 var str = JSON.stringify(obj);
 var url = window.location.href.split('/');
 var user = url[2].split('.')[0];
 var branch = 'gh-pages';
 var path = 'ccmsr/app/mods/'+window.location.href.split('/').pop();
 alert(user+' '+path);
 
 
 /*
 var github = new Github({
   username: 'YOUR_USERNAME',
   password: 'YOUR_PASSWORD',
   auth: 'basic'
 });
 var repository = github.getRepo('A_USERNAME', 'A_REPOSITORY_NAME');
 repository.write(
    'BRANCH_NAME', // e.g. 'master'
    'path/to/file', // e.g. 'blog/index.md'
    'THE_CONTENT', // e.g. 'Hello world, this is my new content'
    'YOUR_COMMIT_MESSAGE', // e.g. 'Created new index'
    function(err) {}
 );
 */
}

  
  
  
  
  
  
  
  
  
