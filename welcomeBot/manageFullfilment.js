'use strict';

const lexResponses = require('../lexResponses');
const databaseManager = require('../databaseManager');

function buildFulfilmentResult(fullfilmentState, messageContent) {
  return {
    fullfilmentState,
    message: { contentType: 'PlainText', content: messageContent }
  };
}

function buildFulfilmentMessage(messageContent) {
  return  { contentType: 'PlainText', content: messageContent };
}

function fullfilWelcome(userId, email) {
  
  console.log('vo fullfilOrder funkcijata' + userId +  email);
  return databaseManager.saveUserToDatabase(userId, email).then(item => {
   console.log('VO fullfilEmail callbackot');
   // ako e tolku samo vrakame deka e kraj
   return buildFulfilmentResult('Fulfilled', `Thanks, your email ${item.email} has been picked`);
   // ako ne sakame da zamineme nakaj nov intent
   // return Promise.resolve(lexResponses.close(intentRequest.sessionAttributes, 'Fullfilled', null))
  });
}


function buildSessionAtributest(email,jobid , userId,activity) {
  return {
     userId: userId, email: email, jobid: jobid, activity: activity 
  };
}


module.exports = function(intentRequest) {
  console.log('PUKA LI OVA VOOPSTO');
    var email = intentRequest.currentIntent.slots.email;
    var userId = intentRequest.userId;
    var jobid  = intentRequest.currentIntent.slots.jobid;
    var activity  = intentRequest.currentIntent.slots.activity;
    
    // session['attributes']['slotKey'] = intent['slots']['slotKey']['value']
    // intentRequest.sessionAttributes.currentReservation.userId = userId;
    // intentRequest.sessionAttributes.currentReservation.email = email;
    // intentRequest.sessionAttributes.currentReservation.jobid = jobid;
    // intentRequest.sessionAttributes.currentReservation.activity = activity;

     intentRequest.sessionAttributes = buildSessionAtributest(email, jobid, userId, activity);
    
   //  console.log(JSON.stringify(intentRequest.sessionAttributes));
    // intentRequest.sessionAttributes = {
    //    'currentReservation': '{"userId" : "' + userId + '",  "email" :"' + email + '", "jobid" : "' +jobid + '", "activity" : "' +activity + '"}'
    //  };
    
     var messageBot = '';
   
    switch(activity) {
      case 'eta':
          messageBot = 'write or say "add eta" to start ETA activity.';
          break;
      case 'instructions':
          messageBot = 'write or say "check instructions" to start Instructions activity.'; 
          break;
      case 'note':
          messageBot = 'write or say "add note" to start Note activity.';
          break;
      case 'image':
          messageBot = 'write or say "add image" to start Image activity.';
          break;
      default:
          messageBot = 'write or say "add note" to start Note activity.';
    } 

 // console.log('ZAVRSUVAM SO welcome intentot: ' + JSON.stringify(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', buildFulfilmentMessage(messageBot))));
  return Promise.resolve(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', buildFulfilmentMessage(messageBot)));

  // return Promise.resolve(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', null));

};
