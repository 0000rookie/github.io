---
title: NodeJs系列-Day06-CORS跨域资源共享
categories:
  - 计算机科学
  - 编程语言
  - nodejs
abbrlink: f1c0d6d7
date: 2022-07-15 11:43:05
tags:
  - NodeJs
---

## CORS响应头部 - Access-Control-Allow-`Origin`

响应头部中可以携带一个`Access-Control-Allow-Origin`字段，其语法如下：

```javascript
Access-Control-Allow-Origin:<origin> | *
```

其中，`origin`参数的值指定了允许访问该资源的外域`URL`。
例如，下面的字段值将`只允许`来自`http:/itcast.cn`的请求：

```javascript
res.setHeader('Access-Control-Allow-Origin','http://itcast.cn')
```

如果指定了`Access-Control--Allow-Origin`字段的值为通配符` * `，表示允许来自任何域的请求，示例代码如下：

```javascript
res.setHeader('Access-Control-Allow-Origin','*')
```

## CORS响应头部-Access-.Control-Allow-`Headers`

默认情况下，`CORS`仅支持客户端向服务器发送如下的9个请求头：
`Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、
Content-Type`   (值仅限于`text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded`三者之一)
如果客户端向服务器`发送了额外的请求头信息`，则需要在`服务器端`，通过`Access-Control-Allow-Headers对额外的请求头进行声明`，否则这次请求会失败！

```javascript
//允许客户端额外向服务器发送 Content-Type 请求头和 X-Custom-Header 请求头
//注意：多个请求头之问使用英文的逗号进行分割
res.setHeader('Access-Control-Allow-Headers','Content-Type,X-Custom-Header')
```



## CORS响应头部-Access-Control-Allow-`Methods`

默认情况下，`CORS`仅支持客户端发起`GET`、`POST`、`HEAD`请求。
如果客户端希望通过`PUT`、`DELETE`等方式请求服务器的资源，则需要在服务器端，通过`Access--Control-Alow-Methods`来指明实际请求所允许使用的`HTTP`方法。

```javascript
//只允许POST、GET、DELETE、HEAD清求方法
res.setHeader('Access-Control-Allow-Methods','POST,GET,DELETE,HEAD')
//允许所有的HTTP清求方法
res.setHeader('Access-Control-Allow-Methods','*')
```

## 简单请求

`同时满足`以下两大条件的请求，就属于简单请求：

1. 请求方式：`GET`、`POST`、`HEAD`三者之一
2. `HTTP头部信息`不超过以下几种字段：`无自定义头部字段`、`Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type(只有三个值application/,x-www-form-urlencoded,multipart/form-data,text/plain)`

## 预检请求

只要符合以下任何一个条件的请求，都需要进行预检请求：

1. 请求方式为`GET`、`POST`、`HEAD`之外的请求Method类型
2. 请求头中包含自定义头部字段
3. 向服务器发送了`application/json`格式的数据

在浏览器与服务器正式通信之前，浏览器会先发送`OPTION`请求进行预检，以获知服务器是否允许该实际请求，所以这一次的`OPTION`请求称为`“预检请求”`。服务器成功响应预检请求后，才会发送真正的请求，并目携带真实数据。

## 简单请求和预检请求区别

简单请求的特点：客户端与服务器之间`只会发生一次请求`。
预检请求的特点：客户端与服务器之间会发生``两次请求`，`OPTION`预检请求成功之后，才会发起真正的请求。



## JSONP的概念与特点

概念：浏览器端通过 <script> 标签的`src`属性，请求服务器上的数据，同时，服务器返回一个函数的调用。这种请求数据的方式叫做`SONP.`
特点：

1. `JSONP`不属于真正的`Ajax`请求，因为它没有使用`XMLHttpRequest`这个对象。
2. `JSONP`仅支持`GET`请求，不支持`POST`、`PUT`、`DELETE`等请求

## 创建JSONP接口的注意事项

如果项目中已经配置了CORS跨域资源共享，为了防止冲突，必须在配置CORS中间件之前声明SONP的接口。否则
JSONP接口会被处理成开启了CORS的接白。

:::info

必须在配置cors中间件之前，配置JSONP接口

:::

## 实现JSONP接口的步骤

1. 获取客户端发送过来的回调函数的名字
2. 得到要通过SONP形式发送给客户端的数据
3. 根据前两步得到的数据，拼接出个函数调用的字符串
4. 把上一步拼接得到的字符串，响应给客户端的<script>标签进行解析执行

```javascript
// 必须在配置cors中间件之前，配置JSONP接口
app.get('./api/jsonp',(req,res)=>{
    //定义JSONP接口

    //1. 得到函数的名称
    const funcName = req.query.callback
    //2. 定义要发送到客户端的数据对象
    const data = {name:'璃柏涟',age:21}
    //3. 拼接出一个函数的调用
    const scriptStr = `${funcName}(${JSON.stringify(data)})`
    //4. 把拼接的字符串，响应给客户端
    res.send(scriptStr)
})
```

## 在网页中使用jQuery发起JSONP请求

调用`$.ajax()`函数，提供`JSONP`的配置选项，从而发起`JSONP`请求，示例代码如下：

```html 02解决跨域问题.html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="css/style.css" rel="stylesheet">
        <script src="https://lib.sinaapp.com/js/jquery/2.0.2/jquery-2.0.2.min.js"></script>    <body>
    <button id="jsonpbtn">JSONP</button>
        <script>
            $(function(){
                $('#jsonpbtn').on('click',function(){
                    $.ajax({
                        type:'GET',
                        url:'http://127.0.0.1:3000/api/jsonp',
                        dataType:'jsonp',
                        //data:{name:'测试jsonp',age:21},
                        success:function(res){
                            console.log(res)
                        },
                    })
                })
            })
        </script>
    </body>
</html>
```

```javascript 03创建JSONP接口.js
// 导入模块
const express = require("express")
// 创建服务器实例
const app = express()
// 解析urlencoded类型
app.use(express.urlencoded({extended:false}))

// 必须在配置cors中间件之前，配置JSONP接口
app.get('/api/jsonp',(req,res)=>{
    //定义JSONP接口

    //1. 得到函数的名称
    const funcName = req.query.callback
    //2. 定义要发送到客户端的数据对象
    const data = {name:'璃柏涟',age:21}
    //3. 拼接出一个函数的调用
    const scriptStr = `${funcName}(${JSON.stringify(data)})`
    //4. 把拼接的字符串，响应给客户端
    res.send(scriptStr)
})

//解决跨域问题 2行代码解决，7-9
const cors = require('cors')
// 注册为全局中间件，一定要在路由之前配置 cors 中间件
app.use(cors())

// 启动服务器
app.listen(3000,()=>{
    console.log('服务器已启动  http://127.0.0.1:3000')
})
```
