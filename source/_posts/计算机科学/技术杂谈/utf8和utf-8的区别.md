---
title: utf8和utf-8的区别
categories:
  - 计算机科学
  - 技术杂谈
abbrlink: d845073d
date: 2022-07-11 18:23:31
tags:
  - 科普
---

## `utf8`和`utf-8`

在使用中常常遇到 `utf-8` 和 `utf8`，现在终于弄明白他们的使用不同之处了，现在来和大家分享一下，下面我们看一下 `utf-8` 和 `utf8` 有什么区别。

`utf-8 `是标准写法，`PHP` 在` Windows`下边英文不区分大小写，所以也可以写成 `utf8`。`UTF-8 ` 也可以把中间的`-`省略，写成 `UTF8`。一般程序都能识别，但也有例外（如下文），为了严格一点，最好用标准的大写``UTF-8`。

在数据库中只能使用`utf8(MySQL) ` 在`MySQL`的命令模式中只能使用`utf8`，不能使用`utf-8`，也就是说在`PHP`程序中只能使用 `set names  utf8(不加小横杠)`，如果你加了`-`此行命令将不会生效，但是在 `PHP` 中 `header` 时却要加上`-`，因为` IE`  不认识没杠的`utf8`，原因见下文。

`PHP` 中的 `header`：

```php
<?php header('Content-Type: text/html; charset=UTF-8'); ?> //奇怪了：Content-Type 用冒号，Chatset却是等号。
```

静态文件使用：

总结：【只有在`MySQL`中可以使用`utf-8`的别名`utf8`，但是在其他地方一律使用大写`UTF-8`。】

具体为：

除了在命令` mysql_query(set names utf8)` 外一律用大写`UTF-8`。
