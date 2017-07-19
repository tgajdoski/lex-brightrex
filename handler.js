'use strict';

const dispatch = require('./dispatch');


module.exports.intents = (event, context, callback) => {
  try {
    console.log(`event.bot.name=${event.bot.name}`);
    dispatch(event).then(response => {
      callback(null, response);
    });
  } catch (err) {
    callback(err);
  }
};


module.exports.saveUserEmail = (event, context, callback) => {
  console.log('saveUserEmail lambda called');
  var item = event.Records[0].dynamodb.NewImage;
  console.log(item);

  userFavorites(item.userId.S, item.email.S);
  callback(null, null);
};


