'use strict';

const lexResponses = require('../lexResponses');
const databaseManager = require('../databaseManager');

function buildFulfilmentResult(fullfilmentState, messageContent) {
  return {
    fullfilmentState,
    message: { contentType: 'PlainText', content: messageContent }
  };
}

function fullfilEmail(userId, email) {
  console.log('vo fullfilOrder funkcijata' + userId +  email);
  return databaseManager.saveUserToDatabase(userId, email).then(item => {
   console.log('VO fullfilEmail callbackot');
   // ako e tolku samo vrakame deka e kraj
   return buildFulfilmentResult('Fulfilled', `Thanks, your email ${item.email} has been picked`);
   // ako ne sakame da zamineme nakaj nov intent
   // return Promise.resolve(lexResponses.close(intentRequest.sessionAttributes, 'Fullfilled', null))
  });
}

module.exports = function(intentRequest) {
  var email = intentRequest.currentIntent.slots.email;
  var userId = intentRequest.userId;

  return fullfilEmail(userId, email).then(fullfiledEmail => {
    console.log('VO fullfilEmail requestot');
   // return lexResponses.close(intentRequest.sessionAttributes, fullfiledEmail.fullfilmentState, fullfiledEmail.message);
     return Promise.resolve(lexResponses.close(intentRequest.sessionAttributes, fullfiledEmail.fullfilmentState, null))
  });
};
