window.moveTo(screen.availWidth-225, 0);
window.resizeTo(225, screen.availHeight);
document.getElementsByTagName('iframe')[0].height = screen.availHeight-40;

function getFileData(user, repo, branch, path, fileObj, callback){
 var url = 'https://api.github.com/repos/'+user+'/'+repo+'/contents/'+path+'?ref='+branch;
 var xmlhttp = new XMLHttpRequest();
 xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
/*   var obj = JSON.parse(this.responseText);
   fileObj.user = user;
   fileObj.repo = repo;
   fileObj.branch = branch;
   fileObj.path = path;
   fileObj.sha = obj.sha;
   fileObj.download_url = obj.download_url;
   if(typeof callback === 'function'){
    callback(fileObj);
   } */
   alert(this.responseText);
  }
 };
 xmlhttp.open('GET', url, true);
 xmlhttp.send();
}
