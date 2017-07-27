'use strict';

const dispatch = require('./dispatch');
const userFavorites = require('./userEmail/userEmail');



// // test mysql
const mysql = require('mysql');

// const connection = mysql.createConnection({  
//       host     : '35.164.32.123',
//       user     : 'ffi',
//       password : 'Firm2825',
//       database : 'test.brihtrex.com'
// })
// /* Initialization part ends here */

// /* Handler function starts here */
// module.exports.query = (event, context, callback) => {  
//   const sql = `select jobId, tempStoreNum from tbljobs where jobid in (select job_id from wo_service where crew_leader_id in (select id from users where email = 'powerwash@bellsouth.net'))`
//   connection.query(sql, function (error, results, fields) {
//      console.log('query date time' + Date());

//     if (error) {
//       return callback(error)
//     }
//     // for (var i of results) {
//     //       console.log(i.jobId );
//     //       ret.push(i.jobId, i.tempStoreNum);
//     //   }
//  //     context.succeed(JSON.stringify(ret)); 
// //    connection.release();
//       callback(null, results)

//       console.log('query end time' + Date());
//   })
// }

var pool = mysql.createPool({
      host     : '35.164.32.123',
      user     : 'ffi',
      password : 'Firm2825',
      // user     : 'root',
      // password : 'Pa$$w0rd-my$ql_3V0t3$t',
      database : 'test.brihtrex.com'
});

module.exports.query = (event, context, callback) => {
    try {
      pool.getConnection(function(err, connection) {
        if (!err)
          {
              var ret = [];
              var qqq = `select jobId, tempStoreNum from tbljobs where jobid in (select job_id from wo_service where crew_leader_id in (select id from users where email = 'powerwash@bellsouth.net'))`
              console.log(qqq);
              console.log('pred start' + Date());
              connection.query(qqq, function (error, results, fields) {
                console.log('query date time' + Date());
                for (var i of results) {
                    console.log(i.jobId );
                    ret.push(i.jobId, i.tempStoreNum);
                }
                context.succeed(JSON.stringify(ret)); 
                connection.release();
                return;
                // Handle error after the release.
                  if (error) throw error;
                // Don't use the connection here, it has been returned to the pool.
                });
              console.log('connection release date time' + Date());
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
