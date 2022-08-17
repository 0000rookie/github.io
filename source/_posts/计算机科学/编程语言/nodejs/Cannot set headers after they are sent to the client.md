---
title: Cannot set headers after they are sent to the client
abbrlink: 75a5b758
date: 2022-08-11 23:21:57
tags:
  - NodeJs
  - fail
---

## 报错内容

```javascript
Cannot set headers after they are sent to the client
```

## 原因

原因是服务端给客户端响应多条信息，导致出错

```javascript
    db.query(sql,userinfo.username,(err,results)=>{
        if (err) return res.cc(err)
        if (results.length > 0){
            res.cc('用户名已被占用') // 第一次返回
        }
        const addSql = `insert into tb_user set ?`
        db.query(addSql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('注册失败，请稍候再试')
            res.cc('注册成功',0) // 第二次返回
        })
    })
```

## 解决问题

把多条信息响应修改一下，使服务端给客户端只响应一条信息即可。

```javascript
    db.query(sql,userinfo.username,(err,results)=>{
        if (err) return res.cc(err)
        if (results.length > 0){
            return res.cc('用户名已被占用')	// 增加一个return，这样出错直接给客户端返回信息不往下执行
        }
        const addSql = `insert into tb_user set ?`
        db.query(addSql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('注册失败，请稍候再试')
            return res.cc('注册成功',0)
        })
    })
```

