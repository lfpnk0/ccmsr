app = new Object();
app.int = [];
function init(){
  // set focus to password field
  document.getElementById("pwd").focus();
  // enable XMLHttp
  var shell = new ActiveXObject('WScript.Shell'); 
  var path = shell.ExpandEnvironmentStrings('%TEMP%')+'\\msr';
  var fso = new ActiveXObject('Scripting.FileSystemObject');
  if (!fso.FolderExists(path)){
    fso.CreateFolder(path);
  }
  var f = fso.CreateTextFile(path+'//xmlHTTP.js', true);
  var str = "function myHTTP(id){ var shell = new ActiveXObject('WScript.Shell'); var path = shell.ExpandEnvironmentStrings('%TEMP%')+'\\msr\\'+id; var fso = new ActiveXObject('Scripting.FileSystemObject'); var f = fso.OpenTextFile(path+'.req', 1); var t = f.ReadAll(); f.close(); var p = t.split('|'); f = fso.CreateTextFile(path+'.res', true); if(p.length = 4){   var req = new ActiveXObject('MSXML2.ServerXMLHTTP');   req.open(p[0], p[1], 'false');   if(p[3].length>0){    req.setRequestHeader('Authorization', 'Basic '+p[3]);   }   req.send(p[2]);   if (req.readyState == 4) {        f.write(req.responseText);   } }  else{  f.write('not enough parameters'); } f.close();}myHTTP(WScript.arguments(0))";
  f.write(str);
  f.close();
  parent.window.moveTo(screen.availWidth-225, 0); //position should come from settings
  parent.window.resizeTo(225, screen.availHeight); //width should come from settings
  parent.document.getElementsByTagName('iframe')[0].height = screen.availHeight; //height should come from settings
}
init();
/*
//polyfills
function atob(){
}
function btoa(){
}
JSON = new Object();
function JSON.stringify(){
}
function JSON.parse(){
}
// github fs
function login(){
  document.getElementById('login-form').style.height = '0px';
  document.getElementById('login-splash').style.height = '100%';
  document.getElementById('uname-text').innerHTML = document.getElementById('uname').value;
  // get settings
  var params = {'path':'app/app.set', 'callback':procAppSet, 'action':'get'}
  ghFile(params);
  // get modules
}
function logout(){
  document.getElementById('login-splash').style.height = '0px';
  document.getElementById('login-form').style.height = '100%';
  document.getElementById('uname-text').innerHTML = '';
  var mods = document.getElementsByTagname('iframe');
  for (i = 0; i < mods.length; i++) {
    mods[i].parentElement.removeChild(mods[i]);
  }
}
function ghFile(p){
  p.auth = atob(document.getElementById('uname').value+':'+document.getElementById('pwd').value);
  if(!('owner' in p)){p.owner = 'lfpnk0';}
  if(!('repo' in p)){p.repo = 'ccmsr';}
  if(!('branch' in p)){p.branch = 'gh-pages';}
  p.url = 'https://api.github.com/repos/'+p.owner+'/'+p.repo+'/'+p.path+'?ref='+p.branch;
  var shell = new ActiveXObject('WScript.Shell'); 
  p.path = shell.ExpandEnvironmentStrings('%TEMP%')+'\\msr\';
  p.id = Date.now();
  var fso = new ActiveXObject('Scripting.FileSystemObject');
  var f = fso.CreateTextFile(p.path+p.id+'.req', true);
  f.write('GET|'+p.url+'||'+p.auth);
  f.close();
  var cmd = 'cscript /nologo '+p.path+'xmlHTTP.js '+p.id;
  shell.exec(cmd);
  if(p.action=='get'){
    var int = setInterval(function(){
      if(fso.FileExists(p.path+p.id+'.res')){
        fso.DeleteFile(p.path+'.req', true);
        getGhFile(p);
        clearInterval(int);
      }
    },1000);
  }
  if(p.action=='upd'){
    var int = setInterval(function(){
      if(fso.FileExists(p.path+p.id+'.res')){
        fso.DeleteFile(p.path+p.id+'.req', true);
        updGhFile(p.id);
        clearInterval(int);
      }
    },1000);
  }
}
function getGhFile(p){
  var fso = new ActiveXObject('Scripting.FileSystemObject');
  var f = fso.OpenTextFile(p.path+'.req', 1);
  var t = f.ReadAll(); 
  f.close();
  fso.DeleteFile(p.path+'.res', true);
  var obj = JSON.parse(t);
  p.url = obj.download_url;
  var f = fso.CreateTextFile(p.path+p.id'.req', true);
  f.write('GET|'+p.url+'||'+p.auth);
  f.close();
  var cmd = 'cscript /nologo '+p.path+'xmlHTTP.js '+p.id;
  var shell = new ActiveXObject('WScript.Shell');
  shell.exec(cmd);
  if('callback' in p){
    var int = setInterval(function(){
      if(fso.FileExists(p.path+p.id+'.res')){
        fso.DeleteFile(p.path+p.id+'.req', true);
        p.callback(p.id);
        clearInterval(int);
      }
    },1000);
  }
}
function updGhFile(){
  //PUT /repos/:owner/:repo/contents/:path
}

function toggleSettings(){
  if(document.getElementById('header').offsetHeight>40){
    document.getElementById('header').style.height = '40px';
  }
  else{
    document.getElementById('header').style.height = '100px';
  }
}
*/
