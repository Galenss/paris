// index模块
const express=require('express');
var router = express.Router();
// 引入链接池
const pool = require('../config/db');

// 测试页面
router.get('/', (req, res) => {
  res.send("This is IndexPage")
})
// 查询所有文章
router.get("/article",(req,res) => {
  // console.log("查询所有",req.query)
  var getSql = 'SELECT * FROM article'
  pool.query(getSql,(err,result) => {
    console.log("查询所有文章",err,result)
    res.send(result)
  })
})

router.get('/pagination',(req,res) => {
  console.log("分页数据",req.query)
  let { pageNo, pageSize} = req.query
  var getSql = `SELECT * FROM article limit ${(pageNo-1)*pageSize}, ${pageSize};`
  pool.query(getSql,(err, result) => {
    console.log('分页', err, result)
    res.send(result)
  })
})

module.exports = router;
//http://localhost:4000/index