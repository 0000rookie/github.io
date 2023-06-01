// 随机获取头像的方法
var icon =(function randomIcon(){
    //  随机获取头像的随机值，
    const min= parseInt(1);
    const max= parseInt(20);

var num=Math.floor(Math.random() * (max - min + 1)) + min;
var str="https://hikki.site/data/img/emoji/coolapk/c-"+num+".png";
return str;
})()
// console.log(icon)
