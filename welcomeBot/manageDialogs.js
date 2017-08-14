'use strict';

const lexResponses = require('../lexResponses');
const regex = require('regex-email');
const databaseManager = require('../databaseManager');
const userFavorites = require('../userEmail/userEmail');

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
  var jobid = intentRequest.currentIntent.slots.jobid;
  var activity = intentRequest.currentIntent.slots.activity;
  var userId = intentRequest.userId;
   const slots = intentRequest.currentIntent.slots;

  
  if (email === null && jobid ===null) {
    return findUserEmailBase(userId)
      .then(item => {
        slots.email = item.email;
          // odma barame vo baza i prasuvame dali saka da prodolzi so najdeniot CONFIRM ni treba
          //Ask the user if he will like to proceed with this email
        return lexResponses.confirmIntent(intentRequest.sessionAttributes, intentRequest.currentIntent.name, intentRequest.currentIntent.slots, item.message);
      })
      .catch(error => {
        // ako ne najde vo baza prodolzuvame da popolni slot - toa trigerira nekoja od PROMPTS
        //Need to ask the user to enter email?
        return lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots);
      });
  } 
    else if (email !== null && jobid ===null) {
   // imame email ama nemame jobid
    const validationResult = validateSpEmail(email);
    if (!validationResult.isValid) {
      slots[`${validationResult.violatedSlot}`] = null;
      return Promise.resolve(lexResponses.elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, intentRequest.currentIntent.slots, validationResult.violatedSlot, validationResult.message));
    }
    // tuka snimame vo baza user i vrakame nazad deka e napolnet toj slot
    // moze treba so promise tuka za da ne skoka
     userFavorites(userId, email);
    
    
    // treba da vratime ElicitSlot za da pobarame jobid
    // toj elexitSlot moze da mu kaze dobredojte ti i ti i evo ti responsecard so jobovi

    
    var arr_jobs =  [
            { text: 'job_id 111', value: '111' },
            { text: 'job_id 222', value: '222' },
            { text: 'job_id 333', value: '333' },
            { text: 'job_id 444', value: '444' },
            { text: 'job_id 555', value: '555' }
        ];

    
    return  Promise.resolve(lexResponses.elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
            intentRequest.currentIntent.slots, 'jobid',
            { contentType: 'PlainText', content: `Hi ${email} this is the list of your jobs. Please select one` },
            lexResponses.buildResponseCard('Select job', `pick one job from response card`,arr_jobs )));

    //  return Promise.resolve(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
  }
  // else if (email !== null && jobid !==null && activity === null) {
  //    // return lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots); 
            
  //           intentRequest.currentIntent.slots.jobid = jobid;
  //           console.log('TUKA kaj activity null');
  //       // treba da vratime ElicitSlot za da pobarame jobid
  //       // toj elexitSlot moze da mu kaze dobredojte ti i ti i evo ti responsecard so jobovi
  //       var arr_activity =  [
  //               { text: 'insert ETA', value: 'ETA' },
  //               { text: 'get Instructions', value: 'Instructions' },
  //               { text: 'upload Image', value: 'Image' },
  //               { text: 'Add Note', value: 'Note' }
  //           ];
        
          
  //       return Promise.resolve(lexResponses.elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name,
  //               intentRequest.currentIntent.slots, 'activity',
  //               { contentType: 'PlainText', content: `This is list of avaiable activities, please select one` },
  //               lexResponses.buildResponseCard('Select activity', `pick one activity from response card`, arr_activity )));
  // }
  // else if (email !== null && jobid !==null && activity !== null) {
  //   console.log(' se e polno odi nakaj FULLFILMENT');
  //  return Promise.resolve(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', null));
  // }
  else {
     // return lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots); 
     // console.log('ponekogas TUKA ');
      return Promise.resolve(lexResponses.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
  }

};
