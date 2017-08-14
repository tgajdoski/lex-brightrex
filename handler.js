'use strict';

const dispatch = require('./dispatch');
const userFavorites = require('./userEmail/userEmail');



// // test mysql
const mysql = require('mysql');

var pool = mysql.createPool({
      host     : 'brightrexaurora-cluster.cluster-cpn6y5or1u0l.us-east-1.rds.amazonaws.com',
      user     : 'root',
      password : 'Pa$$w0rd-my$ql_Br1hGt3r',
      database : 'test.brightrax.com'
});

// var pool = mysql.createPool({
//       host     : '35.164.32.123',
//       user     : 'ffi',
//       password : 'Firm2825',
//       database : 'test.brihtrex.com'
// });

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

// var pool = mysql.createPool({
//       host     : '35.164.32.123',
//       user     : 'ffi',
//       password : 'Firm2825',
//       // user     : 'root',
//       // password : 'Pa$$w0rd-my$ql_3V0t3$t',
//       database : 'test.brihtrex.com'
// });

module.exports.query = (event, context, callback) => {
    try {
      pool.getConnection(function(err, connection) {
        if (!err)
          {
              var ret = [];

              var spid = `select id from users where email = 'powerwash@bellsouth.net'`;
               connection.query(spid, function (error, results, fields) {
                for (var i of results) {
                    var spidto = i.id;
                    console.log('asdasdasdsa' + spidto);
                    // zemeno id-to
                    var qqq = `select jobId, tempStoreNum from tbljobs where jobid in (select job_id from wo_service where crew_leader_id = '` + spidto + "'";
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
                context.succeed(JSON.stringify(ret)); 
                connection.release();
                return;
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
