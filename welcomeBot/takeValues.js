'use strict';

const handleDialogCodeHook = require('./manageDialogs');
const handleFulfillmentCodeHook = require('./manageFullfilment');

module.exports = function(intentRequest) {
  const source = intentRequest.invocationSource;
  console.log('vo takeValues source :' + source );
  if (source === 'DialogCodeHook') {
    return handleDialogCodeHook(intentRequest);
  }

  if (source === 'FulfillmentCodeHook') {
    console.log('FULFILED handle');
    return handleFulfillmentCodeHook(intentRequest);
  }
};
