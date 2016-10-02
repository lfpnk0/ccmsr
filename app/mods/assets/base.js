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

function getSettings(obj){
 var urlArr = window.location.href.split('/');
 var obj.settings.user = urlArr[2].split('.')[0];
 var obj.settings.repo = urlArr[3];
 var obj.settings.branch = 'gh-pages';
 var obj.settings.path = urlArr[4]+'/'+urlArr[5]+'/'+urlArr[6];
 getFileData(obj.settings.user, obj.settings.repo, obj.settings.branch, obj.settings.path, obj.settings, 'processData');
}

function getFileData(user, repo, branch, path, fileObj, callback){ //JSONP Method
 var url = 'https://api.github.com/repos/'+user+'/'+repo+'/contents/'+path+'?ref='+branch+'&callback='+callback;
 var scriptTag = document.createElement("SCRIPT");
 scriptTag.src = url;
 document.getElementsByTagName('BODY')[0].appendChild(scriptTag);
}

function processData(obj){
 /* callback function only has object from github ... need to know which module it is for
 obj.sha = obj.data.sha;
 obj.download_url = obj.download_url;
 */
}
/* ---ACCESS DENIED ERROR ---
function getFileData(user, repo, branch, path, fileObj, callback){ //XMLHttpRequest mehod
 var url = 'https://api.github.com/repos/'+user+'/'+repo+'/contents/'+path+'?ref='+branch;
 var xmlhttp = new XMLHttpRequest();
 xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   var obj = JSON.parse(this.responseText);
   fileObj.user = user;
   fileObj.repo = repo;
   fileObj.branch = branch;
   fileObj.path = path;
   fileObj.sha = obj.sha;
   fileObj.download_url = obj.download_url;
   //if(typeof callback === 'function'){
    //callback(fileObj);
   //}
  }
 };
 xmlhttp.open('GET', url, true);
 xmlhttp.send();
}

function getFileContent(fileObj){
 var url = fileObj.download_url;
 var xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     fileObj.content = this.responseText;
    }
   };
   xmlhttp.open('GET', url);
   xmlhttp.send();
}
*/

/* ---ERROR ??? ---
function getFileData(user, repo, branch, path, fileObj, callback){ //XDomainRequest method
 var url = 'https://api.github.com/repos/'+user+'/'+repo+'/contents/'+path+'?ref='+branch;
 var xhr = new XDomainRequest();
 xhr.onprogress = function () { };
 xhr.timeout = 10000;
 xhr.ontimeout = function () {alert('XDomainRequest timed out');};
 xhr.onerror = function(err){alert('XDomainRequest Error');};
 xhr.onload = function(){
  var obj = JSON.parse(this.responseText);
  fileObj.user = user;
  fileObj.repo = repo;
  fileObj.branch = branch;
  fileObj.path = path;
  fileObj.sha = obj.sha;
  fileObj.download_url = obj.download_url;
  //if(typeof callback === 'function'){
   //callback(fileObj);
  //}
 };
 xhr.open('GET', url);
 setTimeout(function () {xhr.send();}, 0); //wrap in timeout for ie9?
}
 
function getFileContent(fileObj){
 var url = fileObj.download_url;
 var xmlhttp = new XDomainRequest();
 xmlhttp.onprogress = function () { };
 xmlhttp.ontimeout = function () { };
 xmlhttp.onload = function(){
  fileObj.content = this.responseText;
 };
 xmlhttp.open('GET', url);
 setTimeout(function () {xmlhttp.send();}, 0); //wrap in timeout for ie9?
}
*/


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
 var url = window.location.href.split('/');
 var user = url[2].split('.')[0];
 var pwd = prompt('Password:',''); // I know this is horribly insecure but I don't want to code the popup right now.
 var repo = 'ccmsr';
 var branch = 'gh-pages';
 var file = url[6].split('.')[0];
 var path = 'app/mods/'+file+'.set';
 var content = JSON.stringify(obj);
 var b64 = window.btoa(content);
 var comment = 'updated settings';
 alert('need to fix the req variable in your saveSettings function.  Need to include the SHA of the existing file in update request');
 /*
 var req = {'message': 'updated settings', 'content': b64, 'sha': "329688480d39049927147c162b9d2deaf885005f"}
 
 var xmlhttp = new XMLHttpRequest();
 xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   document.getElementById("demo").innerHTML =
   this.responseText;
  }
 };
 xmlhttp.open('PUT', 'https://api.github.com/users/'+user+'/'+repo+'/contents/'+path, true);
 xmlhttp.send(req);
*/
}
