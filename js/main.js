// Title
var element = document.querySelector("#greeting");
element.innerText = "Prototype Editor";
var charcount = document.querySelector("#numOfchar");
charcount.innerText = "0 chars, 0 words, 1 lines";

// COnverter
var changer = new ConvertText();

// Add EventListener
document.addEventListener("DOMContentLoaded", function() {
  var inputText = document.querySelector('#input_text');
  inputText.addEventListener('input',getInputEvent,false);
  
  var selector = document.querySelector('#selector');
  selector.addEventListener('change', changePreview, false);
  
  
  document.querySelector('#files').addEventListener('change', readText, false);
}, false);

// input text, convert to HTML from text and output result 
var getInputEvent = function(event) {
  var textarea = event.target;
  var outputText = document.querySelector('#output_text');
  var changed = changer.convert(textarea.value);
  
  charcount.innerText = ' ' + textarea.value.replace(/\n/g,'').length + ' chars,';
  charcount.innerText += ' ' + textarea.value.replace(/ +/g,'\n').split('\n').length-1 + ' words,';
  charcount.innerText += ' ' + textarea.value.split('\n').length + ' lines';
  
  
  
  var selected = document.querySelector('#selector');
  
  if(selected.value == 'None') {
    outputText.innerText = '';
    return;
  }
  
  if(selected.value == 'Preview') {
    outputText.innerHTML = changed;
  } else {
    outputText.innerText = changed;
  }
};

// change preview or html
var changePreview = function(event) {
  var selectbox = event.target;
  var outputText = document.querySelector('#output_text');
  if(selectbox.value == 'None') {
  	outputText.innerText = '';
  	return;
  }
  
  if(selectbox.value == 'Preview') {
    outputText.innerHTML = changer.convert(document.querySelector('#input_text').value);
  } else {
    outputText.innerText = changer.convert(document.querySelector('#input_text').value);
  }
};

var readText = function(event) {
  var files = event.target.files;
  var reader = new FileReader();
  
  reader.readAsText(files[0]);
  
  reader.onload = function(ev) {
    document.querySelector('#input_text').value = this.result;
  };
};
