'use strict';

const dispatch = require('./dispatch');
const userFavorites = require('./userEmail/userEmail');



// // test mysql
var mysql = require('mysql');

var pool = mysql.createPool({
      host     : '54.236.248.58',
      user     : 'root',
      password : 'Pa$$w0rd-my$ql_3V0t3$t',
      database : 'test.brightrax.com'
});

// var pool = mysql.createPool({
//       host     : 'app.cfx8l12fysob.us-west-2.rds.amazonaws.com',
//       user     : 'ffi',
//       password : 'Firm2825',
//       database : 'app'
// });


module.exports.query = (event, context, callback) => {
    try {
      pool.getConnection(function(err, connection) {
        if (!err)
          {
              var ret = [];
              var qqq = `select jobId, tempStoreNum from tbljobs where jobid in (select job_id from wo_service where crew_leader_id in (select id from users where email = 'powerwash@bellsouth.net'))`
              console.log(qqq);
              connection.query(qqq, function (error, results, fields) {
                for (var i of results) {
                    console.log(i.jobId );
                    ret.push(i.jobId, i.tempStoreNum);
                }
                context.succeed(JSON.stringify(ret)); 
                connection.release();
                // Handle error after the release.
                  if (error) throw error;
                // Don't use the connection here, it has been returned to the pool.
                });
          }
          else
          {
            if (err) throw err;
          }
        
      });
    } catch (error) {
        context.fail(`Exception: ${error}`)
       //  callback(error, 'sdasdasdasdasd');
    }
};


// module.exports.query = (event, context, callback) => {
   
// try {
//   pool.getConnection(function(err, connection) {

//      var ret = [];

//   // Use the connection
//    var qqq = "select id, date, lot from job where market_id = 5 limit 10";
//   console.log(qqq);
  
//   connection.query(qqq, function (error, results, fields) {
  
//      for (var i of results) {
//         console.log(i);
//         console.log(i.id );
//         ret.push(i.id + ";" + i.date + ";" + i.lot);
//      }
//     context.succeed(JSON.stringify(ret)); 
//        console.log('AAA' +ret);
//     connection.release();

//     // Handle error after the release.
//       if (error) throw error;
//     // Don't use the connection here, it has been returned to the pool.
//     });
//   });
//     } catch (error) {
//         context.fail(`Exceptiodn: ${error}`)
//        //  callback(error, 'sdasdasdasdasd');
//     }
// };


module.exports.intents = (event, context, callback) => {
  try {
     console.log('EVEEENT' + JSON.stringify(event));
    // console.log(`event.bot.name=${event.bot.name}`);
    dispatch(event).then(response => {
      callback(null, response);
    });
  }
   catch (err) {
    callback(err);
  }
};
