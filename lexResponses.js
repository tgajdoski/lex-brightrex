'use strict';

module.exports.delegate = function(sessionAttributes, slots) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Delegate',
      slots
    }
  };
};


module.exports.elicitSlot = function(sessionAttributes, intentName, slots, slotToElicit, message, responseCard) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'ElicitSlot',
      intentName,
      slots,
      slotToElicit,
      message,
      responseCard
    }
  };
};




module.exports.close = function(sessionAttributes, fulfillmentState, message) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'Close',
      fulfillmentState,
      message
    }
  };
};

module.exports.confirmIntent = function(sessionAttributes, intentName, slots, message) {
  return {
    sessionAttributes,
    dialogAction: {
      type: 'ConfirmIntent',
      intentName,
      slots,
      message
    }
  };
};

// Build a responseCard with a title, subtitle, and an optional set of options which should be displayed as buttons.
module.exports.buildResponseCard = function(title, subTitle, options) {
    let buttons = null;
    if (options != null) {
        buttons = [];
        for (let i = 0; i < options.length; i++) {
            buttons.push(options[i]);
        }
    }

  //  console.log(options);
  //  console.log(buttons);
      
    return {
        contentType: 'application/vnd.amazonaws.card.generic',
        version: 1,
        genericAttachments: [{
            title,
            subTitle,
            buttons,
        }],
    };
}
