'use strict';

const handleFulfillmentCodeHook = require('./manageEtaFullfilment');

module.exports = function(intentRequest) {
  const source = intentRequest.invocationSource;
  console.log('vo take ETA  source :' + source );

  if (source === 'FulfillmentCodeHook') {
    console.log('FULFILED handle');
    return handleFulfillmentCodeHook(intentRequest);
  }
};
