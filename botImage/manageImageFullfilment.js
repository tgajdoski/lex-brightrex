'use strict';

const lexResponses = require('../lexResponses');

function buildFulfilmentResult(fullfilmentState, messageContent) {
  return {
    fullfilmentState,
    message: { contentType: 'PlainText', content: messageContent }
  };
}

function buildFulfilmentMessage(messageContent) {
  return  { contentType: 'PlainText', content: messageContent };
}

module.exports = function(intentRequest) {

    console.log(JSON.stringify(intentRequest));
    var email = intentRequest.sessionAttributes.email;
    var userId = intentRequest.userId;
    var jobid  = intentRequest.sessionAttributes.jobid;
    var activity  = intentRequest.sessionAttributes.activity;
    var imagepathslot  = intentRequest.currentIntent.slots.imagepathslot;
    
  return Promise.resolve(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', buildFulfilmentMessage( `Thanks, your email ${email}, jobid ${jobid}, activity ${activity} and imagepath ${imagepathslot} has been picked`)));
  //   return buildFulfilmentResult('Fulfilled', `Thanks, your email ${email}, jobid ${jobid}, activity ${activity} and note ${note} has been picked`);
   
};
