var pg = require('pg');
var parseConnectionString = require('pg-connection-string');

//connecting to the db
const connectionString = 'postgres://root:root@localhost/portfolioblog';

const pool = new pg.Pool(typeof connectionString === 'string' ? parseConnectionString.parse(connectionString) : connectionString);

module.exports = function(queryString, queryParameters, onComplete) {

 if (typeof queryParameters == 'function') {
   onComplete = queryParameters;
   queryParameters = [];
 }

 pool.connect(function(err, client, done) {
   if (err) {
     console.log(`error: connection to database failed. connection string: "${connectionString}" ${err}`);
     if (client) {
       done(client);
     }

     if (onComplete) {
       onComplete(err);
     }
     return;
   }
   client.query(queryString, queryParameters, function(err, result, pool) {
     if (err) {
       done(client);
       console.log(`error: query failed: "${queryString}", "${queryParameters}", ${err}`);
     }
     else {
       done();
     }

     if (onComplete) {
       onComplete(err, result);
     }
   });
 });
 //pool.end();
};
