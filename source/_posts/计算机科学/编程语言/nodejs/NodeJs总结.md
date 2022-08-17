---
title: NodeJs总结
tags:
  - NodeJs
abbrlink: b39c4633
date: 2022-07-30 22:29:59
---

## 项目树

```yaml
TestDemo                   
├─ db          				// 连接数据库            
│  └─ index.js             
├─ router       			// 路由规则           
│  ├─ artcata.js           
│  ├─ article.js           
│  ├─ user.js              
│  └─ userinfo.js          
├─ router_handler          // 路由函数体
│  ├─ artcata_handler.js   
│  ├─ article_handler.js   
│  ├─ userinfo_handler.js  
│  └─ user_handler.js      
├─ schema                  //数据校验规则
│  ├─ article.js           
│  └─ user.js                       
├─ uploads                 // 文件上传存储位置
├─ app.js                  // 程序启动入口
├─ config.js               // 全局变量配置
├─ package-lock.json       
└─ package.json  
```

## 程序入口`app.js`

### 跨域问题

在写项目是一般要都会遇到跨域的问题，要如何解决呢？

在客户端对服务端请求的数据的程序入口添加`cors`中间件来解决跨域问题

```javascript app.js
// 解决跨域问题，导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())
```

## 表单数据解析

只需要添加`urlencoded中间件`就可以解析表单数据了

```javascript app.js
const express = require('express')
// 解析表单的数据中间件，只能解析application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
```



## 错误中间件

服务端在处理数据时难免会有错误，这时需要一个中间件来处理这些错误。

先封装一个中间件用来处理发生错误时给客户端返回的响应数据，可以减少代码冗余。

:::info

在给客户端返回数据时应该有规定的格式，应该有响应码和响应描述`{ status:0 , msg: '响应内容' }`

:::

```javascript app.js
// 封装res.cc的捕捉错误中间件
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      msg: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)

  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

  // 未知错误
  res.cc(err)
})
```

## 登录 & 注册

### 解析数据

利用`urlencoded`中间件解析表单传过来的数据。

导入登录注册的路由并定义入口地址前缀`/api`

```javascript app.js
// 解析表单的数据中间件，只能解析application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

//导入路由
const userRouter = require('./router/user')
app.use('/api',userRouter)
```

### 登录

请求地址:`127.0.0.1:3000/api/login`

参数格式：

`username`:`value`

`password`:`value`

