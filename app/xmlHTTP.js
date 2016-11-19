function myHTTP(id){
 var shell = new ActiveXObject('WScript.Shell');
 var path = shell.ExpandEnvironmentStrings('%TEMP%')+'\\msr\\'+id;
 var fso = new ActiveXObject('Scripting.FileSystemObject');
 var f = fso.OpenTextFile(path+'.req', 1);
 var t = f.ReadAll();
 f.close();
 var p = t.split('|');
 f = fso.CreateTextFile(path+'.res', true);
 if(p.length = 4){
   var req = new ActiveXObject('MSXML2.ServerXMLHTTP');
   req.open(p[0], p[1], 'false');
   if(p[3].length>0){
    req.setRequestHeader('Authorization', 'Basic '+p[3]);
   }
   req.send(p[2]);
   if (req.readyState == 4) {
        f.write(req.responseText);
   }
 } 
 else{
  f.write('not enough parameters');
 }
 f.close();
}
myHTTP(WScript.arguments(0));