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
 var urlArr = window.location.href.split('/');
 var user = urlArr[2].split('.')[0];
 var repo = urlArr[3];
 var branch = 'gh-pages';
 urlArr[6] = urlArr[6].replace(".htm", ".set");
 var path = urlArr[4]+'/'+urlArr[5]+'/'+urlArr[6];
 mod.settings = file(user, repo, branch, path);
}

function file(user, repo, branch, path){
 this.requireVBA = function(){
  var shell = new ActiveXObject("WScript.Shell");
  var UP = shell.ExpandEnvironmentStrings("%UserProfile%")
  var fs = new ActiveXObject("Scripting.FileSystemObject");
  if(!fs.FileExists(UP+'/Downloads/http.vbs')){
   var f = fso.CreateTextFile(UP+'/Downloads/http.vbs', true);    
   f.WriteLine('args = Split(Wscript.Arguments(0),",")');
   f.WriteLine('method = args(0)');
   f.WriteLine('auth = args(1)');
   f.WriteLine('url = args(2)');
   f.WriteLine('branch = args(3)');
   f.WriteLine('sha = args(4)');
   f.WriteLine('file = args(5)');
   f.WriteLine('Set objHTTP = CreateObject("MSXML2.ServerXMLHTTP")');
   f.WriteLine('objHTTP.Open method, URL, False');
   f.WriteLine('objHTTP.setRequestHeader "Authorization", "Basic " & auth');
   f.WriteLine('If method = "PUT" Then');
   f.WriteLine(' json = "{" &_');
   f.WriteLine('  chr(34) & "message" & chr(34) & ": " & chr(34) & "updated via app" & chr(34) & "," & _');
   f.WriteLine('  chr(34) & "content" & chr(34) & ": " & chr(34) & file & chr(34) & ", " & _');
   f.WriteLine('  chr(34) & "branch" & chr(34) & ": " & chr(34) & branch & chr(34) & ", " & _');
   f.WriteLine('  chr(34) & "sha" & chr(34) & ": " & chr(34) & sha & chr(34) & "}"');
   f.WriteLine(' objHTTP.send (json)');
   f.WriteLine('Else');
   f.WriteLine(' objHTTP.send ()');
   f.WriteLine('If objHTTP.Status >= 400 And objHTTP.Status <= 599 Then');
   f.WriteLine(' Wscript.Echo "{\'error\':{\'code\':" & objHTTP.status & "},\'response\':{" & objHTTP.ResponseText & "}"');
   f.WriteLine('Else');
   f.WriteLine(' Wscript.Echo objHTTP.ResponseText');
   f.WriteLine('End If');
   f.Close();
  }
 }
 var arr = path.split('/')
 this.name = arr[arr.length-1];
 this.user = user;
 this.repo = repo;
 this.branch = branch;
 this.path = path;
 this.getDetails = function(){
  var url = 'https://api.github.com/repos/'+this.user+'/'+this.repo+'/contents/'+this.path+'?ref='+this.branch+'&callback='+this.storeDetails;
  var scriptTag = document.createElement("SCRIPT");
  scriptTag.src = url;
  document.getElementsByTagName('BODY')[0].appendChild(scriptTag);
 }
 this.storeDetails = function(ghObj){
  this.sha = ghObj.data.sha;
  this.download_url = ghObj.download_url;
 }
 this.getContent = function(){
  this.requireVBA();
  var method = 'GET';
  var auth = 'dXNlcjpwYXNz'; //user:pass
  var file = 'bnVsbA=='; //null
  var cmd = 'cscript //nologo %USERPROFILE%/Downloads/http.vbs "'+method+','+auth+','+this.download_url+','+this.branch+','+this.sha+','+file+'"';
  var shell = new ActiveXObject("WScript.Shell");
  var com = shell.exec(cmd);
  this.content = StdOut.ReadAll();
 }
 this.updateContent = function(txt){
  this.requireVBA();
  var method = 'PUT';
  var usr = prompt('Username');
  var pwd = prompt('Password');
  var auth = btoa(usr+':'+pwd);
  var url = 'https://api.github.com/repos/'+this.user+'/'+this.repo+'/contents/'+this.path;
  var path = btoa(txt);
  var cmd = 'cscript //nologo %USERPROFILE%/Downloads/http.vbs "'+method+','+auth+','+url+','+this.branch+','+this.sha+','+file+'"';
  var com = shell.exec(cmd);
  var ghObj = StdOut.ReadAll();
  this.getDetails();
 }
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
 var content = JSON.stringify(obj);
 var b64 = window.btoa(content);
 mod.settings.updateContent(b64);
}
