'use strict';

const takeValues = require('./welcomeBot/takeValues');

const takeNote = require('./botNote/takeNote');
const takeEta = require('./botEta/takeEta');
const takeImage = require('./botImage/takeImage');
const takeInstructions = require('./botInstructions/takeInstruction');

module.exports = function(intentRequest) {
  console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
  const intentName = intentRequest.currentIntent.name;

  console.log(intentName)
  if (intentName === 'welcome') {
    console.log(intentName + ' was called');
    return takeValues(intentRequest);
  } 
  else if (intentName === 'checkInstructions') {
    console.log(intentName + ' was called');
     return takeInstructions(intentRequest);
  }
  else if (intentName === 'insertETA') {
    console.log(intentName + ' was called');
     return takeEta(intentRequest);
  }
  else if (intentName === 'imageUpload') {
    console.log(intentName + ' was called');
     return takeImage(intentRequest);
  }
    else if (intentName === 'addNote') {
    console.log(intentName + ' was called');
     return takeNote(intentRequest);
  };


  throw new Error(`Intent with name ${intentName} not supported`);
};

