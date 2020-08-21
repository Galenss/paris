//创建mysql连接池
const mysql = require('mysql');
var pool = mysql.createPool({
  host: '59.110.154.174',
  port:'3306',
  user: 'root',
  password: 'Vue284934.',
  database: 'huanlu',
  connectionLimit: 10,
  multipleStatements: true  // 让mysql语句支持多语句查询
});
//把创建好的连接池导出
module.exports = pool;