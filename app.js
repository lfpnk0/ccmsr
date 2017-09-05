var fso = new ActiveXObject("Scripting.FileSystemObject");
if(fso.FileExists("C:\\Windows\\notepad.exe")){
  alert('notepad exists');
}
else{
  alert('notepad doesnt exist');
}
