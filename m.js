(function(){
  var el = document.createElement('div');
  el.id='mainWrapper';
  document.body.appendChild(el);
})();

m = new Object();
m.baseURL = 'http://lfpnk0.github.io/ccmsr/';
m.getMod = function(name){
	var httpPath = m.baseURL+name+'/index.htm';
	var scriptPath = m.baseURL+name+'/script.js';
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if (http.readyState == 4 && http.status == 200) {
			var el = document.createElement('div');
			el.className = 'module';
			el.innerHTML = http.responseText;
			document.getElementById('mainWrapper').appendChild(el);
			var script = document.createElement('script');
			script.src = scriptPath;
			document.getElementById('mainWrapper').appendChild(script);
		}
	}
	http.open("GET", httpPath, true);
	http.send();
}
m.getMod('base');
