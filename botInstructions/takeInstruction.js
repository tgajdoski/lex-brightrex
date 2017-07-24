'use strict';

const handleFulfillmentCodeHook = require('./manageInstructionFullfilment');

module.exports = function(intentRequest) {
  const source = intentRequest.invocationSource;
  console.log('vo take Instruction source :' + source );

  if (source === 'FulfillmentCodeHook') {
    console.log('FULFILED handle');
    return handleFulfillmentCodeHook(intentRequest);
  }
};
