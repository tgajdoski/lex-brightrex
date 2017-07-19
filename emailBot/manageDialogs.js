'use strict';

const lexResponses = require('../lexResponses');
const regex = require('regex-email');
const databaseManager = require('../databaseManager');

function buildValidationResult(isValid, violatedSlot, messageContent) {
  if (messageContent == null) {
    return {
      isValid,
      violatedSlot
    };
  }
  return {
    isValid,
    violatedSlot,
    message: { contentType: 'PlainText', content: messageContent }
  };
}

function buildUserFavoriteResult(coffee, size, messageContent) {
  return {
    coffee,
    size,
    message: { contentType: 'PlainText', content: messageContent }
  };
}

function validateSpEmail(email) {
  if (email && !regex.test(email)) {
    return buildValidationResult(false, 'email', `email: ${email}, is not valid. Please enter your email again.`);
  }
  return buildValidationResult(true, null, null);
}

function findUserEmailBase(userId) {
  return databaseManager.findUserEmail(userId).then(item => {
    return buildUserFavoriteResult(item.email,  `is this your email ${item.email} ?`);
  });
}

module.exports = function(intentRequest) {
  var email = intentRequest.currentIntent.slots.email;
  var userId = intentRequest.userId;
  const slots = intentRequest.currentIntent.slots;

  if (email === null) {
    return findUserEmailBase(userId)
      .then(item => {
        slots.email = item.size;
        //Ask the user if he will like to proceed with this email
        return lexResponses.confirmIntent(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, item.message);
      })
      .catch(error => {
        //Need to ask the user what to enter email?
        return lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots);
      });
  } else {
    const validationResult = validateSpEmail(email);

    if (!validationResult.isValid) {
      slots[`${validationResult.violatedSlot}`] = null;
      return Promise.resolve(lexResponses.elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots, validationResult.violatedSlot, validationResult.message));
    }

    return Promise.resolve(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
  }
};
