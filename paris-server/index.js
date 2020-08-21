//express_demo.js 文件
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var index = require('./routers/index');
var users = require('./routers/users');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('Hello World');
})

var server = app.listen(5000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("服务器已启动，访问地址为 http://localhost:"+port)
})

app.use('/index', index);
app.use('/users', users);