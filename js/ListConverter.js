class ListConverter {
  constructor(mainConverter) {
    this.patList = /^[\*\-\+] /;
    this.patNume = /^[0-9]+\. /;
    this.whiteLength = 0;
    this.mainConverter = mainConverter;
    this.endItemStack = new Stack();
  }
  
  initAll() {
    this.whiteLength = 0;
  }
  
  listToList (line) {
    var count = 0;
    while(line.match(/^[ \t]/)) {
      line = line.replace(/^[ \t]/,'');
      count++;
    }
    
    if(count > this.whiteLength) {
      this.whiteLength = count;
      this.endItemStack.push('</ul>');
      return '\n<ul>\n<li>' + this.mainConverter.changeInner(line.replace(this.patList,''));
    } else if(count == this.whiteLength || this.endItemStack.isEmpty()) {
      return '</li>\n<li>' + this.mainConverter.changeInner(line.replace(this.patList,''));
    }
    
    this.whiteLength = count;
    return '</li>\n' + this.endItemStack.pop()  + '\n</li>\n<li>' + this.mainConverter.changeInner(line.replace(this.patList,''));
  }
  
  noneToList (line) {
    line = line.trimLeft().replace(this.patList,'');
    this.endItemStack.push('</ul>');
    return '<ul>\n<li>' + this.mainConverter.changeInner(line);
  }
  
  fin () {
    var ret = '';
    while(!this.endItemStack.isEmpty()) {
      ret = ret + '</li>\n' + this.endItemStack.pop() + '\n';
    }
    return ret;
  }
  
  numeToNume (line) {
    var count = 0;
    while(line.match(/^[ \t]/)) {
      line = line.replace(/^[ \t]/,'');
      count++;
    }
    
    if(count > this.whiteLength) {
      this.whiteLength = count;
      this.endItemStack.push('</ol>');
      return '\n<ol>\n<li>' + this.mainConverter.changeInner(line.replace(this.patNume,''));
    } else if(count == this.whiteLength || this.endItemStack.isEmpty()) {
      return '</li>\n<li>' + this.mainConverter.changeInner(line.replace(this.patNume,''));
    }
    
    this.whiteLength = count;
    return '</li>\n' + this.endItemStack.pop() + '\n</li>\n<li>' + this.mainConverter.changeInner(line.replace(this.patNume,''));
  }
  
  noneToNume (line) {
    line = line.trimLeft().replace(this.patNume,'');
    this.endItemStack.push('</ol>');
    return '<ol>\n<li>' + this.mainConverter.changeInner(line);
  }
}