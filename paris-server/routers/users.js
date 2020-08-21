// user模块
const express=require('express');
var router = express.Router();
// 引入链接池
const pool = require('../config/db');

// 测试页面
router.get('/test', (req, res) => {
  res.send("This is TestPage")
})

// 登录 生成token并返回前端
router.get("/login", (req, res) => {
  // console.log("res", res)
  console.log("query", req.query)
  let {username,password} = req.query
  var sql = 'SELECT * FROM users WHERE username = ? and password = ?'
  pool.query(sql, [username, password], (err, result) => {
    console.log("result",result)
    res.send(result)
  })
  
})

// 添加用户
router.post("/addUser", (req, res) => {
  var  addSql = 'INSERT INTO users(username,nickname,password,sex,address) VALUES(?,?,?,?,?)';
  var addSqlParams = [
    req.body.username,
    req.body.nickname,
    req.body.password,
    req.body.sex,
    req.body.address,
  ];
  //增加用户
  pool.query(addSql,addSqlParams,function (err, result) {
    if(err){
      console.log('[INSERT ERROR] - ',err.message);
      return;
      }
    console.log('INSERT ID:',result);
    res.send(result)
  });
})
// 查询用户
router.get("/getUsers", (req, res) => {
  var sql = 'SELECT * FROM users'
  pool.query(sql, (err, result) => {
    // console.log("err",err)
    if (err) {
      res.send(result)  
    } else {
      res.send(result)
    }
    
  })
})

// 搜索用户
router.get("/searchUsers", (req, res) => {
  let username = req.query.username
  var sql = 'SELECT id,nickname,username,email,age,sex,address,phone FROM users WHERE username=?'
  pool.query(sql, [username], (err,result) => {
    res.send(result)
  })
})

// 删除用户
router.get('/deleteUsers', (req, res) => {
  let id = req.query.id
  console.log("id",id)
  var sql = 'DELETE FROM users WHERE id = ?'
  pool.query(sql, [id], (err, result) => {
    console.log(err, result)
    if (err) console.log(err);
    res.send({code:400,msg:'删除成功！'})
  })
})
module.exports = router;
//http://localhost:4000/users