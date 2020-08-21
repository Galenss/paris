-- 设置编码方式为utf8
SET NAMES UTF8;

-- 查询是否存在 huanlu 数据库，如果存在则删除
DROP DATABASE IF EXISTS paris;
-- 创建数据库 huanlu，并将编码方式设置为urf8
CREATE DATABASE paris CHARSET=UTF8;

-- 进入huanlu数据库
USE paris;

