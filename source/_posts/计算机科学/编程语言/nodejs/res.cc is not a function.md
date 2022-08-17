---
title: "res.cc is not a function"
tags:
  - NodeJs
  - fail
abbrlink: 72866bac
date: 2022-08-11 23:44:14
---

## 报错内容

```javascript
TypeError: res.cc is not a function
    at C:\Users\Administrator\Desktop\study\NodeJs\Demo\app.js:36:9
    at Layer.handle_error (C:\Users\Administrator\Desktop\study\NodeJs\Demo\node_modules\express\lib\router\layer.js:71:5)
    at trim_prefix (C:\Users\Administrator\Desktop\study\NodeJs\Demo\node_modules\express\lib\router\index.js:326:13)
    at C:\Users\Administrator\Desktop\study\NodeJs\Demo\node_modules\express\lib\router\index.js:286:9
    at Function.process_params (C:\Users\Administrator\Desktop\study\NodeJs\Demo\node_modules\express\lib\router\index.js:346:12)
    at next (C:\Users\Administrator\Desktop\study\NodeJs\Demo\node_modules\express\lib\router\index.js:280:10)
    at Layer.handle_error (C:\Users\Administrator\Desktop\study\NodeJs\Demo\node_modules\express\lib\router\layer.js:67:12)
    at trim_prefix (C:\Users\Administrator\Desktop\study\NodeJs\Demo\node_modules\express\lib\router\index.js:326:13)
    at C:\Users\Administrator\Desktop\study\NodeJs\Demo\node_modules\express\lib\router\index.js:286:9
    at Function.process_params (C:\Users\Administrator\Desktop\study\NodeJs\Demo\node_modules\express\lib\router\index.js:346:12)
```

## 分析原因

`TypeError: res.cc is not a function`意思是找不到`rec.cc()`函数，那可能是：

1. `rec.cc()`中间件在`注册`路由后
2. 或者`res.cc()`中间件在解析表单数据中间件后

## 解决办法

将`res.cc()`中间件放在解析表单数据中间件前即可

### 修改前

```javascript
// 解析表单的数据中间件，只能解析application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))


// 定义res.cc错误中间件，用于返回错误
app.use((req,res,next)=>{
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = (err,status = 1,data=null)=>{
      res.send({
          status,
          // 状态描述，判断 err 是 错误对象 还是 字符串
          msg: err instanceof Error ? err.message : err,
          data,
      })
    }
    next()
})
```

### 修改后

```javascript
// 定义res.cc错误中间件，用于返回错误
app.use((req,res,next)=>{
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = (err,status = 1,data=null)=>{
      res.send({
          status,
          // 状态描述，判断 err 是 错误对象 还是 字符串
          msg: err instanceof Error ? err.message : err,
          data,
      })
    }
    next()
})


// 解析表单的数据中间件，只能解析application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

```

