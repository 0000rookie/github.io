---
title: 记录自用hexo模块
tags:
  - 博客
  - 记录
categories:
  - 计算机科学
  - 博客
  - 模块
abbrlink: 4d530639
date: 2022-04-12 21:45:49
---

如何查看安装了什么插件？

### 查看全局安装的包

`npm list -g --depth 0`

### 查看hexo所有的插件

`npm list --depth 0`

## 记录自用hexo模块

| 模块名称                        | 安装                                            | 作用                                             |
| ------------------------------- | ----------------------------------------------- | ------------------------------------------------ |
| hexo-deployer-git               | npm install hexo-deployer-git --save            | 将本地仓库部署到git                              |
| hexo-generator-archive          | npm install hexo-generator-archive --save       | 将文章归档                                       |
| hexo-generator-category         | npm install hexo-generator-category --save      | 将文章分类                                       |
| hexo-generator-index            | npm install hexo-generator-index --save         | 构建文章索引                                     |
| hexo-generator-tag              | npm install hexo-generator-tag --save           | 生成标签                                         |
| hexo-renderer-ejs               | npm install hexo-renderer-ejs --save            | EJS渲染器                                        |
| hexo-renderer-stylus            | npm install hexo-renderer-stylus --save         | stylus渲染器                                     |
| hexo-server                     | npm install hexo-server --save                  | 生成本地服务器，一般用来调试写作，端口默认4000   |
| hexo-theme-landscape            | npm i hexo-theme-landscape                      | 默认主题                                         |
|                                 | **以上是自带的模块**                            |                                                  |
| hexo-renderer-multi-markdown-it | npm i hexo-renderer-multi-markdown-it --save    | md 文件渲染器，压缩 css/js/html(shoka主题必需)   |
| hexo-abbrlink                   | npm install hexo-abbrlink --save                | 生成永久链接支持crc16或者crc32                   |
| hexo-admin                      | npm install --save hexo-admin                   | 在线管理文章，打开 http://localhost:4000/admin/  |
| hexo-algoliasearch              | npm install hexo-algoliasearch --save           | 在hexo上添加搜索功能                             |
| hexo-asset-image                | npm install hexo-asset-image --save             | 自动给hexo的图片添加绝对路径                     |
| hexo-auto-category              | npm install hexo-auto-category --save           | 自动从每个文章文件结构自动生成类别               |
| hexo-autoprefixer               | npm install hexo-autoprefixer --save            | 给生成的 css 文件们添加浏览器前缀(shoka主题必需) |
| hexo-blog-encrypt               | npm install --save hexo-blog-encrypt            | 给文章加密，需要密码才能查看                     |
| hexo-feed                       | npm install hexo-feed --save-dev                | 生成 Feed 文件                                   |
| hexo-generator-baidu-sitemap    | npm install hexo-generator-baidu-sitemap --save | 生成站点地图，用于给百度引擎提供链接             |
| hexo-generator-sitemap          | npm install hexo-generator-sitemap --save       | 生成站点地图，用于给搜索引擎提供链接             |
| hexo-generator-searchdb         | npm install hexo-generator-searchdb             | 用于生成搜索索引文件                             |
| hexo-helper-live2d              | npm install --save hexo-helper-live2d           | 看板娘                                           |
| hexo-symbols-count-time         | npm install hexo-symbols-count- time            | 文章或站点字数及阅读时间统计                     |
| hexo-wordcount                  | npm i --save hexo-wordcount                     | 统计阅读时长和字数                               |
