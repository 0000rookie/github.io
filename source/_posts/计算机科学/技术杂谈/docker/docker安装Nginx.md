---
title: docker安装Nginx
categories:
  - 计算机科学
  - 技术杂谈
  - docker
abbrlink: 5ae6092
date: 2022-07-22 15:56:33
tags:
---

## 安装nginx



:::info

**系统信息：**

Linux ecs-205380 4.15.0-169-generic #177-Ubuntu SMP Thu Feb 3 10:50:38 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux

本文章将`Nginx`安装在`/home/lilbai/docker_app/nginx`下

:::

### 编写`docker-compose.yml`

进入`/home/lilbai/docker_app/nginx`

```bash
lilbai@: sudo vi docker-compose.yml
```

在`docker-compose.yml`文件内输入如下内容：

```yaml
version: '3.1'
services:
  nginx:
    restart: always
    image: nginx
    container_name: nginx
    ports:
      - 80:80
    volumes:
      - /home/lilbai/docker_app/nginx/conf.d/:/etc/nginx/conf.d
      - /home/lilbai/docker_app/nginx/html/:/usr/share/nginx/html
      - /home/lilbai/docker_app/nginx/logs:/var/log/nginx
```

#### 内容分析

```yaml
version: '3.1'				# 版本
services:
  nginx:					# web程序
    restart: always
    image: nginx			# 镜像名，或者镜像下载地址也可以
    container_name: nginx	# 之后构建容器的名字
    ports:					# 端口映射
      - 80:80				# 主机端口：容器端口
    volumes:
      - /home/lilbai/docker_app/nginx/conf.d/:/etc/nginx/conf.d
      - /home/lilbai/docker_app/nginx/html/:/usr/share/nginx/html
      - /home/lilbai/docker_app/nginx/logs:/var/log/nginx
```



### 构建docker容器

```bash
lilbai@: docker-compose build
```

### 更新docker-compose

```bash
lilbai@: docker-compose up -d
```

### 查看容器是否存在

```bash
lilbai@: docker ps
```

存在后即前面步骤操作成功

### 查看映射文件夹是否存在

进入`/home/lilbai/docker_app/nginx/`查看

```bash
lilbai@: cd /home/lilbai/docker_app/nginx/
lilbai@: ls
conf.d  docker-compose.yml  html  logs
```

`conf.d`、`html`、`logs`映射的文件夹已经存在。

- conf.d是`server`块配置文件夹
- html是页面资源文件夹
- logs是日志文件夹

### 编写server块

进入`/home/lilbai/docker_app/nginx/conf.d`文件夹，编辑`default.conf`文件，如果没有`default.conf`文件，则新建即可。

```bash
lilbai@: sudo vi default.conf
```

将以下内容填入`default.conf`

```yml
server{
  listen 80;
  server_name localhost;
  
  location / {
    root  /usr/share/nginx/html;
    index.html index.htm;
  }
  
  location /test {
    root /usr/share/nginx/html/test;
    index index.html index.htm;

  }
  
  
}
```

### 添加html访问资源

```bash
lilbai@: cd /home/lilbai/docker_app/nginx/html
lilbai@: vi index.html
# 如果 vi index.html 不能保存的话，则使用 sudo vi index.html
```

随便在`index.html`写点东西即可

```html
<h1>
    11111
</h1>
```

### 重启Nginx

编辑完资源文件，重启`docker-compose`或者`nginx`都可以

```bash
lilbai@: docker-compose restart
# 或者
lilbai@: docker restart nginx
```

