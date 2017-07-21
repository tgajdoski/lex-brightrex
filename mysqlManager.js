'use strict';

var mysql = require('mysql');

var pool = mysql.createPool({
      host     : 'app.cfx8l12fysob.us-west-2.rds.amazonaws.com',
      user     : 'ffi',
      password : 'Firm2825',
      database : 'app'
});


module.exports.getQuery = () => {
 
try {
  pool.getConnection(function(err, connection) {
  // Use the connection
   var qqq = "select id, date, lot from job where market_id = 5 limit 10";
  console.log(qqq);
  connection.query(qqq, function (error, results, fields) {
    // And done with the connection.

  //  var message = JSON.parse(JSON.stringify(results[0].brojki));
  //         var messagefinal = "Total job number for Market: " + Market + " is " + message;
  //         var response = `{
  //           "dialogAction": {
  //               "type": "Close",
  //               "fulfillmentState": "Fulfilled",
  //               "message": {
  //                   "contentType": "PlainText",
  //                   "content":  "${messagefinal}"
  //                   }
  //               }
  //           }`;

            
    context.succeed( JSON.parse(results));
                                      
    connection.release();

    // Handle error after the release.
      if (error) throw error;
    // Don't use the connection here, it has been returned to the pool.
    });
  });
  } catch (error) {
    context.fail(`Exception: ${error}`)
  //callback(error, 'sdasdasdasdasd');
  }
};

