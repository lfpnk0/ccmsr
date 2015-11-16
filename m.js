(function(){
  var el = document.createElement('div');
  el.id='mainWrapper';
  document.body.appendChild(el);
})();

m = new Object();
m.getMod = function(name){
	var httpPath = 'http://lfpnk0.github.io/ccmsr/'+name+'/index.htm';
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
		if (http.readyState == 4 && http.status == 200) {
			var el = document.createElement('div');
			el.className = 'module';
			el.innerHTML = http.responseText;
			document.getElementById('mainWrapper').appendChild(el);
		}
	}
	http.open("GET", httpPath, true);
	http.send();
}
m.getMod('base');
