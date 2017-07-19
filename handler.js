'use strict';

const dispatch = require('./dispatch');
const userFavorites = require('./userEmail/userEmail');

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
    const userId = event.userId;
    const email  = event.currentIntent.slots.email;
    // try {
    //     userFavorites(userId, email).then(response => {
    //       callback(null, response);
    //     });
    //   } catch (err) {
    //     callback(err);
    //   }
    userFavorites(userId, email);

     try {
          console.log(`event.bot.name=${event.bot.name}`);
          dispatch(event).then(response => {
            callback(null, response);
          });
        } catch (err) {
          callback(err);
        }


   // callback(null, null);
};


