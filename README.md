# pc轮播图(基于jquery适用pc页面)的无缝轮播图 --klCarousel



#使用方式

//引入js文件  jquery 一定要在klCarousel上面引入
<script src="jquery-1.8.3.min.js"></script>
<script src="klCarousel.js"></script>

#html部分

<div id="klCarousel"></div> //这里的id随便起 也可以是aaa

#js部分

//这个var klCarousel = 可以不写 可以直接 new KlCarousel.carousel({ 

//写的话  名字随便起 这个作用 主要是防止 同一个页面 有多个轮播  这个变量名就可以吧多个轮播区分开。 如果页面只有一个轮播 就无所谓写不写了

var klCarousel = new KlCarousel.carousel({

    //目标位置就是html里面的id
    
    el:$('#klCarousel'),
    
    //轮播图片
    
    imgArr   : ["111.png","222.png","333.png","444.png","555.png","666.png","777.png"],
    
    //点击图片跳转的链接 根据图片的索引 放，不能n个图片n+1个链接，
    
    a:["https://www.baidu.com/","https://www.baidu.com/","https://www.baidu.com/","https://www.baidu.com/","https://www.baidu.com/","https://www.baidu.com/","https://www.baidu.com/"],
    
    //图片索引  false就是取消索引
    
    indexs    : true, 
    
    //鼠标操作翻页  不要翻页的画 留一个空数组，示例 upDown : [],
    
    upDown : ["left.png","right.png"],
    
    //图片高
    
    imgHeight:'420px',
    
    //图片宽
    
    imgWidth:'420px',
    
    //换一个图片的动画需要的时间， 这个时间一定要小于图片轮播的时间，也就是下面setIntervals
    
    imgTime:1000,
    
    //多久轮播一下
    
    setIntervals:2000,
    
});


css部分

css就照着我html文件里面，写出来，改吧改吧 应该就OK的。
