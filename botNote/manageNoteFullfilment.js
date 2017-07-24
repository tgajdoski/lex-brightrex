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

// module.exports = function(intentRequest) {
//     console.log(JSON.stringify(intentRequest));
//     var ​noteslot  =  'aaa';
//     //var ​noteslot  =  intentRequest.currentIntent.slots.noteslot;
    
//     var email = intentRequest.sessionAttributes.email;
//     var userId = intentRequest.userId;
//     var jobid  = intentRequest.sessionAttributes.jobid;
//     var activity  = intentRequest.sessionAttributes.activity;
//  //  return Promise.resolve(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', buildFulfilmentMessage( `Thanks, your email ` + email + `, jobid ` + jobid + `, activity ` + activity + ` and note " ` + ​noteslot + `}" has been picked`)));
//   return Promise.resolve(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', buildFulfilmentMessage( `Thanks, your email ${email}, jobid ${jobid}, activity ${activity} and note " ${​noteslot}" has been picked`)));
// };
module.exports = function(intentRequest) {

    var email = intentRequest.sessionAttributes.email;
    var userId = intentRequest.userId;
    var jobid  = intentRequest.sessionAttributes.jobid;
    var activity  = intentRequest.sessionAttributes.activity;
    var note  = intentRequest.currentIntent.slots.noteslot;
    
  return Promise.resolve(lexResponses.close(intentRequest.sessionAttributes, 'Fulfilled', buildFulfilmentMessage( `Thanks, your email ${email}, jobid ${jobid}, activity ${activity} and note ${note} has been picked`)));
  //   return buildFulfilmentResult('Fulfilled', `Thanks, your email ${email}, jobid ${jobid}, activity ${activity} and note ${note} has been picked`);
   
};
