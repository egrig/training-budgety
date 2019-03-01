try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
  $('.app').hide();
}


var noteTextarea = $('.add__description');
var noteContent = '';




/*-----------------------------
      Voice Recognition 
------------------------------*/

recognition.continuous = true;
recognition.onresult = function(event) {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    noteContent += transcript;
    description();
  }
 };

recognition.onstart = function() { 
  console.log('Voice recognition activated. Try speaking into the microphone.');
}

recognition.onspeechend = function() {
  console.log('You were quiet for a while so voice recognition turned itself off.');
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    console.log('No speech was detected. Try again.');  
  };
}



/*-----------------------------
      App buttons and input 
------------------------------*/

document.querySelector('#start-record-btn').addEventListener('click', function(e) {
  if (noteContent.length) {
    noteContent += ' ';
  }
  recognition.start();  
  
});



document.querySelector('#pause-record-btn').addEventListener('click', function(e) {
  recognition.stop();
});

function description(){

  var splits = noteContent.split(' ');
  
  if(splits[0] == 'описание' && splits[splits.length-1] == 'стоп'){
    delete splits[0];
    delete splits[splits.length-1];
    var splits1 = splits.join(' ');
    document.getElementById('add__description').value = splits1;
    noteContent = '';
  }else if (splits[0] == 'description' && splits[1] == 'is' && splits[splits.length-2] == 'description' && splits[splits.length-1] == 'ends'){
    delete splits[0];
    delete splits[1];
    delete splits[splits.length-2];
    delete splits[splits.length-1];
    var splits1 = splits.join(' ');
    document.getElementById('add__description').value = splits1;
    noteContent = '';
  }else if (noteContent == 'income' || noteContent == 'доход'){
    $('.add__type').val('inc');
    noteContent = "";
    document.getElementById('add__description').value = "";
  }else if (noteContent == 'expense' || noteContent == 'расход') {
    $('.add__type').val('exp');
    noteContent = "";
    document.getElementById('add__description').value = "";  
  }else if(splits[0] == 'value' && splits[1] == 'is'){
    delete splits[0];
    delete splits[1];
    var splits1 = parseInt(splits.join(' '));
    document.getElementById('add__value').value = splits1;
    noteContent = '';
  }else if(splits[0] == 'цена'){
    delete splits[0];
    var splits1 = parseInt(splits.join(' '));
    document.getElementById('add__value').value = splits1;
    noteContent = '';
  }else if(splits[0] == 'clear' && splits[1] == 'description' || splits[0] == 'очистить' && splits[1] == 'описание') {
    delete splits[0];
    delete splits[1];
    document.getElementById('add__description').value = '';
    noteContent = '';
  }else if(splits[0] == 'clear' && splits[1] == 'value' || splits[0] == 'очистить' && splits[1] == 'цену'){
    delete splits[0];
    delete splits[1];
    document.getElementById('add__value').value = '';
    noteContent = '';
  }else if(splits[0] == 'submit' || splits[0] == 'добавить'){
    delete splits[0];
    document.querySelector('#add__btn').click();
    noteContent = '';
  }else{
    noteContent = '';
  }
}
