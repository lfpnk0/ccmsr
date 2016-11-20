function init(){
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
//get settings
  // GET|http://lfpnk0.github.io/ccmsr/app/app.set||
  parent.window.moveTo(screen.availWidth-225, 0); //position should come from settings
  parent.window.resizeTo(225, screen.availHeight); //width should come from settings
  parent.document.getElementsByTagName('iframe')[0].height = screen.availHeight; //height should come from settings
}
init();
// github fs
function getGhFile(){
  //GET /repos/:owner/:repo/readme
  var shell = new ActiveXObject('WScript.Shell'); 
  var path = shell.ExpandEnvironmentStrings('%TEMP%')+'\\msr\';
  var fname = Date.now();
  var fso = new ActiveXObject('Scripting.FileSystemObject');
  var f = fso.CreateTextFile(path+fname+'.req', true);
  f.write('GET|'+url+'||'+auth);
  f.close();
  var cmd = 'cscript /nologo '+path+'xmlHTTP.js '+fname;
  shell.exec(cmd);
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
