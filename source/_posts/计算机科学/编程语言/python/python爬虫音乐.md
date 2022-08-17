---
title: python爬虫-千千音乐
categories:
  - 计算机科学
  - 编程语言
  - python
abbrlink: b332b009
date: 2022-05-14 01:56:30
tags:
  - Python
---

## 所需模块

- requests
- time
- time
- hashlib
- eyed3

## 批量爬取歌单

```python
import music_tool as mt
import requests
import time
import hashlib

# 一般10位数是时间戳
# sign=a297a40b4ea2855a17beec0addca5841&appid=16073360&TSID=T10046802964&timestamp=1652362462

search_url = 'https://music.91q.com/v1/search'
# 请求头，模拟浏览器，防止被网站发现是爬虫
search_headers = {
    'cookie': 'Hm_lvt_d0ad46e4afeacf34cd12de4c9b553aa6=1652356550; cuid=bb25b798-46c6-5585-a57d-bccaf5d75418; Hm_lpvt_d0ad46e4afeacf34cd12de4c9b553aa6=1652366280',
    'referer': 'https://music.91q.com/proxy',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36'
}
# 获取歌曲所需的参数：设置请求参数
appid = '16073360'  # 固定不变
# 获取歌曲所需的参数：时间戳
search_timestamp = int(time.time())  
# 获取歌曲所需的参数：搜索关键字
word = '薛之谦'
# 获取歌曲所需的参数：搜索页面的页数
pageNo = '2'
# # 获取歌曲所需的参数：r
r = f"appid={appid}&pageNo={pageNo}&pageSize=20&timestamp={search_timestamp}&type=1&word={word}0b50b02fd0d73a9c4c8c3a781c30845f"
# 获取歌曲所需的参数：sign
sign = hashlib.md5(r.encode('utf-8')).hexdigest()
# 搜索所需要携带参数
search_params = {
    'sign': sign,
    'word': word,
    'type': '1',
    'pageNo': pageNo,
    'pageSize': '20',
    'appid': appid,
    'timestamp': search_timestamp
}
# 提交get请求
search_response = requests.get(url=search_url, params=search_params, headers=search_headers)
# 获取页面的全部歌曲 typeTrack
list_music = search_response.json()['data']['typeTrack']
# pprint(list_music)


i = 1
# 循环遍历读取歌曲
for music in list_music:
    i += 1
    TSID = music['id']  # 歌曲ID
    # TSID='T10049775641'
    timestamp = int(time.time())
    url = "https://music.91q.com/v1/song/tracklink"
    r = f"TSID={TSID}&appid={appid}&timestamp={timestamp}0b50b02fd0d73a9c4c8c3a781c30845f"
    sign = hashlib.md5(r.encode('utf-8')).hexdigest()
    params = {
        'sign': sign,
        'appid': appid,
        'TSID': TSID,
        'timestamp': timestamp
    }
    # 对单次请求模拟请求头
    headers = {
        'cookie': 'Hm_lvt_d0ad46e4afeacf34cd12de4c9b553aa6=1652356550; cuid=bb25b798-46c6-5585-a57d-bccaf5d75418; Hm_lpvt_d0ad46e4afeacf34cd12de4c9b553aa6=1652366280',
        'referer': 'https://music.91q.com/proxy',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36'
    }
    # 获取歌曲信息
    list_res = requests.get(url=url, params=params, headers=headers)
    music_url = list_res.json()['data']['path']
    music_name = list_res.json()['data']['title']
    singer_name = list_res.json()['data']['artist'][0]['name']
    music_lyric = list_res.json()['data']['lyric']
    music_pic = list_res.json()['data']['pic']

    # print(list_res.text)
    # 下载歌曲
    music_data = requests.get(music_url).content
    # 下载歌曲封面
    music_pic_data = requests.get(music_pic).content
    # 下载歌曲歌词
    music_lyric_data = requests.get(music_lyric).content
    # 下载之后写入到文件中
    with open(f"music_list/{music_name}-{singer_name}.mp3", mode='wb') as f:
        f.write(music_data)
    with open(f"music_list/{music_name}-{singer_name}.jpg", mode='wb') as f:
        f.write(music_pic_data)
    with open(f"music_list/{music_name}-{singer_name}.lrc", mode='wb') as f:
        f.write(music_lyric_data)
    # 对歌曲内容进行修改(可选)
    msg = mt.edit_music_message(f"music_list/{music_name}-{singer_name}.mp3", music_name, singer_name, singer_name,
                                music_name)
    print(i, singer_name, music_name, msg)
    

```

## 对歌曲修改信息

```python
import eyed3

def edit_music_message(music_path,music_title,artist,album,album_artist):
    """
    @param music_path: 歌曲文件路径
    @param artist: 歌曲作者
    @param album: 专辑名称
    @param album_artist: 专辑作者
    @param music_title:  歌曲名
    """
    audiofile = eyed3.load(music_path) # 加载歌曲文件
    audiofile.tag.title = music_title  # 歌曲名
    audiofile.tag.artist = artist  # 作者
    audiofile.tag.album = album      # 唱片集
    audiofile.tag.album_artist = album_artist  # 作者
    audiofile.tag.track_num = 3     #音轨号，在专辑中排第几
    audiofile.tag.save() # 保存文件
    return '歌曲信息修改成功'

```

