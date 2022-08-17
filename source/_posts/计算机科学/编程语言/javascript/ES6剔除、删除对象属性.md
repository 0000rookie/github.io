---
title: ES6剔除、删除对象属性
abbrlink: 30d04ec
date: 2022-08-10 23:22:42
tags:
---



## 剔除age属性

### 方法一

```javascript
const arr = {
    name: '小王',
    id: 1,
    age: 18        
  } 
// 剔除age
delete arr.age    
console.log(arr)    
// 结果：{ id: 1, name: '小王' }
```

### 方法二

```javascript
const arr = {
    name: '小王',
    id: 1,
    age: 18        
  } 
// 剔除age
const  {age, ...arr2} = arr
console.log(arr2)  
// 结果：{  id:1 , name: '小王' }
```



### 方法三

```javascript
const arr = {
    name: '小王',
    id: 1,
    age: 18        
  } 
// 剔除age
const arr2 = { ...arr2，age:""} 
console.log(arr2)  
// 结果：{  name: '小王' ,id:1 , age: ""}
```

