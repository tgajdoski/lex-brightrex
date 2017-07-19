'use strict';

const dispatch = require('./dispatch');
const userFavorites = require('./userEmail/userEmail');



// test mysql
var mysql = require('mysql');
var pool = mysql.createPool({
      host     : 'app.cfx8l12fysob.us-west-2.rds.amazonaws.com',
      user     : 'ffi',
      password : 'Firm2825',
      database : 'app'
});





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






module.exports.query = (event, context, callback) => {
   
try {
  pool.getConnection(function(err, connection) {

     var ret = [];

  // Use the connection
   var qqq = 'select id, DATE_FORMAT(date, "%M %d %Y") as datum, lot from job where market_id = 5 limit 10';
  console.log(qqq);
  
  connection.query(qqq, function (error, results, fields) {
  
     for (var i of results) {
        console.log(i);
        console.log(i.id );
        ret.push(i.id + ";" +  i.datum + ";" + i.lot);
     }
    context.succeed(JSON.stringify(ret)); 
       console.log('AAA' +ret);
    connection.release();

    // Handle error after the release.
      if (error) throw error;
    // Don't use the connection here, it has been returned to the pool.
    });
  });
    } catch (error) {
        context.fail(`Exceptiodn: ${error}`)
       //  callback(error, 'sdasdasdasdasd');
    }
};


