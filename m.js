window.attachEvent( "onload",function(){
	var el = document.createElement('div');
	el.id='mainWrapper';
	el.innerHTML = 'test';
	document.body.appendChild(el);
	el = document.createElement('div');
	el.id='console';
	document.body.appendChild(el);
});
window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
	m.log(url+'['+lineNumber+']: '+errorMsg);
	return false;
}
m = new Object();
m.init = [];
m.baseURL = 'http://lfpnk0.github.io/ccmsr/';
m.log = function(msg){
	document.getElementById('console').innerHTML = document.getElementById('console').innerHTML+'<br/>'+msg;
}
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
	request.open('GET', url[step]);
	request.send();
}
m.getMod('base');
