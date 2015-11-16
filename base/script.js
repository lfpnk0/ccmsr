m.base = new Object();
m.base.loc = function(side){
	if(!side){side = document.getElementById('base_location').value;}
	var w = document.getElementById('base_width').value; 
	var h = document.getElementById('base_height').value; 
	if(dir=='right'){ 
		window.moveTo(screen.availWidth-w,0); 
		window.resizeTo(w,h); 
	} 
	else{ 
		window.moveTo(0,0); 
		window.resizeTo(w,h); 
	} 
}
m.init.push(m.base.loc);
m.base.loadMods(){
	var set = document.getElementById('base_modules');
	var mods = set.getElementsByTagName(input).value;
	alert(mods.length);
}
