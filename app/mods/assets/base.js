/*************/
// Initialize Module
/*************/
function init(){
  var arr = ['base64.js','json2.js'];
	var el;
  for (var i = 0; i < arr.length; i++) {
    el = document.createElement('script')
    el.src='assets/'+arr[i];
    document.getElementsByTagName('body')[0].appendChild(el);
  }
	setTimeout(function(){ setReqData(); }, 1000);
}


/*************/
// UI Functions
/*************/
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
 for (var i = 0; i < arr.length; i++) { 
  arr[i].style.height = (h-38)+'px';
 }
 var el = document.getElementById('settings');
  el.getElementsByClassName('scrollable')[0].style.height = (h-76)+'px';
 }

/*************/
// Get/Save Settings
/*************/
function setReqData(){
  var urlArr = window.location.href.split('/'); 
  mod.set = new Object();
  mod.set.owner = urlArr[2].split('.')[0]; 
  mod.set.repo = urlArr[3]; 
  urlArr[6] = urlArr[6].replace(".htm", ".set"); 
  mod.set.path = urlArr[4]+'/'+urlArr[5]+'/'+urlArr[6];
  var url = 'https://api.github.com/repos/'+mod.set.owner+'/'+mod.set.repo+'/contents/'+mod.set.path+'?ref=gh-pages';
  var params = {'method':'GET', 'url':url, 'callback':setReqContent};
  httpReq(params);
}

function setReqContent(responseObj){
  if (!responseObj.hasOwnProperty('error')){
    mod.set.sha = responseObj.sha;
    var url = responseObj.download_url;
    var params = {'method':'GET', 'url':url, 'callback':setProcFile};
    httpReq(params);
  }
  else{
    log('reqSettings2: '+JSON.stringify(responseObj));
  }
}

function setProcFile(responseObj){
  if (!responseObj.hasOwnProperty('error')){
    mod.set.content = JSON.parse(atob(responseObj));
	var html = '';
	var o = mod.set.content
	for (var l in o) {
	  html = html+'<fieldset><legend>'+l+'</legend>';
	  for (var i = 0; i < o[l].length; i++) { 
	    //if(o[l][i].type == 'text'){
	    html = html+'<label for="'+o[l][i].name+'">'+o[l][i].label+'</label><input type="'+o[l][i].type+'" id="'+o[l][i].name+'" name="'+o[l][i].name+'" value="'+o[l][i].value+'" />';
	  }
	  html = html+'</fieldset>';
	}
	document.getElementById('settingsForm').innerHTML = html;
  }
  else{log('reqSettings3: '+JSON.stringify(responseObj));}
}

function setUpdate(auth){
  if (typeof auth === 'undefined'){authPrompt(setUpdate);}
  else{
    var url = 'https://api.github.com/repos/'+mod.set.owner+'/'+mod.set.repo+'/contents/'+path;
    var req = {'path':mod.set.path, 'message':'Updated from App', 'content':content, 'sha':mod.set.sha, 'branch':'gh-pages'};
	var json = new Object();
	var frm = document.getElementById('settingsForm');
	var fs = frm.getElementsByTagName('fieldset');
	var lgd, lab, el, obj;
	for (var i=0; i < fs.length; i++) {
	  lgd = fs[i].document.getElementsByTagName('legend')[0].innerHTML;
	  json[lgd] = [];
	  lab = fs[i].getElementsByClassName('label');
	  for (var j=1; j < lab; j++) {
	    el = document.getElementById(lab[j].htmlFor);
		obj = {'label':lab[j].innerHTML, 'type':el.type, 'name':el.name, 'value':el.value};
	    json[lgd].push(obj);
	  }
    }	
    var content = window.btoa(json);
    var params = {'method':'PUT', 'url':url, 'auth':auth, 'req':req, 'callback':setReqData}
    httpReq(params);
  }
}

