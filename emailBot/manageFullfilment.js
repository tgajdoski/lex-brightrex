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

  console.log('fullfilOrder' + userId +  email);
  return databaseManager.saveUserToDatabase(userId, email).then(item => {
    return buildFulfilmentResult('Fulfilled', `Thanks, your email ${item.email} has been picked`);
  });
}

module.exports = function(intentRequest) {
  var email = intentRequest.currentIntent.slots.email;
  var userId = intentRequest.userId;

  return fullfilEmail(userId, email).then(fullfilEmail => {
    return lexResponses.close(intentRequest.sessionAttributes, fullfilEmail.fullfilmentState, fullfilEmail.message);
  });
};
