'use strict';

const handleFulfillmentCodeHook = require('./manageNoteFullfilment');

module.exports = function(intentRequest) {
  const source = intentRequest.invocationSource;
  console.log('vo takeNote source :' + source );

  if (source === 'FulfillmentCodeHook') {
    console.log('FULFILED handle');
    return handleFulfillmentCodeHook(intentRequest);
  }
};
