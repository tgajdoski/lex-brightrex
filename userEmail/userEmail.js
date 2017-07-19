'use strict';

const databaseManager = require('../databaseManager');

module.exports = function(userId, email) {
  console.log(userId + ' ' + email);

  databaseManager.saveUserToDatabase(userId, email).then(item => {
    console.log('go snimiv ova: ' + item);
  });
};
