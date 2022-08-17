---
title: NodeJs系列-Day07-数据库处理
tags:
  - NodeJs
categories:
  - 计算机科学
  - 编程语言
  - nodejs
abbrlink: 2ef85661
date: 2022-07-16 11:28:22

---

## MySql-查

```javascript mysql查询语句
const  mysql = require('mysql')
//端口默认是3306，不需要再添加
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test',
})
let str = 'select * from user'
//测试mysql是否正常工作，select 1 的作用只是测试是否正常工作
db.query(str,(err,results)=>{
    if (err)return console.error(err)
    //查询结构是一个数组对象
    console.log(results)
})
```

查询结构是一个数组对象

```mysql 查询结果
[
  RowDataPacket { name: '璃柏涟', age: 21 },
  RowDataPacket { name: '小黑', age: 18 }
]
```

## MySql-增

### 方法一

```javascript mysql增
const  mysql = require('mysql')
//端口默认是3306，不需要再添加
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test',
})
//方法一：
// 1. 要插入到user表的数据对象
const user = {name:'小白',age:3}
// 2. 要执行的SQL语句，其中英文 ? 表示占位符
let str = 'insert into user (name,age) values(?,?)'
// 3. 使用数组的形式，以此为 ? 占位符指定具体的值
db.query(str,[user.name,user.age],(err,results)=>{
    // 若有错误则打印出来
    if (err) return console.error(err)
    // 若执行成功则打印成功姐结果
    if (results.affectedRows===1){
        console.log('数据插入成功')
    }
})
```

### 方法二

```javascript
const mysql = require('mysql')
//端口默认是3306，不需要再添加
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test',
})

//方法二：
const user = { id:1,name:'小万',age:55}
const sql = 'insert into user set ?'
db.query(sql,user,(err,results)=>{
    if (err){
        console.error(err)
    }
    if (results.affectedRows === 1){
        console.log('插入数据成功')
    }
})
```

### MySql-改

### 方法一

```javascript
const mysql = require('mysql')
//端口默认是3306，不需要再添加
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test',
})

// 方法一：
// 1. 要插入到user表的数据对象
const user = { name: '小qi', age: 33 }
// 2. 要执行的SQL语句，其中英文 ? 表示占位符
let str = 'update user set name =?,age =? where id =2'
// 3. 使用数组的形式，以此为 ? 占位符指定具体的值
db.query(str, [user.name, user.age], (err, results) => {
    // 若有错误则打印出来
    if (err) return console.error(err)
    // 若执行成功则打印成功结果
    if (results.affectedRows === 1) {
        console.log('数据更新成功')
    }
})
```

### 方法二

```javascript
const mysql = require('mysql')
//端口默认是3306，不需要再添加
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test',
})

//方法二：
const user = {id:1,name:'小丫',age:2}
const sql = 'update user set ? where id =?'
db.query(sql,[user,user.id],(err,results)=>{
    if (err){
        return console.log(err.message)
    }
    if (results.affectedRows === 1){
        console.log('更新数据成功')
    }

})
```

## MySql-删

:::info

注意：如果SQL语句中有多个占位符，则必须使用数组为每个占位符指定具体的值
如果SQL语句中只有一个占位符，则可以省略数组

:::

### 标记删除(建议使用)

:::warning

用标记数据状态来假装删除了数据，这样用户可以通过回收站来恢复数据

:::

```javascript
//标记删除
const sql = 'update user set status=1 where id =?'
db.query(sql,2,(err,results)=>{
    if (err){
        return console.log(err.message)
    }
    if (results.affectedRows === 1){
        console.log('标记删除成功')
    }
})
```





### 真实删除

:::danger no-icon

:::

```javascript
const mysql = require('mysql')
//端口默认是3306，不需要再添加
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test',
})

//执行查询的SQL语句
let str = 'delete from user where id =?'
// 调用db.query（）执行SQL语句的同时，为占位符指定具体的值
// 注意：如果SQL语句中有多个占位符，则必须使用数组为每个占位符指定具体的值
// 如果SQL语句中只有一个占位符，则可以省略数组
db.query(str,1, (err, results) => {
    if (err) {
        return console.error(err)
    }
    //打印删除成功
    console.log('删除成功')
})
```

## Web开发模式

### 服务端渲染开发模式

优点：

1. `前端耗时少`。因为服务器端负责动态生成`HTML`内容，浏览器只需要直接渲染页面即可。尤其是移动端，更省电。
2. `有利于SEO`。因为服务器端响应的是完整的`HTML`页面内容，所以爬虫更容易爬取获得信息，更有利于`SEO`。

缺点：

1. `占用服务器端资源`。即服务器端完成``HTML`页面内容的拼接，如果请求较多，会对服务器造成一定的访问压力。
2. `不利于前后端分离，开发效率低`。使用服务器端渲染，则无法进行分工合作，尤其对于前端复杂度高的项目，不利于项目高效开发。

### 前后端分离的Web开发模式

前后端分离的概念：前后端分离的开发模式，`依赖于Ajax技术的广泛应用`。简而言之，前后端分离的Wb开发模式，就是`后端只负责提供AP接口，前端使用Ajx调用接口`的开发模式。

优点：

1. `开发体验好`。前端专注于`UI`页面的开发，后端专注于`api`的开发，且前端有更多的选择性。
2. `用户体验好`。`Ajax`技术的广泛应用，极大的提高了用户的体验，可以轻松实现页面的局部刷新。
3. `减轻了服务器端的渲染压力`。因为页面最终是在每个用户的浏览器中生成的。

缺点：

1. 不利于`SEO`。因为完整的`HTML`页面需要在客户端动态拼接完成，所以爬虫对无法爬取页面的有效信息。
2. 解决方案：利用`Vue`、`React`等前端框架的`SSR`(server side render)技术能够很好的解决`SEO`问题！）

### 如何选择Web开发模式

`不谈业务场景而盲目选择使用何种开发模式都是耍流氓`

- 比如企业级网站，主要功能是展示而没有复杂的交互，并且需要良好的`SEO`,则这时我们就需要使用服务器端渲染：
- 而类似后台管理项目，交互性比较强，不需要考虑`SEO`，那么就可以使用前后端分离的开发模式。

另外，具体使用何种开发模式并不是绝对的，为了`同时兼顾`了`首页的渲染速度`和`前后端分离的开发效率`，一些网站采用了首屏服务器端渲染+其他页面前后端分离的开发模式。

## 选择合适的身份认证

对于`服务端渲染`和`前后端分离`这两种开发模式来说，分别有着不同的身份认证方案：

1. `服务端渲染`推荐使用`Session认证机制`
2. `前后端分离`推荐使用`JWT认证机制`













































