//strig change
class ConvertText {
  constructor () {
    this.patHeader = /^#/;
    this.patList = /^[\*\-\+] /;
    this.patNume = /^[0-9]+\. /;
    
    this.listConverter = new ListConverter(this);
    this.allInit();
  }
  
  allInit () {
    this.lastStatus = "NONE";
    this.status = "NONE";
    this.listConverter.initAll();
  }
  
  setStatus(st) {
    this.lastStatus = this.status;
    this.status = st;
  }
  
  changeInner (text) {
    var nText = text;
    nText = nText.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
    nText = nText.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
    nText = nText.replace(/~~([^~]+)~~/g, '<del>$1</del>');
    nText = nText.replace(/\[(.+)\]\((.*)\)/g, '<a href="$2">$1</a>');
    nText = nText.replace(/`(.+)`/,'<code>$1</code>');
    
    return nText;
  }
  
  checkStatus (line) {
    var nLine = line.trimLeft();
    if(nLine.match(this.patHeader)) {
      this.setStatus("HEADER");
      return;
    }
    
    if(nLine.match(this.patList)) {
      this.setStatus("LIST");
      return;
    }
    
    if(nLine.match(this.patNume)) {
      this.setStatus("NUME");
      return;
    }
    
    if(nLine == '') {
      this.setStatus("NONE");
      return;
    }
    
    this.setStatus("LINE");
  }
  
  changeText (line) {
    // HEADER
    if(this.status == "HEADER") {
      line = line.trimLeft();
      for(var i=0; i < 6 && line.match(this.patHeader); i++) {
        line = line.replace(this.patHeader, '');
      }
      return '<h'+ i +'>' + this.changeInner(line) + '</h'+ i +'>\n';
    }
    
    //LINE
    if(this.status == 'LINE') {
      if(this.lastStatus == 'LINE') {
        return this.changeInner(line).replace(/  $/, '<br>\n');
      }
      return '<p>\n' + this.changeInner(line).replace(/  $/, '<br>\n');
    }
    
    //LIST
    if(this.status == 'LIST') {
      if(this.lastStatus == 'NONE') return this.listConverter.noneToList(line);
      if(this.lastStatus == 'LIST'|| this.lastStatus == 'NUME')
        return this.listConverter.listToList(line);
    }
    
    //NUMEROUS
    if(this.status == 'NUME') {
      if(this.lastStatus == 'NONE') return this.listConverter.noneToNume(line);
      if(this.lastStatus == 'NUME' || this.lastStatus == 'LIST')
        return this.listConverter.numeToNume(line);
    }
    
    //NONE
    if(this.status == 'NONE') {
      if(this.lastStatus == 'LINE') return '\n</p>\n';
      if(this.lastStatus == 'LIST') return this.listConverter.fin();
      if(this.lastStatus == 'NUME') return this.listConverter.fin();
      return '';
    }
    
    return '\n<br>MISTAKE : ' + line + '<br>\n';
   }
   
  convert (text) {
    var lines = text.replace(/\r\n|\r/g,'\n').split('\n');
    var new_text = '';
    
    for(var i=0; i < lines.length; i++) {
      this.checkStatus(lines[i]);
      new_text = new_text + this.changeText(lines[i]);
    }
    
    this.allInit();
    return new_text;
  }
}