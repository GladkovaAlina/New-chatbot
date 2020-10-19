"object"!=typeof window.CP&&(window.CP={}),
window.CP.PenTimer={programNoLongerBeingMonitored:!1,timeOfFirstCallToShouldStopLoop:0,_loopExits:{},_loopTimers:{},
START_MONITORING_AFTER:2e3,STOP_ALL_MONITORING_TIMEOUT:5e3,MAX_TIME_IN_LOOP_WO_EXIT:2200,
exitedLoop:function(E){this._loopExits[E]=!0},
shouldStopLoop:function(E){if(this.programKilledSoStopMonitoring)return!0;
if(this.programNoLongerBeingMonitored)return!1;
if(this._loopExits[E])return!1;var _=this._getTime();
if(0===this.timeOfFirstCallToShouldStopLoop)return this.timeOfFirstCallToShouldStopLoop=_,!1;
var o=_-this.timeOfFirstCallToShouldStopLoop;
if(o<this.START_MONITORING_AFTER)return!1;
if(o>this.STOP_ALL_MONITORING_TIMEOUT)return this.programNoLongerBeingMonitored=!0,!1;
try{this._checkOnInfiniteLoop(E,_)}
catch(N){return this._sendErrorMessageToEditor(),this.programKilledSoStopMonitoring=!0,!0}return!1},_sendErrorMessageToEditor:function(){try{if(this._shouldPostMessage()){var E={topic:HUB_EVENTS.PEN_ERROR_INFINITE_LOOP,data:{line:this._findAroundLineNumber()}};
parent.postMessage(E,"*")}else this._throwAnErrorToStopPen()}catch(_){this._throwAnErrorToStopPen()}},_shouldPostMessage:function(){return document.location.href.match(/boomerang/)},_throwAnErrorToStopPen:function(){throw"We found an infinite loop in your Pen. We've stopped the Pen from running. Please correct it or contact support@codepen.io."},_findAroundLineNumber:function(){var E=new Error,_=0;if(E.stack){var o=E.stack.match(/boomerang\S+:(\d+):\d+/);o&&(_=o[1])}return _},_checkOnInfiniteLoop:function(E,_){if(!this._loopTimers[E])return this._loopTimers[E]=_,!1;var o;if(_-this._loopTimers[E]>this.MAX_TIME_IN_LOOP_WO_EXIT)throw"Infinite Loop found on loop: "+E},_getTime:function(){return+new Date}},window.CP.shouldStopExecution=function(E){var _=window.CP.PenTimer.shouldStopLoop(E);return!0===_&&console.warn("[CodePen]: An infinite loop (or a loop taking too long) was detected, so we stopped its execution. Sorry!"),_},window.CP.exitedLoop=function(E){window.CP.PenTimer.exitedLoop(E)};


var messages = [], //array that hold the record of each string in chat
lastUserMessage = "", //keeps track of the most recent input string from the user
botMessage = "", //var keeps track of what the chatbot is going to say
botName = 'Грустный бесполезный бот', //name of the chatbot
talking = true; //when false the speach function doesn't work

//edit this function to change what the chatbot says
function chatbotResponse() {
  talking = true;
  botMessage = "Я не знаю, что ответить("; //the default message

  if (lastUserMessage === 'Привет' || lastUserMessage == 'Здравствуйте' || lastUserMessage == 'привет' || lastUserMessage == 'Здравствуй' || lastUserMessage == 'Хай' || lastUserMessage == 'Hi' || lastUserMessage == 'hi' || lastUserMessage == 'hello'  || lastUserMessage == 'прив' || lastUserMessage == 'ghbdtn') {
    const hi = ['Привет! Рад бы ответить что-то ещё, да не могу('];
    botMessage = hi[Math.floor(Math.random() * hi.length)];;
  }

}
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//****************************************************************
//
//
//
//this runs each time enter is pressed.
//It controls the overall input and output
function newEntry() {
  //if the message from the user isn't empty then run 
  if (document.getElementById("chatbox").value != "") {
    //pulls the value from the chatbox ands sets it to lastUserMessage
    lastUserMessage = document.getElementById("chatbox").value;
    //sets the chat box to be clear
    document.getElementById("chatbox").value = "";
    //adds the value of the chatbox to the array messages
    messages.push(lastUserMessage);
    //Speech(lastUserMessage);  //says what the user typed outloud
    //sets the variable botMessage in response to lastUserMessage
    chatbotResponse();
    //add the chatbot's name and message to the array messages
    messages.push("<b>" + botName + ":</b> " + botMessage);
    // says the message using the text to speech function written below
    Speech(botMessage);
    //outputs the last few array elements of messages to html
    for (var i = 1; i < 8; i++) {if (window.CP.shouldStopExecution(0)) break;
      if (messages[messages.length - i])
      document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
    }window.CP.exitedLoop(0);
  }
}

//text to Speech
//https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API
function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    //msg.voice = voices[10]; // Note: some voices don't support altering params
    //msg.voiceURI = 'native';
    //utterance.volume = 1; // 0 to 1
    //utterance.rate = 0.1; // 0.1 to 10
    //utterance.pitch = 1; //0 to 2
    //utterance.text = 'Hello World';
    //utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}

//runs the keypress() function when a key is pressed
document.onkeypress = keyPress;
//if the key pressed is 'enter' runs the function newEntry()
function keyPress(e) {
  var x = e || window.event;
  var key = x.keyCode || x.which;
  if (key == 13 || key == 3) {
    //runs this function when enter is pressed
    newEntry();
  }
  if (key == 38) {
    console.log('hi');
    //document.getElementById("chatbox").value = lastUserMessage;
  }
}

//clears the placeholder text ion the chatbox
//this function is set to run when the users brings focus to the chatbox, by clicking on it
function placeHolder() {
  document.getElementById("chatbox").placeholder = "";
}
//# sourceURL=pen.js