/*************/
// CORS Functions
/*************/
function authPrompt(callback){
  var html='<fieldset style="text-align:center; width:100px;" >'+
    '<legend>GitHub Credentials</legend>'+
    '<label>Username</label>'+
    '<input type="text" id="authPromptUser" />'+
    '<label>Password</label>'+
    '<input type="password" id="authPromptPass" disabled="disabled" />'+
    '<input type="button" id="authPromptGo" value="Submit" disabled="disabled" />'+
	'<input type="button" id="authPromptCan" value="Cancel" />'+
    '</div>';
  var el = document.createElement('div');
  div.id = 'authPrompt';
  el.style.cssText = 'position:fixed; top:0; width:100%; background-color: light-gray;';
  el.innerHTML = html;
  document.getElementsByTagName('body')[0].appendChild(el);
  document.getElementById('authPromptUser').onchange = function(){document.getElementById('authPromptPass').disabled=false;};
  document.getElementById('authPromptPass').onchange = function(){document.getElementById('authPromptGo').disabled=false;};
  document.getElementById('authPromptGo').onclick = function(){var auth = window.btoa(document.getElementById('authPromptUser').value+':'+document.getElementById('authPromptPass').value); callback(auth);};
  document.getElementById('authPromptCan').onclick = function(){el=document.getElementById('authPrompt');el.parentNode.removeChild(el);};
}

//  GitHub API V3 Requests
//
//  [ACTION]  [METHOD] [URL https://api.github.com...]                 [B64 ENCODED JSON REQUEST]
//  Delete 	  DELETE   /repos/:owner/:repo/contents/:path	             {path, message, sha, branch}
//  Update 	  PUT      /repos/:owner/:repo/contents/:path	             {path, message, content, sha, branch}
//  New		     PUT      /repos/:owner/:repo/contents/:path	             {path, message, content, branch}
//  Details	  GET      /repos/:owner/:repo/contents/:path?ref=:branch
//  Content   GET      download_url

function httpReq(params){ //params = {method,url,auth,req,callback}
  var filename = 'httpReq'+new Date().getTime();
  var retObj = new Object();
  if (!params.hasOwnProperty('method')){
    responseObj = '{"error":{"code":000},"response":{"message":"No Method provided to httpReq()"}}';
  }
  if(params.method == "PUT" || params.method == "POST" || params.method == "DELETE"){
   if (!params.hasOwnProperty('req')){
     responseObj = '{"error":{"code":000},"response":{"message":"No Request provided to httpReq()"}}';
   }
  }
  if (!params.hasOwnProperty('url')){
    responseObj = '{"error":{"code":000},"response":{"message":"No URL Provided to httpReq()"}}';
  }
  else{
    var shell = new ActiveXObject("WScript.Shell"); 
    var TEMP = shell.ExpandEnvironmentStrings("%TEMP%") 
    var fso = new ActiveXObject("Scripting.FileSystemObject"); 
    var f = fso.CreateTextFile(TEMP+'/'+filename+'.vbs', true);     
    f.WriteLine('Set objHTTP = CreateObject("MSXML2.ServerXMLHTTP")'); 
    f.WriteLine('objHTTP.Open '+params.method+', '+params.url+', false');
    if (!params.hasOwnProperty('auth')){
      f.WriteLine('objHTTP.setRequestHeader "Authorization", "Basic '+params.auth+'"');
    }
    if(params.method == "PUT" || params.method == "POST" || params.method == "DELETE"){
      f.WriteLine(' objHTTP.send ('+params.req+')');
    }
    else{
      f.WriteLine(' objHTTP.send ()');
    }
    f.WriteLine('If objHTTP.Status >= 400 And objHTTP.Status <= 599 Then'); 
    f.WriteLine(' WScript.Echo "{\'error\':{\'code\':" & objHTTP.status & "},\'response\':" & objHTTP.ResponseText & "}"'); 
    f.WriteLine('Else'); 
    f.WriteLine(' WScript.Echo objHTTP.ResponseText'); 
    f.WriteLine('End If'); 
    f.Close(); 
    var cmd = 'cscript //nologo %TEMP%/'+filename+'.vbs'; 
    var shell = new ActiveXObject("WScript.Shell"); 
    var com = shell.exec(cmd); 
    responseObj = com.StdOut.ReadAll();
    fso.DeleteFile(TEMP+'/'+filename+'.vbs');
  }
  params.callback(responseObj);
}
