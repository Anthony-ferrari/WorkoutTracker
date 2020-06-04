var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_ferraria',
  password        : 'LakeOzark2020!',
  database        : 'cs290_ferraria'
});

module.exports.pool = pool;
