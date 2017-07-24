'use strict';

const handleFulfillmentCodeHook = require('./manageImageFullfilment');

module.exports = function(intentRequest) {
  const source = intentRequest.invocationSource;
  console.log('vo takeImage source :' + source );

  if (source === 'FulfillmentCodeHook') {
    console.log('FULFILED handle');
    return handleFulfillmentCodeHook(intentRequest);
  }
};
