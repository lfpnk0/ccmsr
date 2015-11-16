(function(){
  var el = document.createElement('div');
  el.id='mainWrapper';
  document.body.appendChild(el);
  el = document.createElement('div');
  el.id='console';
  document.body.appendChild(el);
})();

window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    m.log(url+'['+lineNumber+']: '+errorMsg);
    return false;
}

m = new Object();
m.baseURL = 'http://lfpnk0.github.io/ccmsr/';
m.log = function(msg){
	document.getElementById('console').innerHTML = document.getElementById('console').innerHTML+'<br/>'+msg;
}
//m.getMod = function(name){
//	var stylePath = m.baseURL+name+'/style.css';
//	var htmlPath = m.baseURL+name+'/index.htm';
//	var scriptPath = m.baseURL+name+'/script.js';
//	var http = new XMLHttpRequest();
//	http.onreadystatechange = function() {
//		if (http.readyState == 4 && http.status == 200) {
//			var style = document.createElement('link');
//			style.setAttribute('rel', 'stylesheet');
//			style.setAttribute('type', 'text/css');
//			style.href = stylePath;
//			document.getElementById('mainWrapper').appendChild(style);
//			var el = document.createElement('div');
//			el.className = 'module';
//			el.innerHTML = http.responseText;
//			document.getElementById('mainWrapper').appendChild(el);
//			var script = document.createElement('script');
//			script.src = scriptPath;
//			document.getElementById('mainWrapper').appendChild(script);
//		}
//	}
//	http.open("GET", htmlPath, true);
//	http.send();
//}
m.getMod = function(name,step){
	if(!step){step = 'style';}
	var next = {style:'div', div:'script'};
	var url = {style:m.baseURL+name+'/style.css',div:m.baseURL+name+'/index.htm',script:m.baseURL+name+'/script.js'};
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if (request.readyState == 4 && request.status == 200){
			var el = document.createElement(step);
			el.innerHTML = request.responseText;
			document.getElementById('mainWrapper').appendChild(el);
			if(next[step]){m.getMod(name,next[step]);}
		}
	}
	request.open('GET', url);
	request.send();
}
m.getMod('base','html');
