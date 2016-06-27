  al = new Object();
  al.init = function(){
    $('.al-parts').collapse({toggle: false});
  }
  al.run = function(path){
      this.sh = msr.getSH();
      this.sh.exec('"'+path+'"');
  }
  al.get = function(url){
    this.ie = msr.getIE();
    if(this.ie.visible != true){
      this.ie.visible = true;
    }
    winTitle=this.ie.name;
    this.sh = msr.getSH();
    this.sh.appActivate(winTitle);
    if(this.ie.LocationURL!=''){
      OpenTab = 0x1000;
      this.ie.Navigate(url, OpenTab);
    }
    else{
      this.ie.Navigate(url);
    }
  }
  al.init();
