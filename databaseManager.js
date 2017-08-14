'use strict';

const uuidV1 = require('uuid/v1');
const AWS = require('aws-sdk');
const promisify = require('es6-promisify');
const _ = require('lodash');
const dynamo = new AWS.DynamoDB.DocumentClient();

var mysql = require('mysql');

var pool = mysql.createPool({
      host     : 'brightrexaurora-cluster.cluster-cpn6y5or1u0l.us-east-1.rds.amazonaws.com',
      user     : 'root',
      password : 'Pa$$w0rd-my$ql_Br1hGt3r',
      database : 'test.brightrax.com'
});


module.exports.saveUserToDatabase = function(userId, email) {
  console.log('saveUserToDatabase');
  const item = {};
  item.email = email;
  item.userId = userId;
  return saveItemToTable('brightrex-user-table', item);
};

module.exports.findUserEmail = function(userId) {
  const params = {
    TableName: 'brightrex-user-table',
    Key: {
      userId
    }
  };

  const getAsync = promisify(dynamo.get, dynamo);

  return getAsync(params).then(response => {
    if (_.isEmpty(response)) {
      console.log(`User with userId:${userId} not found`);
      return Promise.reject(new Error(`User with userId:${userId} not found`));
    }
    return response.Item;
  });
};


module.exports.getSPJobs = function(email) {
  console.log('getSPJobs');
    try {
      pool.getConnection(function(err, connection) {
        if (!err)
          {
              var ret = [];
              var qqq = `select jobId, tempStoreNum from tbljobs where jobid in (select job_id from wo_service where crew_leader_id in (select id from users where email = 'powerwash@bellsouth.net'))`;
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

function saveItemToTable(tableName, item) {
  const params = {
    TableName: tableName,
    Item: item
  };

  const putAsync = promisify(dynamo.put, dynamo);

  return putAsync(params)
    .then(() => {
      console.log(`Saving item ${JSON.stringify(item)}`);
      return item;
    })
    .catch(error => {
      Promise.reject(error);
    });
}
