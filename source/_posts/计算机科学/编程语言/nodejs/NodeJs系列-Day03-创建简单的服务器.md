---
title: NodeJs系列-Day03-创建简单的服务器
categories:
  - 计算机科学
  - 编程语言
  - nodejs
abbrlink: 81aa2258
date: 2022-07-12 21:51:43
tags:
  - NodeJs
---

## 创建简单的web服务器

```javascript
//1. 导入http模块
const http = require("http")
//2. 创建web服务器实例
const server = http.createServer()
//3. 为服务器绑定request事件，监听客户端的请求
server.on("request",(req,res)=>{
    //req是请求对象，里面包括请求url.请求类型post、get等
    //res是响应对象
    console.log("Soneone visit our web server.")
    //获取请求对象的相关信息
    const url = req.url
    const method = req.method
    //这个不是字符串，是用“反单引号”，位于Esc下面的键
    var str = `your url is ${url} , and method ${method}`
    //给请求者返回资源res.end()
    res.end(str)
    
})
//4. 启动服务器
server.listen(8080,function(){
    console.log("server running at http://172.0.0.1:8080")
})
```

### 易错点

在给客户端返回字符串的需要插入参数时，需要使用"`"反单引号，在Esc下面的键。

## 解决响应消息中文乱码问题

```javascript
//1. 引入http模块
const http = require("http")
//2. 创建Server实例
const server = http.createServer()

//3. 绑定服务器实例事件
server.on("request",function(req,res){
    //设置编码，解决中文乱码的问题
    res.setHeader("Content-Type","text/html; charset=utf-8")
    const url = req.url
    var str = `你请求的url为：${url}`
    res.end(str)
})

//4. 启动服务器
server.listen(8080,function(){
    console.log("服务器已启动  http://172.0.0.1:8080")
})
```



## 配置路由

```javascript
const http = require("http")
const path = require("path")
const fs = require("fs")
const server = http.createServer()

server.on("request",(req,res)=>{
    //获取客户端请求URL
    const url = req.url
    //将执行文件和客户端请求url拼接
    var fpath = path.join(__dirname,url)
    console.log(fpath)
    fs.readFile(fpath,"utf-8",function(err,data){
        //这里要加上读取编码，不然可能会发现不能链接到样式的情况
        if (err){
            return console.error(err)
        }
            res.end(data) 
    })
})

server.listen(8080,function(){
    console.log("服务器已启动 http://172.0.0.1:8080")
})
```

