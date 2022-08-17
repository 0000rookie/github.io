---
title: NodeJs系列-Day08-JWT
tags:
  - NodeJs
categories:
  - 计算机科学
  - 编程语言
  - nodejs
abbrlink: 1678fbd0
date: 2022-07-17 16:29:52

---

## JWT的工作原理

本地文件

![image-20220717163156633](http://hikki.test.upcdn.net/20220731172334.png)

## JWT的组成部分

JWT通常由三部分组成，分别是Header(头部)、Payload(有效荷载)、Signature(签名)。

三者之间使用英文的`.`分隔，格式如：`Header.Payload.Signature`

下面是JWT字符串的示例：

```json JWT字符串示例
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

## JWT的三个部分各自代表的含义

`Payload`部分是`真正用户信息`，它是用户信息经过`加密`之后生成的字符串。

`Header`和`Signature`是安全性相关的部分，只是为了保证`Token`的安全性。

## JWT的使用方式

客户端收到服务器返回的`JWT`之后，通常会将它储存在`localStorage`或`sessionStorage`中。
此后，客户端每次与服务器通信，都要带上这个`JWT`的字符串，从而进行身份认证。推荐的做法是把`JWT`放在`HTTP`请求头的Authorization字段中，格式如下：

```yaml
Authorization:Bearer <token>
```

## 安装JWT相关的包

安装一下两个相关的包：

```bash
npm install jsonwebtoken express-jwt
```

其中：

- `jsonwebtoken`用于生成`JWT`字符串
- `express-jwt`用于将`JWT`字符串解析还原成`JSON`对象

## 导入JWT相关的包

```javascript
// 导入JWT相关的包 jsonwebtoken express-jwt
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
```

## 定义secret密钥

```javascript
// 定义secret 密钥 建议将密钥命名为 secretKey
const secretKey = 'xiaobaitest'
```

## 将JWT字符串还原为 JSON对象

:::info

注意：只要配置成功了 express-jwt中间件，就可以把解析出来的用户信息挂载到req.user属性上

:::

客户端每次在访问那些有权限接口的时候，都需要主动通过请求头中的`Authorization`字段，将`Token`字符串发送到服务器进行身份认证。
此时，服务器可以通过``express-jwt`这个中间件，自动将客户端发送过来的`Token`解析还原成`JOSN`对像：

```javascript
// 一定要在路由之前配置解析 token 的中间件 
const expressJWT = require('express-jwt')
// 注册将 JWT 字符串解析还原成JSON对象的中间件
app.use(expressJWT({secret : secretKey}).unless({path :[/^\/api\//]}))
```

### 使用`req.user`获取用户信息

当`express-jwt`这个中间件配置成功之后，即可在那些有权限的接口中，使用`req.user`对象，来访问从`JWT`字符串中解析出来的用户信息了，示例代码如下：

```javascript app.js
// 登录用户的函数
exports.login = (req, res) => {
    const userinfo = req.body
    const usernameSql ='select * from ev_users where username= ?'

    db.query(usernameSql,userinfo.username,(err,results)=>{
        // 错误提示
        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('登录失败')

        // 验证密码是否正确
        const comparreResults = bcrypt.compareSync(userinfo.password,results[0].password)
        if (!comparreResults) return res.cc('密码错误！请重新输入')
        
        // 在服务端生成token字符串
        const user = {...results[0],password:'',usre_pic:''}
        // 对用户的信息进行加密，生成token字符串
        // console.log(config.expriresIn)
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{expiresIn: '48h'})
        res.send({
            status:0,
            msg:'登录成功',
            token:'Bearer '+tokenStr,
        })
    })
}
```





































































