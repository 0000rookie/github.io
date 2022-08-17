---
title: Ubuntu怎么开启FTP(菜鸡篇)
categories:
  - 计算机科学
  - 技术杂谈
  - Linux
abbrlink: c5deac78
tags:
  - Linux
  - 服务器
date: 2022-06-07 17:49:23
---

## 安装vsftpd

```bash
yum install -y vsftpd # 或者
apt install vsftpd 
```

出现下图类似就说明成功了

![](http://hikki.test.upcdn.net/202206074223.jpeg)



## 配置vsftpd

:::info

我的系统是Ubuntu 18.04

:::

`vsftp`配置文件在`/etc/vsftpd.conf`

如果你不会修改文件？可参考这篇文章

{% links %}

- site: Vim修改文件

  url: https://hikki.site/9a6dde1d.html

  desc: Linux简单修改文件

  image: http://hikki.test.upcdn.net/202206054042.jpeg

  color: "#d43f8d"

{% endlinks %}

这是我的配置，你也可以直接复制进去你的配置文件

```bash
# 禁止匿名用户登录
anonymous_enable=NO
# 允许系统用户登录
local_enable=YES
# 启用可以修改文件的 FTP 命令
write_enable=YES
# 本地用户创建文件的 umask 值
local_umask=022
# 允许为目录配置显示信息,显示每个目录下面的message_file文件的内容
dirmessage_enable=YES
# 开启日记功能 
xferlog_enable=YES
# 使用标准的20端口来连接ftp 
connect_from_port_20=YES
# 使用标准日志格式 
xferlog_std_format=YES
# 如果启动这项功能，则所有列在chroot_list_file之中的使用者不能更改根目录
# chroot_list_enable=YES
# 指定限制的用户文件
# chroot_list_file=/etc/vsftpd/chroot_list
# ftp服务器将处于独立启动模式
listen=YES
# 设置一个本地用户登录后进入到的目录
local_root=/var/ftp/text
# 设置PAM认证服务的配置文件名称，该文件保存在“/etc/pam.d/”目录下
pam_service_name=vsftpd
# ftp将检查userlist_file设置文件中指定的用户是否可以访问vsftpd服务器
userlist_enable=YES
# 只允许user_list文件中记录的ftp用户能登录vsftp服务，其他的ftp用户都不可以登录。
userlist_deny=NO
```

## 指定FTP登录到的文件夹

意思就是打开在电脑打开`FTP`的时候文件夹

这里我选择在`/var`下面新建`ftp`文件夹，`ftp`登录的时候就是进入`text`这个文件夹

完整路径是`/var/ftp/text`

```bash
>>> cd /var
>>> mkdir -p ftp/text # —p 的意思是可以创建递归文件夹
```

:::info

mkdir ftp 是创建单个文件夹

mkdir - p ftp/text 是可以创建文件夹的子文件夹，也就是递归目录

:::

## 添加指定用户登录

```bash
>>> useradd -g lilbai ftpuser # 这里我创建的是lilbai518
>>> passwd ftpuser 
>>> # 输入密码，输入密码时是不显示的。重复输入两次
```

![](http://hikki.test.upcdn.net/202206111805.jpg)

```bash
cd /var # 进入var文件夹
ls -l # 查看文件夹的属性
```

![](http://hikki.test.upcdn.net/202206112050.jpeg)

![](http://hikki.test.upcdn.net/202206114348.jpeg)

根据上图，看到`ftp`的所属用户和所属组是`root`，我们需要改成`ftpuser`

```bash
>>> chown -R ftpuser ftp
>>> ls -l # 再次查看ftp属性，此时看到已经是所属ftpuser用户了
>>> service vsftpd restart # 重启vsftpd服务
```

## 设置端口

FTP默认是使用21端口的，当然你也可以设置别的端口，这样在vsftpd.conf配置文件改一下端口就好了。一般添加端口前先去检查一下这个端口有没有被别的程序占用。

进入`root`用户，添加`21`端口，我的防火墙是`ufw`，如果你的防火墙是`iptables`、`Firewalld`、`TCP wrappers`等，根据你的防火墙开启21端口。开启防火墙看一下防火墙的运行状态。

:::info

下面我的有几个重复的`21`端口，是因为我重复开启了两次。正常的话只有两个`21`端口，一个是`IPv4`端口，一个是`IPv6`的端口，

:::

![](http://hikki.test.upcdn.net/202206112844.jpeg)

## 测试FTP

```bash
>>> ftp 192.168.253.235
>>> ftpuser
>>> # 输入密码
<<< 230 Login successful. # 看到这句话说明成功了
<<< Login failed. # 看懂这句话说明失败了，根据失败原因去查一下
```

## 过程遇到错误集合

### Linux怎么查看IP地址

```bash
ifconfig # 查看IP地址指令，在win电脑是ipcinfig，就是p改为f而已
```

我的IP地址是 `192.168.253.135`，`inet`表示`IPv4`，`inet6`表示`IPv6`

![](http://hikki.test.upcdn.net/202206073332.jpeg)

### AUTHENTICATING FOR org.freedesktop.systemd1.manage-units

```bash
>>> systemctl start vsftpd.service
<<< ==== AUTHENTICATING FOR org.freedesktop.systemd1.manage-units ===
启动“vsftpd.service”需要认证。
Multiple identities can be used for authentication:
 1.  python,,, (python) #这两个是我的Linux系统用户
 2.  judge
Choose identity to authenticate as (1-2): 1
Password:  # 但是输入密码重新打开，还是出现一样的错误，我直接用进入root用户打开就成功了
>>> su
```

![](http://hikki.test.upcdn.net/202206071934.jpeg)

没有权限，直接进入root最高权限就可以执行了

### 没有出现tcp 21端口

在查看21端口时没有出现端口，说明在配置vsftpd.conf的文件出错了，需要去改一下

![](http://hikki.test.upcdn.net/202206071949.jpeg)

### FTP service启动失败

```bash
● vsftpd.service - vsftpd FTP server
   Loaded: loaded (/lib/systemd/system/vsftpd.service; enabled; vendor preset: enabled)
   Active: failed (Result: exit-code) since Tue 2022-06-07 17:22:12 CST; 2s ago
  Process: 38535 ExecStart=/usr/sbin/vsftpd /etc/vsftpd.conf (code=exited, status=2)
  Process: 38524 ExecStartPre=/bin/mkdir -p /var/run/vsftpd/empty (code=exited, status=0/SUCCESS)
 Main PID: 38535 (code=exited, status=2)

Jun 07 17:22:12 ubuntu systemd[1]: Starting vsftpd FTP server...
Jun 07 17:22:12 ubuntu systemd[1]: Started vsftpd FTP server.
Jun 07 17:22:12 ubuntu systemd[1]: vsftpd.service: Main process exited, code=exited, status=2/INVALIDARGUMENT
Jun 07 17:22:12 ubuntu systemd[1]: vsftpd.service: Failed with result 'exit-code'.

```

### 500 OOPS: could not read chroot() list file:/etc/vsftpd.chroot_list

![](http://hikki.test.upcdn.net/202206072133.jpg)

根据报错内容说无法读取这个文件，输入`exit`退出，在命令行中有时候进入什么操作中不知道怎么退出，试试`Ctrl+C`和`exit`，可能会有奇效

那我们就去`vsftpd.conf`改一下，让他不要读取这个文件就好

把以下几个配置都注释掉就好，在语句前加个 `#`

```bash 500-OOPS
chroot_local_user=YES
chroot_list_enable=YES
# (default follows)
chroot_list_file=/etc/vsftpd/chroot_list

# ----变成以下的样子
#chroot_local_user=YES
#chroot_list_enable=YES
# (default follows)
#chroot_list_file=/etc/vsftpd/chroot_list
```

### Login failed

```bash
Name (192.168.253.135:python): tt # 左边显示的python是我Linux系统的一个用户，tt也是我的用户
331 Please specify the password.
Password:
500 OOPS: cannot change directory:/home/tt
Login failed.
421 Service not available, remote server has closed connection
```

![](http://hikki.test.upcdn.net/202206072038.jpeg)

表示登录失败，可能是你这个账号没有权限登录，我用python这个用户登录ftp成功了

下图表示`vsftpd.service`开启成功了

![](http://hikki.test.upcdn.net/202206071957.jpeg)







## 以下是我操作的全部过程，供参考

```bash
python@ubuntu:~$ systemctl start vsftpd.service
==== AUTHENTICATING FOR org.freedesktop.systemd1.manage-units ===
启动“vsftpd.service”需要认证。
Multiple identities can be used for authentication:
 1.  python,,, (python)
 2.  judge
Choose identity to authenticate as (1-2): 1
Password: 
==== AUTHENTICATION COMPLETE ===
python@ubuntu:~$ systemctl start vsftpd.service
==== AUTHENTICATING FOR org.freedesktop.systemd1.manage-units ===
启动“vsftpd.service”需要认证。
Multiple identities can be used for authentication:
 1.  python,,, (python)
 2.  judge
Choose identity to authenticate as (1-2): 1
Password: 
polkit-agent-helper-1: pam_authenticate failed: Authentication failure
==== AUTHENTICATION FAILED ===
Failed to start vsftpd.service: Access denied
See system logs and 'systemctl status vsftpd.service' for details.
python@ubuntu:~$ systemctl start vsftpd.service
==== AUTHENTICATING FOR org.freedesktop.systemd1.manage-units ===
启动“vsftpd.service”需要认证。
Multiple identities can be used for authentication:
 1.  python,,, (python)
 2.  judge
Choose identity to authenticate as (1-2): 
Invalid response `'.
==== AUTHENTICATION CANCELED ===
Failed to start vsftpd.service: Access denied
See system logs and 'systemctl status vsftpd.service' for details.
python@ubuntu:~$ 
python@ubuntu:~$ su
密码： 
root@ubuntu:/home/python# systemctl restart vsftpd.service
root@ubuntu:/home/python# netstat -antup | grep ftp
tcp        0      0 0.0.0.0:21              0.0.0.0:*               LISTEN      33682/vsftpd        
root@ubuntu:/home/python# cd ..
root@ubuntu:/home# cd ..
root@ubuntu:/# cd var/ftp
root@ubuntu:/var/ftp# ls
text
root@ubuntu:/var/ftp# ls -l
总用量 4
drwxr-xr-x 3 tt tt 4096 Jun  7 01:44 text
root@ubuntu:/var/ftp# chmod a+rwx xr
chmod: 无法访问'xr': 没有那个文件或目录
root@ubuntu:/var/ftp# chmod a+rwx text
root@ubuntu:/var/ftp# ls -l
总用量 4
drwxrwxrwx 3 tt tt 4096 Jun  7 01:44 text
root@ubuntu:/var/ftp# systemctl restart vsftpd.service
root@ubuntu:/var/ftp# cd ..
root@ubuntu:/var# cd ..
root@ubuntu:/# cd etc
root@ubuntu:/etc# find fftpuserrs
find: ‘fftpuserrs’: 没有那个文件或目录
root@ubuntu:/etc# find ftpuserrs
find: ‘ftpuserrs’: 没有那个文件或目录
root@ubuntu:/etc# ls
acpi                           dictionaries-common  kernel               opt                      services
adduser.conf                   docker               kernel-img.conf      os-release               shadow
alternatives                   dpkg                 kerneloops.conf      PackageKit               shadow-
anacrontab                     emacs                ldap                 pam.conf                 shells
apache2                        environment          ld.so.cache          pam.d                    skel
apg.conf                       firefox              ld.so.conf           papersize                speech-dispatcher
apm                            fonts                ld.so.conf.d         passwd                   ssh
apparmor                       fpc-3.0.4.cfg        legal                passwd-                  ssl
apparmor.d                     fpc.cfg              libao.conf           pcmcia                   subgid
apport                         fstab                libaudit.conf        perl                     subgid-
appstream.conf                 ftpusers             libblockdev          php                      subuid
apt                            fuse.conf            libnl-3              pki                      subuid-
avahi                          fwupd                libpaper.d           pm                       subversion
bash.bashrc                    gai.conf             lintianrc            pnm2ppa.conf             sudoers
bash_completion                gdb                  locale.alias         polkit-1                 sudoers.d
bash_completion.d              gdm3                 locale.gen           popularity-contest.conf  sysctl.conf
bindresvport.blacklist         geoclue              localtime            ppp                      sysctl.d
binfmt.d                       ghostscript          logcheck             printcap                 systemd
bluetooth                      glvnd                login.defs           profile                  terminfo
brlapi.key                     gnome                logrotate.conf       profile.d                thermald
brltty                         groff                logrotate.d          protocols                timezone
brltty.conf                    group                lsb-release          pulse                    tmpfiles.d
ca-certificates                group-               ltrace.conf          python                   ubuntu-advantage
ca-certificates.conf           grub.d               machine-id           python2.7                ucf.conf
ca-certificates.conf.dpkg-old  gshadow              magic                python3                  udev
calendar                       gshadow-             magic.mime           python3.6                udisks2
chatscripts                    gss                  mailcap              rc0.d                    ufw
chroot_list                    gtk-2.0              mailcap.order        rc1.d                    updatedb.conf
console-setup                  gtk-3.0              manpath.config       rc2.d                    update-manager
containerd                     hdparm.conf          mime.types           rc3.d                    update-motd.d
cracklib                       host.conf            mke2fs.conf          rc4.d                    update-notifier
cron.d                         hostname             modprobe.d           rc5.d                    UPower
cron.daily                     hosts                modules              rc6.d                    usb_modeswitch.conf
cron.hourly                    hosts.allow          modules-load.d       rc.local                 usb_modeswitch.d
cron.monthly                   hosts.deny           mono                 rcS.d                    vim
crontab                        hp                   mtab                 resolvconf               vmware-caf
cron.weekly                    ifplugd              mtools.conf          resolv.conf              vmware-tools
cups                           ImageMagick-6        mysql                rmt                      vsftpd.conf
cupshelpers                    init                 nanorc               rpc                      vtrgb
dbus-1                         init.d               netplan              rsyslog.conf             wgetrc
dconf                          initramfs-tools      network              rsyslog.d                whoopsie
debconf.conf                   inputrc              networkd-dispatcher  sane.d                   wpa_supplicant
debian_version                 insserv.conf.d       NetworkManager       securetty                X11
default                        iproute2             networks             security                 xdg
deluser.conf                   issue                newt                 selinux                  zsh_command_not_found
depmod.d                       issue.net            nginx                sensors3.conf
dhcp                           java-11-openjdk      nsswitch.conf        sensors.d
root@ubuntu:/etc# find ftpusers
ftpusers
root@ubuntu:/etc# vi ftpsers
root@ubuntu:/etc# vi ftpusers
root@ubuntu:/etc# find user_list
find: ‘user_list’: 没有那个文件或目录
root@ubuntu:/etc# service vsftpd status
● vsftpd.service - vsftpd FTP server
   Loaded: loaded (/lib/systemd/system/vsftpd.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2022-06-07 16:37:16 CST; 13min ago
  Process: 34161 ExecStartPre=/bin/mkdir -p /var/run/vsftpd/empty (code=exited, status=0/SUCCESS)
 Main PID: 34170 (vsftpd)
    Tasks: 1 (limit: 10133)
   CGroup: /system.slice/vsftpd.service
           └─34170 /usr/sbin/vsftpd /etc/vsftpd.conf

Jun 07 16:37:16 ubuntu systemd[1]: Starting vsftpd FTP server...
Jun 07 16:37:16 ubuntu systemd[1]: Started vsftpd FTP server.
root@ubuntu:/etc# service vsftpd start
root@ubuntu:/etc# service vsftpd status
● vsftpd.service - vsftpd FTP server
   Loaded: loaded (/lib/systemd/system/vsftpd.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2022-06-07 16:37:16 CST; 15min ago
  Process: 34161 ExecStartPre=/bin/mkdir -p /var/run/vsftpd/empty (code=exited, status=0/SUCCESS)
 Main PID: 34170 (vsftpd)
    Tasks: 1 (limit: 10133)
   CGroup: /system.slice/vsftpd.service
           └─34170 /usr/sbin/vsftpd /etc/vsftpd.conf

Jun 07 16:37:16 ubuntu systemd[1]: Starting vsftpd FTP server...
Jun 07 16:37:16 ubuntu systemd[1]: Started vsftpd FTP server.
root@ubuntu:/etc# netstat -an | grep 21
tcp        0      0 0.0.0.0:21              0.0.0.0:*               LISTEN     
tcp        0      0 127.0.0.1:3306          127.0.0.1:57210         ESTABLISHED
tcp        0      0 127.0.0.1:57210         127.0.0.1:3306          ESTABLISHED
unix  2      [ ]         数据报                49230    /run/user/121/systemd/notify
unix  2      [ ACC ]     流        LISTENING     49233    /run/user/121/systemd/private
unix  2      [ ACC ]     流        LISTENING     49241    /run/user/121/gnupg/S.gpg-agent.browser
unix  2      [ ACC ]     流        LISTENING     49242    /run/user/121/gnupg/S.dirmngr
unix  2      [ ACC ]     流        LISTENING     49243    /run/user/121/snapd-session-agent.socket
unix  2      [ ACC ]     流        LISTENING     49244    /run/user/121/bus
unix  2      [ ACC ]     流        LISTENING     49245    /run/user/121/pulse/native
unix  2      [ ACC ]     流        LISTENING     49246    /run/user/121/gnupg/S.gpg-agent
unix  2      [ ACC ]     流        LISTENING     49277    /run/user/121/gnupg/S.gpg-agent.ssh
unix  2      [ ACC ]     流        LISTENING     49278    /run/user/121/gnupg/S.gpg-agent.extra
unix  2      [ ACC ]     流        LISTENING     50153    /run/user/121/wayland-0
unix  2      [ ACC ]     流        LISTENING     54219    /var/run/vmware/guestServicePipe
unix  3      [ ]         流        已连接     57604    /run/user/121/bus
unix  3      [ ]         流        已连接     58286    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     54483    /run/user/121/bus
unix  3      [ ]         流        已连接     58270    /run/user/121/bus
unix  3      [ ]         流        已连接     53823    /run/user/121/bus
unix  2      [ ]         数据报                43421    
unix  3      [ ]         流        已连接     58283    /run/user/121/bus
unix  2      [ ]         数据报                133214   
unix  3      [ ]         流        已连接     54453    /run/user/121/bus
unix  3      [ ]         流        已连接     67021    /run/systemd/journal/stdout
unix  3      [ ]         流        已连接     54486    /run/user/121/bus
unix  3      [ ]         流        已连接     66321    
unix  3      [ ]         流        已连接     53825    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     54772    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     58279    /run/user/121/bus
unix  3      [ ]         流        已连接     56921    
unix  3      [ ]         流        已连接     58256    /run/user/121/bus
unix  3      [ ]         流        已连接     51673    /run/user/121/bus
unix  2      [ ]         流        已连接     63021    @/tmp/dbus-v1hSWo0w
unix  3      [ ]         流        已连接     55259    /run/user/121/bus
unix  3      [ ]         流        已连接     54539    /run/user/121/bus
unix  3      [ ]         流        已连接     49120    /run/user/121/bus
unix  3      [ ]         流        已连接     57421    
unix  3      [ ]         流        已连接     57458    /run/user/121/bus
unix  3      [ ]         流        已连接     51714    /run/user/121/bus
unix  3      [ ]         流        已连接     50204    /run/user/121/bus
unix  3      [ ]         流        已连接     57511    /run/user/121/bus
unix  3      [ ]         流        已连接     51738    /run/user/121/bus
unix  3      [ ]         流        已连接     50289    /run/user/121/bus
unix  3      [ ]         流        已连接     57532    /run/user/121/bus
unix  3      [ ]         流        已连接     49121    /run/user/121/bus
unix  3      [ ]         流        已连接     57599    /run/user/121/bus
unix  3      [ ]         流        已连接     57541    /run/user/121/bus
unix  3      [ ]         流        已连接     58277    /run/user/121/bus
unix  3      [ ]         流        已连接     56521    
unix  3      [ ]         流        已连接     66821    
unix  3      [ ]         流        已连接     57603    /run/user/121/bus
unix  3      [ ]         流        已连接     50219    /run/systemd/journal/stdout
unix  3      [ ]         流        已连接     67521    
unix  3      [ ]         流        已连接     58255    /run/user/121/bus
unix  3      [ ]         流        已连接     57377    /run/user/121/bus
unix  3      [ ]         流        已连接     58244    /run/user/121/bus
unix  2      [ ]         数据报                55210    
unix  3      [ ]         流        已连接     57544    /run/user/121/bus
root@ubuntu:/etc# find user_list
find: ‘user_list’: 没有那个文件或目录
root@ubuntu:/etc# ls
acpi                           dictionaries-common  kernel               opt                      services
adduser.conf                   docker               kernel-img.conf      os-release               shadow
alternatives                   dpkg                 kerneloops.conf      PackageKit               shadow-
anacrontab                     emacs                ldap                 pam.conf                 shells
apache2                        environment          ld.so.cache          pam.d                    skel
apg.conf                       firefox              ld.so.conf           papersize                speech-dispatcher
apm                            fonts                ld.so.conf.d         passwd                   ssh
apparmor                       fpc-3.0.4.cfg        legal                passwd-                  ssl
apparmor.d                     fpc.cfg              libao.conf           pcmcia                   subgid
apport                         fstab                libaudit.conf        perl                     subgid-
appstream.conf                 ftpusers             libblockdev          php                      subuid
apt                            fuse.conf            libnl-3              pki                      subuid-
avahi                          fwupd                libpaper.d           pm                       subversion
bash.bashrc                    gai.conf             lintianrc            pnm2ppa.conf             sudoers
bash_completion                gdb                  locale.alias         polkit-1                 sudoers.d
bash_completion.d              gdm3                 locale.gen           popularity-contest.conf  sysctl.conf
bindresvport.blacklist         geoclue              localtime            ppp                      sysctl.d
binfmt.d                       ghostscript          logcheck             printcap                 systemd
bluetooth                      glvnd                login.defs           profile                  terminfo
brlapi.key                     gnome                logrotate.conf       profile.d                thermald
brltty                         groff                logrotate.d          protocols                timezone
brltty.conf                    group                lsb-release          pulse                    tmpfiles.d
ca-certificates                group-               ltrace.conf          python                   ubuntu-advantage
ca-certificates.conf           grub.d               machine-id           python2.7                ucf.conf
ca-certificates.conf.dpkg-old  gshadow              magic                python3                  udev
calendar                       gshadow-             magic.mime           python3.6                udisks2
chatscripts                    gss                  mailcap              rc0.d                    ufw
chroot_list                    gtk-2.0              mailcap.order        rc1.d                    updatedb.conf
console-setup                  gtk-3.0              manpath.config       rc2.d                    update-manager
containerd                     hdparm.conf          mime.types           rc3.d                    update-motd.d
cracklib                       host.conf            mke2fs.conf          rc4.d                    update-notifier
cron.d                         hostname             modprobe.d           rc5.d                    UPower
cron.daily                     hosts                modules              rc6.d                    usb_modeswitch.conf
cron.hourly                    hosts.allow          modules-load.d       rc.local                 usb_modeswitch.d
cron.monthly                   hosts.deny           mono                 rcS.d                    vim
crontab                        hp                   mtab                 resolvconf               vmware-caf
cron.weekly                    ifplugd              mtools.conf          resolv.conf              vmware-tools
cups                           ImageMagick-6        mysql                rmt                      vsftpd.conf
cupshelpers                    init                 nanorc               rpc                      vtrgb
dbus-1                         init.d               netplan              rsyslog.conf             wgetrc
dconf                          initramfs-tools      network              rsyslog.d                whoopsie
debconf.conf                   inputrc              networkd-dispatcher  sane.d                   wpa_supplicant
debian_version                 insserv.conf.d       NetworkManager       securetty                X11
default                        iproute2             networks             security                 xdg
deluser.conf                   issue                newt                 selinux                  zsh_command_not_found
depmod.d                       issue.net            nginx                sensors3.conf
dhcp                           java-11-openjdk      nsswitch.conf        sensors.d
root@ubuntu:/etc# ftp 192.168.2.20
ftp: connect: Connection timed out
ftp> vi vsftpd.conf
?Invalid command
ftp> exit
root@ubuntu:/etc# vi vsftpd.conf
root@ubuntu:/etc# service vsftpd status
● vsftpd.service - vsftpd FTP server
   Loaded: loaded (/lib/systemd/system/vsftpd.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2022-06-07 16:37:16 CST; 35min ago
  Process: 34161 ExecStartPre=/bin/mkdir -p /var/run/vsftpd/empty (code=exited, status=0/SUCCESS)
 Main PID: 34170 (vsftpd)
    Tasks: 1 (limit: 10133)
   CGroup: /system.slice/vsftpd.service
           └─34170 /usr/sbin/vsftpd /etc/vsftpd.conf

Jun 07 16:37:16 ubuntu systemd[1]: Starting vsftpd FTP server...
Jun 07 16:37:16 ubuntu systemd[1]: Started vsftpd FTP server.
root@ubuntu:/etc# service vsftpd start
root@ubuntu:/etc# vi vsftpd.conf
root@ubuntu:/etc# service vsftpd restart
root@ubuntu:/etc# netstat -an | grep 21
tcp        0      0 127.0.0.1:3306          127.0.0.1:57210         ESTABLISHED
tcp        0      0 127.0.0.1:57210         127.0.0.1:3306          ESTABLISHED
unix  2      [ ]         数据报                49230    /run/user/121/systemd/notify
unix  2      [ ACC ]     流        LISTENING     49233    /run/user/121/systemd/private
unix  2      [ ACC ]     流        LISTENING     49241    /run/user/121/gnupg/S.gpg-agent.browser
unix  2      [ ACC ]     流        LISTENING     49242    /run/user/121/gnupg/S.dirmngr
unix  2      [ ACC ]     流        LISTENING     49243    /run/user/121/snapd-session-agent.socket
unix  2      [ ACC ]     流        LISTENING     49244    /run/user/121/bus
unix  2      [ ACC ]     流        LISTENING     49245    /run/user/121/pulse/native
unix  2      [ ACC ]     流        LISTENING     49246    /run/user/121/gnupg/S.gpg-agent
unix  2      [ ACC ]     流        LISTENING     49277    /run/user/121/gnupg/S.gpg-agent.ssh
unix  2      [ ACC ]     流        LISTENING     49278    /run/user/121/gnupg/S.gpg-agent.extra
unix  2      [ ACC ]     流        LISTENING     50153    /run/user/121/wayland-0
unix  2      [ ACC ]     流        LISTENING     54219    /var/run/vmware/guestServicePipe
unix  3      [ ]         流        已连接     57604    /run/user/121/bus
unix  3      [ ]         流        已连接     58286    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     54483    /run/user/121/bus
unix  3      [ ]         流        已连接     58270    /run/user/121/bus
unix  3      [ ]         流        已连接     53823    /run/user/121/bus
unix  2      [ ]         数据报                43421    
unix  3      [ ]         流        已连接     58283    /run/user/121/bus
unix  2      [ ]         数据报                133214   
unix  3      [ ]         流        已连接     54453    /run/user/121/bus
unix  3      [ ]         流        已连接     67021    /run/systemd/journal/stdout
unix  3      [ ]         流        已连接     54486    /run/user/121/bus
unix  3      [ ]         流        已连接     66321    
unix  3      [ ]         流        已连接     53825    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     54772    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     58279    /run/user/121/bus
unix  3      [ ]         流        已连接     56921    
unix  3      [ ]         流        已连接     58256    /run/user/121/bus
unix  3      [ ]         流        已连接     51673    /run/user/121/bus
unix  2      [ ]         流        已连接     63021    @/tmp/dbus-v1hSWo0w
unix  3      [ ]         流        已连接     55259    /run/user/121/bus
unix  3      [ ]         流        已连接     54539    /run/user/121/bus
unix  3      [ ]         流        已连接     49120    /run/user/121/bus
unix  3      [ ]         流        已连接     57421    
unix  3      [ ]         流        已连接     57458    /run/user/121/bus
unix  3      [ ]         流        已连接     51714    /run/user/121/bus
unix  3      [ ]         流        已连接     50204    /run/user/121/bus
unix  3      [ ]         流        已连接     57511    /run/user/121/bus
unix  3      [ ]         流        已连接     51738    /run/user/121/bus
unix  3      [ ]         流        已连接     50289    /run/user/121/bus
unix  3      [ ]         流        已连接     57532    /run/user/121/bus
unix  3      [ ]         流        已连接     49121    /run/user/121/bus
unix  3      [ ]         流        已连接     57599    /run/user/121/bus
unix  3      [ ]         流        已连接     57541    /run/user/121/bus
unix  3      [ ]         流        已连接     58277    /run/user/121/bus
unix  3      [ ]         流        已连接     56521    
unix  3      [ ]         流        已连接     66821    
unix  3      [ ]         流        已连接     57603    /run/user/121/bus
unix  3      [ ]         流        已连接     50219    /run/systemd/journal/stdout
unix  3      [ ]         流        已连接     67521    
unix  3      [ ]         流        已连接     58255    /run/user/121/bus
unix  3      [ ]         流        已连接     57377    /run/user/121/bus
unix  3      [ ]         流        已连接     58244    /run/user/121/bus
unix  2      [ ]         数据报                55210    
unix  3      [ ]         流        已连接     57544    /run/user/121/bus
root@ubuntu:/etc# service vsftpd start
root@ubuntu:/etc# netstat -an | grep 21
tcp        0      0 127.0.0.1:3306          127.0.0.1:57210         ESTABLISHED
tcp        0      0 127.0.0.1:57210         127.0.0.1:3306          ESTABLISHED
unix  2      [ ]         数据报                49230    /run/user/121/systemd/notify
unix  2      [ ACC ]     流        LISTENING     49233    /run/user/121/systemd/private
unix  2      [ ACC ]     流        LISTENING     49241    /run/user/121/gnupg/S.gpg-agent.browser
unix  2      [ ACC ]     流        LISTENING     49242    /run/user/121/gnupg/S.dirmngr
unix  2      [ ACC ]     流        LISTENING     49243    /run/user/121/snapd-session-agent.socket
unix  2      [ ACC ]     流        LISTENING     49244    /run/user/121/bus
unix  2      [ ACC ]     流        LISTENING     49245    /run/user/121/pulse/native
unix  2      [ ACC ]     流        LISTENING     49246    /run/user/121/gnupg/S.gpg-agent
unix  2      [ ACC ]     流        LISTENING     49277    /run/user/121/gnupg/S.gpg-agent.ssh
unix  2      [ ACC ]     流        LISTENING     49278    /run/user/121/gnupg/S.gpg-agent.extra
unix  2      [ ACC ]     流        LISTENING     50153    /run/user/121/wayland-0
unix  2      [ ACC ]     流        LISTENING     54219    /var/run/vmware/guestServicePipe
unix  3      [ ]         流        已连接     57604    /run/user/121/bus
unix  3      [ ]         流        已连接     58286    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     54483    /run/user/121/bus
unix  3      [ ]         流        已连接     58270    /run/user/121/bus
unix  3      [ ]         流        已连接     53823    /run/user/121/bus
unix  2      [ ]         数据报                43421    
unix  3      [ ]         流        已连接     58283    /run/user/121/bus
unix  2      [ ]         数据报                133214   
unix  3      [ ]         流        已连接     54453    /run/user/121/bus
unix  3      [ ]         流        已连接     67021    /run/systemd/journal/stdout
unix  3      [ ]         流        已连接     54486    /run/user/121/bus
unix  3      [ ]         流        已连接     66321    
unix  3      [ ]         流        已连接     53825    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     54772    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     58279    /run/user/121/bus
unix  3      [ ]         流        已连接     56921    
unix  3      [ ]         流        已连接     58256    /run/user/121/bus
unix  3      [ ]         流        已连接     51673    /run/user/121/bus
unix  2      [ ]         流        已连接     63021    @/tmp/dbus-v1hSWo0w
unix  3      [ ]         流        已连接     55259    /run/user/121/bus
unix  3      [ ]         流        已连接     54539    /run/user/121/bus
unix  3      [ ]         流        已连接     49120    /run/user/121/bus
unix  3      [ ]         流        已连接     57421    
unix  3      [ ]         流        已连接     57458    /run/user/121/bus
unix  3      [ ]         流        已连接     51714    /run/user/121/bus
unix  3      [ ]         流        已连接     50204    /run/user/121/bus
unix  3      [ ]         流        已连接     57511    /run/user/121/bus
unix  3      [ ]         流        已连接     51738    /run/user/121/bus
unix  3      [ ]         流        已连接     50289    /run/user/121/bus
unix  3      [ ]         流        已连接     57532    /run/user/121/bus
unix  3      [ ]         流        已连接     49121    /run/user/121/bus
unix  3      [ ]         流        已连接     57599    /run/user/121/bus
unix  3      [ ]         流        已连接     57541    /run/user/121/bus
unix  3      [ ]         流        已连接     58277    /run/user/121/bus
unix  3      [ ]         流        已连接     56521    
unix  3      [ ]         流        已连接     66821    
unix  3      [ ]         流        已连接     57603    /run/user/121/bus
unix  3      [ ]         流        已连接     50219    /run/systemd/journal/stdout
unix  3      [ ]         流        已连接     67521    
unix  3      [ ]         流        已连接     58255    /run/user/121/bus
unix  3      [ ]         流        已连接     57377    /run/user/121/bus
unix  3      [ ]         流        已连接     58244    /run/user/121/bus
unix  2      [ ]         数据报                55210    
unix  3      [ ]         流        已连接     57544    /run/user/121/bus
root@ubuntu:/etc# service vsftpd status
● vsftpd.service - vsftpd FTP server
   Loaded: loaded (/lib/systemd/system/vsftpd.service; enabled; vendor preset: enabled)
   Active: failed (Result: exit-code) since Tue 2022-06-07 17:16:24 CST; 16s ago
  Process: 37950 ExecStart=/usr/sbin/vsftpd /etc/vsftpd.conf (code=exited, status=2)
  Process: 37949 ExecStartPre=/bin/mkdir -p /var/run/vsftpd/empty (code=exited, status=0/SUCCESS)
 Main PID: 37950 (code=exited, status=2)

Jun 07 17:16:24 ubuntu systemd[1]: Starting vsftpd FTP server...
Jun 07 17:16:24 ubuntu systemd[1]: Started vsftpd FTP server.
Jun 07 17:16:24 ubuntu systemd[1]: vsftpd.service: Main process exited, code=exited, status=2/INVALIDARGUMENT
Jun 07 17:16:24 ubuntu systemd[1]: vsftpd.service: Failed with result 'exit-code'.
root@ubuntu:/etc# ifconfig
br-e0785d9e2e0e: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.18.0.1  netmask 255.255.0.0  broadcast 172.18.255.255
        inet6 fe80::42:58ff:feac:5f60  prefixlen 64  scopeid 0x20<link>
        ether 02:42:58:ac:5f:60  txqueuelen 0  (以太网)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 89  bytes 10611 (10.6 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

docker0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:1f:6c:fe:81  txqueuelen 0  (以太网)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

ens33: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.253.135  netmask 255.255.255.0  broadcast 192.168.253.255
        inet6 fe80::9089:a9a8:9f2c:eb95  prefixlen 64  scopeid 0x20<link>
        ether 00:0c:29:45:42:ca  txqueuelen 1000  (以太网)
        RX packets 25679  bytes 25805113 (25.8 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 11926  bytes 1086668 (1.0 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (本地环回)
        RX packets 28566  bytes 2883722 (2.8 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 28566  bytes 2883722 (2.8 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth013a284: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::2045:46ff:fe63:c862  prefixlen 64  scopeid 0x20<link>
        ether 22:45:46:63:c8:62  txqueuelen 0  (以太网)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 130  bytes 15897 (15.8 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

veth39dc7e2: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::d8a9:c7ff:fe66:5130  prefixlen 64  scopeid 0x20<link>
        ether da:a9:c7:66:51:30  txqueuelen 0  (以太网)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 131  bytes 16044 (16.0 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

vethc95dea9: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet6 fe80::ec62:cbff:fe55:a060  prefixlen 64  scopeid 0x20<link>
        ether ee:62:cb:55:a0:60  txqueuelen 0  (以太网)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 125  bytes 15129 (15.1 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

root@ubuntu:/etc# vi vsftpd.conf
root@ubuntu:/etc# service vsftpd status
● vsftpd.service - vsftpd FTP server
   Loaded: loaded (/lib/systemd/system/vsftpd.service; enabled; vendor preset: enabled)
   Active: failed (Result: exit-code) since Tue 2022-06-07 17:16:24 CST; 5min ago
  Process: 37950 ExecStart=/usr/sbin/vsftpd /etc/vsftpd.conf (code=exited, status=2)
  Process: 37949 ExecStartPre=/bin/mkdir -p /var/run/vsftpd/empty (code=exited, status=0/SUCCESS)
 Main PID: 37950 (code=exited, status=2)

Jun 07 17:16:24 ubuntu systemd[1]: Starting vsftpd FTP server...
Jun 07 17:16:24 ubuntu systemd[1]: Started vsftpd FTP server.
Jun 07 17:16:24 ubuntu systemd[1]: vsftpd.service: Main process exited, code=exited, status=2/INVALIDARGUMENT
Jun 07 17:16:24 ubuntu systemd[1]: vsftpd.service: Failed with result 'exit-code'.
root@ubuntu:/etc# service vsftpd start
root@ubuntu:/etc# service vsftpd status
● vsftpd.service - vsftpd FTP server
   Loaded: loaded (/lib/systemd/system/vsftpd.service; enabled; vendor preset: enabled)
   Active: failed (Result: exit-code) since Tue 2022-06-07 17:22:12 CST; 2s ago
  Process: 38535 ExecStart=/usr/sbin/vsftpd /etc/vsftpd.conf (code=exited, status=2)
  Process: 38524 ExecStartPre=/bin/mkdir -p /var/run/vsftpd/empty (code=exited, status=0/SUCCESS)
 Main PID: 38535 (code=exited, status=2)

Jun 07 17:22:12 ubuntu systemd[1]: Starting vsftpd FTP server...
Jun 07 17:22:12 ubuntu systemd[1]: Started vsftpd FTP server.
Jun 07 17:22:12 ubuntu systemd[1]: vsftpd.service: Main process exited, code=exited, status=2/INVALIDARGUMENT
Jun 07 17:22:12 ubuntu systemd[1]: vsftpd.service: Failed with result 'exit-code'.
root@ubuntu:/etc# vi vsftpd.conf
root@ubuntu:/etc# service vsftpd start
root@ubuntu:/etc# service vsftpd status
● vsftpd.service - vsftpd FTP server
   Loaded: loaded (/lib/systemd/system/vsftpd.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2022-06-07 17:22:46 CST; 3s ago
  Process: 38621 ExecStartPre=/bin/mkdir -p /var/run/vsftpd/empty (code=exited, status=0/SUCCESS)
 Main PID: 38622 (vsftpd)
    Tasks: 1 (limit: 10133)
   CGroup: /system.slice/vsftpd.service
           └─38622 /usr/sbin/vsftpd /etc/vsftpd.conf

Jun 07 17:22:46 ubuntu systemd[1]: Starting vsftpd FTP server...
Jun 07 17:22:46 ubuntu systemd[1]: Started vsftpd FTP server.
root@ubuntu:/etc# ftp 192.168.253.130
ftp: connect: No route to host
ftp> exit
root@ubuntu:/etc# ftp 192.168.253.135
Connected to 192.168.253.135.
500 OOPS: cannot read user list file:/etc/vsftpd/allowed_users
ftp> eexit
?Invalid command
ftp> exit
root@ubuntu:/etc# vi vsftpd.conf
root@ubuntu:/etc# ftp 192.168.253.135
Connected to 192.168.253.135.
500 OOPS: cannot read user list file:/etc/vsftpd/allowed_users
ftp> exit
root@ubuntu:/etc# service vsftpd start
root@ubuntu:/etc# service vsftpd restart
root@ubuntu:/etc# ftp 192.168.253.135
Connected to 192.168.253.135.
500 OOPS: cannot read user list file:/etc/vsftpd.user_list
ftp> exit
root@ubuntu:/etc# vi vsftpd.conf
root@ubuntu:/etc# service vsftpd restart
root@ubuntu:/etc# ftp 192.168.253.135
Connected to 192.168.253.135.
500 OOPS: cannot read user list file:/etc/vsftpd.user_list
ftp> exit
root@ubuntu:/etc# vi vsftpd.conf
root@ubuntu:/etc# service vsftpd restart
root@ubuntu:/etc# ftp 192.168.253.135
ftp: connect: Connection refused
ftp> exit
root@ubuntu:/etc# service vsftpd restart
root@ubuntu:/etc# netstat -an | grep 21
tcp        0      0 127.0.0.1:3306          127.0.0.1:57210         ESTABLISHED
tcp        0      0 127.0.0.1:57210         127.0.0.1:3306          ESTABLISHED
unix  2      [ ]         数据报                49230    /run/user/121/systemd/notify
unix  2      [ ACC ]     流        LISTENING     49233    /run/user/121/systemd/private
unix  2      [ ACC ]     流        LISTENING     49241    /run/user/121/gnupg/S.gpg-agent.browser
unix  2      [ ACC ]     流        LISTENING     49242    /run/user/121/gnupg/S.dirmngr
unix  2      [ ACC ]     流        LISTENING     49243    /run/user/121/snapd-session-agent.socket
unix  2      [ ACC ]     流        LISTENING     49244    /run/user/121/bus
unix  2      [ ACC ]     流        LISTENING     49245    /run/user/121/pulse/native
unix  2      [ ACC ]     流        LISTENING     49246    /run/user/121/gnupg/S.gpg-agent
unix  2      [ ACC ]     流        LISTENING     49277    /run/user/121/gnupg/S.gpg-agent.ssh
unix  2      [ ACC ]     流        LISTENING     49278    /run/user/121/gnupg/S.gpg-agent.extra
unix  2      [ ACC ]     流        LISTENING     50153    /run/user/121/wayland-0
unix  2      [ ACC ]     流        LISTENING     54219    /var/run/vmware/guestServicePipe
unix  3      [ ]         流        已连接     57604    /run/user/121/bus
unix  3      [ ]         流        已连接     58286    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     54483    /run/user/121/bus
unix  3      [ ]         流        已连接     58270    /run/user/121/bus
unix  3      [ ]         流        已连接     53823    /run/user/121/bus
unix  2      [ ]         数据报                43421    
unix  3      [ ]         流        已连接     58283    /run/user/121/bus
unix  2      [ ]         数据报                133214   
unix  3      [ ]         流        已连接     54453    /run/user/121/bus
unix  3      [ ]         流        已连接     67021    /run/systemd/journal/stdout
unix  3      [ ]         流        已连接     54486    /run/user/121/bus
unix  3      [ ]         流        已连接     66321    
unix  3      [ ]         流        已连接     53825    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     54772    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     58279    /run/user/121/bus
unix  3      [ ]         流        已连接     56921    
unix  3      [ ]         流        已连接     58256    /run/user/121/bus
unix  3      [ ]         流        已连接     51673    /run/user/121/bus
unix  2      [ ]         流        已连接     63021    @/tmp/dbus-v1hSWo0w
unix  3      [ ]         流        已连接     55259    /run/user/121/bus
unix  3      [ ]         流        已连接     54539    /run/user/121/bus
unix  3      [ ]         流        已连接     49120    /run/user/121/bus
unix  3      [ ]         流        已连接     57421    
unix  3      [ ]         流        已连接     57458    /run/user/121/bus
unix  3      [ ]         流        已连接     51714    /run/user/121/bus
unix  3      [ ]         流        已连接     50204    /run/user/121/bus
unix  3      [ ]         流        已连接     57511    /run/user/121/bus
unix  3      [ ]         流        已连接     51738    /run/user/121/bus
unix  3      [ ]         流        已连接     50289    /run/user/121/bus
unix  3      [ ]         流        已连接     57532    /run/user/121/bus
unix  3      [ ]         流        已连接     49121    /run/user/121/bus
unix  3      [ ]         流        已连接     57599    /run/user/121/bus
unix  3      [ ]         流        已连接     57541    /run/user/121/bus
unix  3      [ ]         流        已连接     58277    /run/user/121/bus
unix  3      [ ]         流        已连接     56521    
unix  3      [ ]         流        已连接     66821    
unix  3      [ ]         流        已连接     57603    /run/user/121/bus
unix  3      [ ]         流        已连接     50219    /run/systemd/journal/stdout
unix  3      [ ]         流        已连接     67521    
unix  3      [ ]         流        已连接     58255    /run/user/121/bus
unix  3      [ ]         流        已连接     57377    /run/user/121/bus
unix  3      [ ]         流        已连接     58244    /run/user/121/bus
unix  2      [ ]         数据报                55210    
unix  3      [ ]         流        已连接     57544    /run/user/121/bus
root@ubuntu:/etc# service vsftpd start
root@ubuntu:/etc# netstat -an | grep 21
tcp        0      0 127.0.0.1:3306          127.0.0.1:57210         ESTABLISHED
tcp        0      0 127.0.0.1:57210         127.0.0.1:3306          ESTABLISHED
unix  2      [ ]         数据报                49230    /run/user/121/systemd/notify
unix  2      [ ACC ]     流        LISTENING     49233    /run/user/121/systemd/private
unix  2      [ ACC ]     流        LISTENING     49241    /run/user/121/gnupg/S.gpg-agent.browser
unix  2      [ ACC ]     流        LISTENING     49242    /run/user/121/gnupg/S.dirmngr
unix  2      [ ACC ]     流        LISTENING     49243    /run/user/121/snapd-session-agent.socket
unix  2      [ ACC ]     流        LISTENING     49244    /run/user/121/bus
unix  2      [ ACC ]     流        LISTENING     49245    /run/user/121/pulse/native
unix  2      [ ACC ]     流        LISTENING     49246    /run/user/121/gnupg/S.gpg-agent
unix  2      [ ACC ]     流        LISTENING     49277    /run/user/121/gnupg/S.gpg-agent.ssh
unix  2      [ ACC ]     流        LISTENING     49278    /run/user/121/gnupg/S.gpg-agent.extra
unix  2      [ ACC ]     流        LISTENING     50153    /run/user/121/wayland-0
unix  2      [ ACC ]     流        LISTENING     54219    /var/run/vmware/guestServicePipe
unix  3      [ ]         流        已连接     57604    /run/user/121/bus
unix  3      [ ]         流        已连接     58286    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     54483    /run/user/121/bus
unix  3      [ ]         流        已连接     58270    /run/user/121/bus
unix  3      [ ]         流        已连接     53823    /run/user/121/bus
unix  2      [ ]         数据报                43421    
unix  3      [ ]         流        已连接     58283    /run/user/121/bus
unix  2      [ ]         数据报                133214   
unix  3      [ ]         流        已连接     54453    /run/user/121/bus
unix  3      [ ]         流        已连接     67021    /run/systemd/journal/stdout
unix  3      [ ]         流        已连接     54486    /run/user/121/bus
unix  3      [ ]         流        已连接     66321    
unix  3      [ ]         流        已连接     53825    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     54772    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     58279    /run/user/121/bus
unix  3      [ ]         流        已连接     56921    
unix  3      [ ]         流        已连接     58256    /run/user/121/bus
unix  3      [ ]         流        已连接     51673    /run/user/121/bus
unix  2      [ ]         流        已连接     63021    @/tmp/dbus-v1hSWo0w
unix  3      [ ]         流        已连接     55259    /run/user/121/bus
unix  3      [ ]         流        已连接     54539    /run/user/121/bus
unix  3      [ ]         流        已连接     49120    /run/user/121/bus
unix  3      [ ]         流        已连接     57421    
unix  3      [ ]         流        已连接     57458    /run/user/121/bus
unix  3      [ ]         流        已连接     51714    /run/user/121/bus
unix  3      [ ]         流        已连接     50204    /run/user/121/bus
unix  3      [ ]         流        已连接     57511    /run/user/121/bus
unix  3      [ ]         流        已连接     51738    /run/user/121/bus
unix  3      [ ]         流        已连接     50289    /run/user/121/bus
unix  3      [ ]         流        已连接     57532    /run/user/121/bus
unix  3      [ ]         流        已连接     49121    /run/user/121/bus
unix  3      [ ]         流        已连接     57599    /run/user/121/bus
unix  3      [ ]         流        已连接     57541    /run/user/121/bus
unix  3      [ ]         流        已连接     58277    /run/user/121/bus
unix  3      [ ]         流        已连接     56521    
unix  3      [ ]         流        已连接     66821    
unix  3      [ ]         流        已连接     57603    /run/user/121/bus
unix  3      [ ]         流        已连接     50219    /run/systemd/journal/stdout
unix  3      [ ]         流        已连接     67521    
unix  3      [ ]         流        已连接     58255    /run/user/121/bus
unix  3      [ ]         流        已连接     57377    /run/user/121/bus
unix  3      [ ]         流        已连接     58244    /run/user/121/bus
unix  2      [ ]         数据报                55210    
unix  3      [ ]         流        已连接     57544    /run/user/121/bus
root@ubuntu:/etc# service vsftpd start
root@ubuntu:/etc# netstat -an | grep 21
tcp        0      0 127.0.0.1:3306          127.0.0.1:57210         ESTABLISHED
tcp        0      0 127.0.0.1:57210         127.0.0.1:3306          ESTABLISHED
unix  2      [ ]         数据报                49230    /run/user/121/systemd/notify
unix  2      [ ACC ]     流        LISTENING     49233    /run/user/121/systemd/private
unix  2      [ ACC ]     流        LISTENING     49241    /run/user/121/gnupg/S.gpg-agent.browser
unix  2      [ ACC ]     流        LISTENING     49242    /run/user/121/gnupg/S.dirmngr
unix  2      [ ACC ]     流        LISTENING     49243    /run/user/121/snapd-session-agent.socket
unix  2      [ ACC ]     流        LISTENING     49244    /run/user/121/bus
unix  2      [ ACC ]     流        LISTENING     49245    /run/user/121/pulse/native
unix  2      [ ACC ]     流        LISTENING     49246    /run/user/121/gnupg/S.gpg-agent
unix  2      [ ACC ]     流        LISTENING     49277    /run/user/121/gnupg/S.gpg-agent.ssh
unix  2      [ ACC ]     流        LISTENING     49278    /run/user/121/gnupg/S.gpg-agent.extra
unix  2      [ ACC ]     流        LISTENING     50153    /run/user/121/wayland-0
unix  2      [ ACC ]     流        LISTENING     54219    /var/run/vmware/guestServicePipe
unix  3      [ ]         流        已连接     57604    /run/user/121/bus
unix  3      [ ]         流        已连接     58286    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     54483    /run/user/121/bus
unix  3      [ ]         流        已连接     58270    /run/user/121/bus
unix  3      [ ]         流        已连接     53823    /run/user/121/bus
unix  2      [ ]         数据报                43421    
unix  3      [ ]         流        已连接     58283    /run/user/121/bus
unix  2      [ ]         数据报                133214   
unix  3      [ ]         流        已连接     54453    /run/user/121/bus
unix  3      [ ]         流        已连接     67021    /run/systemd/journal/stdout
unix  3      [ ]         流        已连接     54486    /run/user/121/bus
unix  3      [ ]         流        已连接     66321    
unix  3      [ ]         流        已连接     53825    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     54772    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     58279    /run/user/121/bus
unix  3      [ ]         流        已连接     56921    
unix  3      [ ]         流        已连接     58256    /run/user/121/bus
unix  3      [ ]         流        已连接     51673    /run/user/121/bus
unix  2      [ ]         流        已连接     63021    @/tmp/dbus-v1hSWo0w
unix  3      [ ]         流        已连接     55259    /run/user/121/bus
unix  3      [ ]         流        已连接     54539    /run/user/121/bus
unix  3      [ ]         流        已连接     49120    /run/user/121/bus
unix  3      [ ]         流        已连接     57421    
unix  3      [ ]         流        已连接     57458    /run/user/121/bus
unix  3      [ ]         流        已连接     51714    /run/user/121/bus
unix  3      [ ]         流        已连接     50204    /run/user/121/bus
unix  3      [ ]         流        已连接     57511    /run/user/121/bus
unix  3      [ ]         流        已连接     51738    /run/user/121/bus
unix  3      [ ]         流        已连接     50289    /run/user/121/bus
unix  3      [ ]         流        已连接     57532    /run/user/121/bus
unix  3      [ ]         流        已连接     49121    /run/user/121/bus
unix  3      [ ]         流        已连接     57599    /run/user/121/bus
unix  3      [ ]         流        已连接     57541    /run/user/121/bus
unix  3      [ ]         流        已连接     58277    /run/user/121/bus
unix  3      [ ]         流        已连接     56521    
unix  3      [ ]         流        已连接     66821    
unix  3      [ ]         流        已连接     57603    /run/user/121/bus
unix  3      [ ]         流        已连接     50219    /run/systemd/journal/stdout
unix  3      [ ]         流        已连接     67521    
unix  3      [ ]         流        已连接     58255    /run/user/121/bus
unix  3      [ ]         流        已连接     57377    /run/user/121/bus
unix  3      [ ]         流        已连接     58244    /run/user/121/bus
unix  2      [ ]         数据报                55210    
unix  3      [ ]         流        已连接     57544    /run/user/121/bus
root@ubuntu:/etc# service vsftpd status
● vsftpd.service - vsftpd FTP server
   Loaded: loaded (/lib/systemd/system/vsftpd.service; enabled; vendor preset: enabled)
   Active: failed (Result: exit-code) since Tue 2022-06-07 17:31:34 CST; 43s ago
  Process: 39695 ExecStart=/usr/sbin/vsftpd /etc/vsftpd.conf (code=exited, status=2)
  Process: 39683 ExecStartPre=/bin/mkdir -p /var/run/vsftpd/empty (code=exited, status=0/SUCCESS)
 Main PID: 39695 (code=exited, status=2)

Jun 07 17:31:34 ubuntu systemd[1]: Starting vsftpd FTP server...
Jun 07 17:31:34 ubuntu systemd[1]: Started vsftpd FTP server.
Jun 07 17:31:34 ubuntu systemd[1]: vsftpd.service: Main process exited, code=exited, status=2/INVALIDARGUMENT
Jun 07 17:31:34 ubuntu systemd[1]: vsftpd.service: Failed with result 'exit-code'.
root@ubuntu:/etc# vi vsftpd.conf
root@ubuntu:/etc# service vsftpd start
root@ubuntu:/etc# service vsftpd status
● vsftpd.service - vsftpd FTP server
   Loaded: loaded (/lib/systemd/system/vsftpd.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2022-06-07 17:32:53 CST; 2s ago
  Process: 39843 ExecStartPre=/bin/mkdir -p /var/run/vsftpd/empty (code=exited, status=0/SUCCESS)
 Main PID: 39844 (vsftpd)
    Tasks: 1 (limit: 10133)
   CGroup: /system.slice/vsftpd.service
           └─39844 /usr/sbin/vsftpd /etc/vsftpd.conf

Jun 07 17:32:53 ubuntu systemd[1]: Starting vsftpd FTP server...
Jun 07 17:32:53 ubuntu systemd[1]: Started vsftpd FTP server.
root@ubuntu:/etc# netstat -an | grep 21
tcp        0      0 0.0.0.0:21              0.0.0.0:*               LISTEN     
tcp        0      0 127.0.0.1:3306          127.0.0.1:57210         ESTABLISHED
tcp        0      0 127.0.0.1:57210         127.0.0.1:3306          ESTABLISHED
unix  2      [ ]         数据报                49230    /run/user/121/systemd/notify
unix  2      [ ACC ]     流        LISTENING     49233    /run/user/121/systemd/private
unix  2      [ ACC ]     流        LISTENING     49241    /run/user/121/gnupg/S.gpg-agent.browser
unix  2      [ ACC ]     流        LISTENING     49242    /run/user/121/gnupg/S.dirmngr
unix  2      [ ACC ]     流        LISTENING     49243    /run/user/121/snapd-session-agent.socket
unix  2      [ ACC ]     流        LISTENING     49244    /run/user/121/bus
unix  2      [ ACC ]     流        LISTENING     49245    /run/user/121/pulse/native
unix  2      [ ACC ]     流        LISTENING     49246    /run/user/121/gnupg/S.gpg-agent
unix  2      [ ACC ]     流        LISTENING     49277    /run/user/121/gnupg/S.gpg-agent.ssh
unix  2      [ ACC ]     流        LISTENING     49278    /run/user/121/gnupg/S.gpg-agent.extra
unix  2      [ ACC ]     流        LISTENING     50153    /run/user/121/wayland-0
unix  2      [ ACC ]     流        LISTENING     54219    /var/run/vmware/guestServicePipe
unix  3      [ ]         流        已连接     57604    /run/user/121/bus
unix  3      [ ]         流        已连接     58286    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     54483    /run/user/121/bus
unix  3      [ ]         流        已连接     58270    /run/user/121/bus
unix  3      [ ]         流        已连接     53823    /run/user/121/bus
unix  2      [ ]         数据报                43421    
unix  3      [ ]         流        已连接     58283    /run/user/121/bus
unix  2      [ ]         数据报                133214   
unix  3      [ ]         流        已连接     54453    /run/user/121/bus
unix  3      [ ]         流        已连接     67021    /run/systemd/journal/stdout
unix  3      [ ]         流        已连接     54486    /run/user/121/bus
unix  3      [ ]         流        已连接     66321    
unix  3      [ ]         流        已连接     53825    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     54772    /run/user/121/pulse/native
unix  3      [ ]         流        已连接     58279    /run/user/121/bus
unix  3      [ ]         流        已连接     56921    
unix  3      [ ]         流        已连接     58256    /run/user/121/bus
unix  3      [ ]         流        已连接     51673    /run/user/121/bus
unix  2      [ ]         流        已连接     63021    @/tmp/dbus-v1hSWo0w
unix  3      [ ]         流        已连接     55259    /run/user/121/bus
unix  3      [ ]         流        已连接     54539    /run/user/121/bus
unix  3      [ ]         流        已连接     49120    /run/user/121/bus
unix  3      [ ]         流        已连接     57421    
unix  3      [ ]         流        已连接     57458    /run/user/121/bus
unix  3      [ ]         流        已连接     51714    /run/user/121/bus
unix  3      [ ]         流        已连接     50204    /run/user/121/bus
unix  3      [ ]         流        已连接     57511    /run/user/121/bus
unix  3      [ ]         流        已连接     51738    /run/user/121/bus
unix  3      [ ]         流        已连接     50289    /run/user/121/bus
unix  3      [ ]         流        已连接     57532    /run/user/121/bus
unix  3      [ ]         流        已连接     49121    /run/user/121/bus
unix  3      [ ]         流        已连接     57599    /run/user/121/bus
unix  3      [ ]         流        已连接     57541    /run/user/121/bus
unix  3      [ ]         流        已连接     58277    /run/user/121/bus
unix  3      [ ]         流        已连接     56521    
unix  3      [ ]         流        已连接     66821    
unix  3      [ ]         流        已连接     57603    /run/user/121/bus
unix  3      [ ]         流        已连接     50219    /run/systemd/journal/stdout
unix  3      [ ]         流        已连接     67521    
unix  3      [ ]         流        已连接     58255    /run/user/121/bus
unix  3      [ ]         流        已连接     57377    /run/user/121/bus
unix  3      [ ]         流        已连接     58244    /run/user/121/bus
unix  2      [ ]         数据报                55210    
unix  3      [ ]         流        已连接     57544    /run/user/121/bus
root@ubuntu:/etc# ftp 192.168.253.135
Connected to 192.168.253.135.
220 (vsFTPd 3.0.3)
Name (192.168.253.135:python): python^H^H^H^H^H^H^H^H^H^H^H^H^H^H^H^H^H^H^H^H^H^H^H^H^H
331 Please specify the password.
Password:

530 Login incorrect.
Login failed.
ftp> 
ftp> exit
221 Goodbye.
root@ubuntu:/etc# ftp 192.168.253.135
Connected to 192.168.253.135.
220 (vsFTPd 3.0.3)
Name (192.168.253.135:python): tt
331 Please specify the password.
Password:
500 OOPS: could not read chroot() list file:/etc/vsftpd.chroot_list
Login failed.
ftp> 192.168.253.135
?Invalid command
ftp> 
ftp> exit
421 Service not available, remote server has closed connection
root@ubuntu:/etc# ftp 192.168.253.135
Connected to 192.168.253.135.
220 (vsFTPd 3.0.3)
Name (192.168.253.135:python): python
331 Please specify the password.
Password:
500 OOPS: could not read chroot() list file:/etc/vsftpd.chroot_list
Login failed.
ftp> exit
421 Service not available, remote server has closed connection
root@ubuntu:/etc# find chroot_list
chroot_list
root@ubuntu:/etc# vi chroot_list
root@ubuntu:/etc# service vsftpd restart
root@ubuntu:/etc# service vsftpd restart
root@ubuntu:/etc# ftp 192.168.253.135
Connected to 192.168.253.135.
220 (vsFTPd 3.0.3)
Name (192.168.253.135:python): python
331 Please specify the password.
Password:
500 OOPS: could not read chroot() list file:/etc/vsftpd.chroot_list
Login failed.
ftp> exit
421 Service not available, remote server has closed connection
root@ubuntu:/etc# find vsftpd.chroot_list
find: ‘vsftpd.chroot_list’: 没有那个文件或目录
root@ubuntu:/etc# vi vsftpd.conf
root@ubuntu:/etc# service vsftpd restart
root@ubuntu:/etc# service vsftpd status
● vsftpd.service - vsftpd FTP server
   Loaded: loaded (/lib/systemd/system/vsftpd.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2022-06-07 17:43:30 CST; 6s ago
  Process: 40929 ExecStartPre=/bin/mkdir -p /var/run/vsftpd/empty (code=exited, status=0/SUCCESS)
 Main PID: 40936 (vsftpd)
    Tasks: 1 (limit: 10133)
   CGroup: /system.slice/vsftpd.service
           └─40936 /usr/sbin/vsftpd /etc/vsftpd.conf

Jun 07 17:43:30 ubuntu systemd[1]: Starting vsftpd FTP server...
Jun 07 17:43:30 ubuntu systemd[1]: Started vsftpd FTP server.
root@ubuntu:/etc# ftp 192.168.253.135
Connected to 192.168.253.135.
220 (vsFTPd 3.0.3)
Name (192.168.253.135:python): python
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> exit
221 Goodbye.
root@ubuntu:/etc# ftp 192.168.253.135
Connected to 192.168.253.135.
220 (vsFTPd 3.0.3)
Name (192.168.253.135:python): tt
331 Please specify the password.
Password:
500 OOPS: cannot change directory:/home/tt
Login failed.
421 Service not available, remote server has closed connection
ftp> exit
root@ubuntu:/etc# ftp 192.168.253.135
Connected to 192.168.253.135.
220 (vsFTPd 3.0.3)
Name (192.168.253.135:python): python
331 Please specify the password.
Password:
230 Login successful.
Remote system type is UNIX.
Using binary mode to transfer files.
ftp> dir
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
drwxr-xr-x    2 1538     1538         4096 Jun 06 17:44 sussuce
226 Directory send OK.
ftp> exit
```

