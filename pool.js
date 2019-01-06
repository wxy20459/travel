<<<<<<< HEAD
const mysql = require("mysql");
var pool = mysql.createPool({
     host:"127.0.0.1",
     port:3306,
     user:"root",
     password:"",
     database:"xz",
     connectionLimit: 20 
});
module.exports = pool;
=======
//创建mysql连接池
const mysql = require('mysql');
var pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'xz',
  connectionLimit: 20 
});
//把创建好的连接池导出
module.exports = pool;




>>>>>>> 203a83ec0c834ba567a0d1a6ff597815b4a80c65
