---
title: "解决Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the
  client"
tags: 
  - NodeJs
  - fail
categories:
  - 计算机科学
  - 编程语言
  - nodejs
abbrlink: 94c34737
date: 2022-07-19 13:55:37
---

## 错误

```javascript
C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\mysql\lib\protocol\Parser.js:437
      throw err; // Rethrow non-MySQL errors
      ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at new NodeError (internal/errors.js:322:7)
    at ServerResponse.setHeader (_http_outgoing.js:561:11)
    at ServerResponse.header (C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\express\lib\response.js:771:10)
    at ServerResponse.send (C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\express\lib\response.js:170:12)
    at ServerResponse.json (C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\express\lib\response.js:267:15)
    at ServerResponse.send (C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\express\lib\response.js:158:21)
    at Query.<anonymous> (C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\router_handler\user.js:26:24)
    at Query.<anonymous> (C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\mysql\lib\Connection.js:526:10)
    at Query._callback (C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\mysql\lib\Connection.js:488:16)
    at Query.Sequence.end (C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\mysql\lib\protocol\sequences\Sequence.js:83:24) {
  code: 'ERR_HTTP_HEADERS_SENT'
}
[nodemon] app crashed - waiting for file changes before starting...
```

## 解决前

```javascript
    // 定义sql语句，查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr,[userinfo.username],(err,results)=>{
        // 执行sql语句
        if (err){
            return res.send({status:1,msg:err.message})
        }

        // 判断用户名是否被占用
        if (results.length > 0){
            return res.send({status:1, msg:'用户名已被占用，请更换其他用户名'})
        }
        // TODO : 用户名可用，其他操作

    })
    res.send('reguser OK')
```

## 解决后

其实就是服务端同时给客户端重复响应两个消息，才会报错，因为在每一个`if`判断都响应了一个消息，`if`接受后我还是响应一个消息，那我响应的消息就是两个了，就报错了，所以把最后一个响应删掉就可以了

    // 定义sql语句，查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr,[userinfo.username],(err,results)=>{
        // 执行sql语句
        if (err){
            return res.send({status:1,msg:err.message})
        }
    
        // 判断用户名是否被占用
        if (results.length > 0){
            return res.send({status:1, msg:'用户名已被占用，请更换其他用户名'})
        }
        // TODO : 用户名可用，其他操作
    })







