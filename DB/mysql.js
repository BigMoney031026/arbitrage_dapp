require("dotenv").config();

const mysql = require('mysql');


// My Sql connect
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
// const util = require('util');
// connection.connect(function (err) {
//   if (err) {
//     return console.error('error: ' + err.message);
//   }
//   return connection;
//   console.log('Connected to the MySQL server.');
// });
// exports.query = util.promisify(connection.query).bind(connection);
connection.connect();
module.exports = connection;
// module.export mysql;
// connection.end(function (err) {
//   if (err) {
//     return console.log('error:' + err.message);
//   }
//   console.log('Close the database connection.');
// });