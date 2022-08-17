---
title: python安装/更新包出现报错
tags:
  - fail
  - Python
categories:
  - 计算机科学
  - 编程语言
  - python
abbrlink: 6c24ad8e
date: 2022-05-13 00:24:09
---

## WARNING: Retrying (Retry(total=4, connect=None, read=None, redirect=None, status=None)) after connection broken by 'ProxyError('Cannot connect to proxy.', OSError(0, 'Error'))': /pypi/simple/eyed3/ 

出现错误如图所示

![](https://cdn.jsdelivr.net/gh/0000rookie/imgs/2022053531.png)

## 解决方法：

### 方法一

关闭你的梯子就解决问题了，哈哈

### 方法二

指定源下载

```apl
pip install requests -i http://pypi.douban.com/simple --trusted-host pypi.douban.com
```

我的源是阿里云的源，我挂了梯子就用不了，关了梯子就可以了。

```apl
国内的pip源，如下：

阿里云 http://mirrors.aliyun.com/pypi/simple/

中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/

豆瓣(douban) http://pypi.douban.com/simple/

清华大学 https://pypi.tuna.tsinghua.edu.cn/simple/

中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple/

```

