class Stack {
  constructor() {
    this.size = 0;
    this.values = [];
  }
  
  push (value) {
    this.values[this.size] = value;
    this.size++;
  }
  
  pop () {
    if(this.isEmpty()) return null;
    this.size--;
    return this.values[this.size];
  }
  
  isEmpty () {
    if(this.size <= 0) return true;
    return false;
  }
}