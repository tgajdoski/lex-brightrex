'use strict';



module.exports = function(intentRequest) {
  console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
  const intentName = intentRequest.currentIntent.name;

  if (intentName === 'welcome') {
    console.log(intentName + ' was called');
    return orderCoffee(intentRequest);
  }

  throw new Error(`Intent with name ${intentName} not supported`);
};