![image-20220731124011773](http://hikki.test.upcdn.net/20220731131856.png)

### 注册

请求地址：`127.0.0.1:3000/api/reguser`

参数格式：

`username`:`value`

`password`:`value`

![image-20220731132033648](http://hikki.test.upcdn.net/20220731132033.png)

在注册和登录要进行数据的校验：

1. 先验证数据是否为空或者数据是否合乎规则
2. 查询用户名是否被占用
3. 登录成功/添加成功

在验证用户名和密码一般需要使用`joi`模块来校验规则。

以下是`schema/user.js`的文件，主要功能是对客户端对个人用户信息修改进行规则验证。

```javascript schema/user.js
const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(15).required()
// 密码的验证规则
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()

// id 的验证规则
const id = joi.number().required().integer().min(1)
// 昵称的验证规则
const nickname = joi.string().required()
// email的验证规则
const email = joi.string().email().required()
// 头像验证规则
const avatar = joi.string().dataUri().required()

// 注册和登录表单的验证规则对象
exports.reg_login_schema = {
  // 表示需要对 req.body 中的数据进行验证
  body: {
    username,
    password,
  },
}

exports.update_userinfo_schema = {
  // 需要对req.body 里面的数据进行验证。
  // 如果body里面的变量名和客户端传过来的变量名一致的，就可以不用写冒号，原本是:
  // id:id,nickname:nickname,email:email
  body:{
    id,
    nickname,
    email,
  },
}

// 验证规则对象 - 重置密码
exports.update_password_schema = {
  body: {
    // 使用 password 这个规则，验证 req.body.oldPwd 的值
    oldPwd: password,
    // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
    // 解读：
    // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  },
}

// 头像验证对象
exports.reg_avatar_schema = {
  body:{
    avatar,
  },
}
```

然后在请求时校验规则，在导入规则对象时记得要加`{}`，以下是`router/user.js`文件，主要功能是对个人信息相关的路由进行控制。

```javascript router/user.js
const express = require('express')，
// 创建路由对象
const router = express.Router()

// 导入用户路由模块处理函数对应的模块
const  user_handler = require('../router_handler/user_handler')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')

// 2. 导入需要的验证规则对象
const  { reg_login_schema }  = require('../schema/user')

// 注册新用户
router.post('/reguser',expressJoi(reg_login_schema),user_handler.reguser )

// 登录
router.post('/login',expressJoi(reg_login_schema), user_handler.login)

// 将路由对象共享出去
module.exports = router
```

## 请求地址处理

在设计项目初期，应该给不同类型的内容设计不同的请求地址，防止项目路由混乱。

- 比如在注册登录使用路由前缀`/api`

- 在用户发布文章使用前缀`/my/article`
- 在用户查阅个人信息时使用前缀`/my`

## 路由处理

项目有非常多的请求地址，应该有条理的把路由整齐划分，将路由请求方式和路由函数体分开，以便能够查阅清洗条例的路由请求方式。

:::info 

在路由请求方式中，记得在末尾导出路由对象`module.exports = router`。

在路由函数体也要导出函数对象`exports.login = (req, res) => {}`

:::

比如以下:

```yaml
TestDemo
├─ router       			// 路由规则           
│  ├─ artcata.js           
│  ├─ article.js           
│  ├─ user.js              
│  └─ userinfo.js          
├─ router_handler          // 路由函数体
│  ├─ artcata_handler.js   
│  ├─ article_handler.js   
│  ├─ userinfo_handler.js  
│  └─ user_handler.js    
```

## 数据校验

在客户端给服务通过`url`传参数的时候，

在`joi模块`校验应该把规则变量挂载到`params`而不是`body`下，使用`id`的时候是通过`req.params.id`

```javascript 
// 这里不是body，是params
exports.delete_cate_schema = {
    params:{
        id,
    }
}
```













## 此项目所使用到的模块以及某些案例

### 数据校验案例

```javascript
const express = require('express')
const app = express()
// 导入 Joi 来定义验证规则
const Joi = require('joi')
// 1. 导入 @escook/express-joi
const expressJoi = require('@escook/express-joi')

// 解析 x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 2. 定义验证规则
// 注意：如果客户端提交的某些参数项未在 schema 中定义，
// 此时，这些多余的参数项默认会被忽略掉
const userSchema = {
  // 2.1 校验 req.body 中的数据
  body: {
    username: Joi.string().alphanum().min(3).max(12).required(),
    password: Joi.string()
      .pattern(/^[\S]{6,15}$/)
      .required(),
    repassword: Joi.ref('password')
  },
  // 2.2 校验 req.query 中的数据
  query: {
    name: Joi.string().alphanum().min(3).required(),
    age: Joi.number().integer().min(1).max(100).required()
  },
  // 2.3 校验 req.params 中的数据
  params: {
    id: Joi.number().integer().min(0).required()
  }
}

// 3. 在路由中通过 expressJoi(userSchema) 的方式
//    调用中间件进行参数验证
app.post('/add', expressJoi(userSchema), function (req, res) {
  const body = req.body
  res.send(body)
})

// 4.1 错误级别中间件
app.use(function (err, req, res, next) {
  // 4.1 Joi 参数校验失败
  if (err instanceof Joi.ValidationError) {
    return res.send({
      status: 1,
      message: err.message
    })
  }
  // 4.2 未知错误
  res.send({
    status: 1,
    message: err.message
  })
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3001, function () {
  console.log('Express server running at http://127.0.0.1:3001')
})
```

### 所用到的包

```json
{
  "name": "TestDemo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@escook/express-joi": "^1.1.1",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "express-jwt": "^5.3.3",
    "joi": "^17.6.0",
    "jsonwebtoken": "^8.5.1",
    "multer": "^1.4.2",
    "mysql": "^2.18.1"
  }
}

```

### 删除文章案例

```javascript
// 删除文章
exports.deleteCateById = (req,res)=>{
    //0表示未删除，1表示已删除
    const sql = `select * from ev_article_cate where id =?`
    db.query(sql,req.params.id,(err,results)=>{
        if (err) return res.cc(err)
        const delSql = `update ev_article_cate set is_delete = 1 where id = ?`
        db.query(delSql,req.params.id,(err,results)=>{
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('删除文章失败')
            res.cc('删除文章成功',0)
        })
    })
}
```



























































