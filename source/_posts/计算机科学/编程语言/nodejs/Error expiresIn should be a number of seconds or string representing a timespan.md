---
title: "Error: 'expiresIn' should be a number of seconds or string representing a
  timespan"
categories:
  - 计算机科学
  - 编程语言
  - nodejs
abbrlink: bdd9dd56
date: 2022-07-23 00:56:54
tags:
  - NodeJs
  - fail
---

## 报错内容

```javascript
C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\mysql\lib\protocol\Parser.js:437
      throw err; // Rethrow non-MySQL errors
      ^
Error: "expiresIn" should be a number of seconds or string representing a timespan
    at C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\jsonwebtoken\sign.js:52:15
    at Array.forEach (<anonymous>)
    at validate (C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\jsonwebtoken\sign.js:43:6)
    at validateOptions (C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\jsonwebtoken\sign.js:58:10)
    at Object.module.exports [as sign] (C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\jsonwebtoken\sign.js:141:5)   
    at Query.<anonymous> (C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\router_handler\user.js:71:30)
    at Query.<anonymous> (C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\mysql\lib\Connection.js:526:10)
    at Query._callback (C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\mysql\lib\Connection.js:488:16)
    at Query.Sequence.end (C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\mysql\lib\protocol\sequences\Sequence.js:83:24)
    at Query._handleFinalResultPacket (C:\Users\Administrator\Desktop\学习\NodeJs\TestDemo\node_modules\mysql\lib\protocol\sequences\Query.js:149:8)
```

## 解决问题

我在`config.js`文件创建了`expriresIn:'10h'`全局变量，但是在`user.js`引用却失败了，将`config.expriresIn`改为`'10h'`就没问题了。猜测应该是将变量引入之后不是字符串了，解析成其他格式，导致引发错误。

原代码：

```javascript config.js
// 这是全局的配置文件
module.exports = {
    // 加密和解密token的密钥
    jwtSecretKey : 'lilbai518',
    // token的有效期10小时
    expriresIn: '10h'
}
```

```javascript user.js
const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn: config.expriresIn})
```

修改后代码：

```javascript
const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn: '10h'})
```

