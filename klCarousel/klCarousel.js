/*
 *KlCarousel 轮播插件
 *0.0.1 
 *2016-10-16 18:49
 *作者 ：恐龙
 *QQ1250888888
 */

(function(win,doc,$){
    var KlCarousel = {};
    function carousel(options) {
        this._init(options);
    }
    $.extend(carousel.prototype,{
        _init : function(options) {
            var self = this;
            self.options = {
                //目标位置
                el:"",
                //轮播图片
                imgArr:"",
                //图片索引  
                indexs:"", 
                //鼠标操作翻页  
                upDown:"",
                //图片高
                imgHeight:"",
                //图片宽
                imgWidth:"",
                //时间
                imgTime:""      
            };
            $.extend(true,self.options,options || {});
                self._imgArr();
                self._upDown();
                self._indexs();
                return self;
           },
        _imgArr:function(){
            var self = this,
                $html = '<ul class="klCarousel-box">';
                for (var i = 0; i < self.options.imgArr.length; i++) {
                    $html += '<li><a href="'+self.options.a[i]+'"><img src="'+self.options.imgArr[i]+'"/></a></li>'
                }
                $html += '</ul>';
            self.options.el.append($html);
            self.options.el.css({
                width:self.options.imgWidth,
                height:self.options.imgHeight
            });
            self.options.el.find('.klCarousel-box li').css({
                width:self.options.imgWidth,
                height:self.options.imgHeight
            })
            self.options.el.find('.klCarousel-box img').css({
                width:self.options.imgWidth,
                height:self.options.imgHeight
            })
            /*此处很关键，在实现无疑轮播时这个宽度一定要比显示图片数量+1的宽度宽*/
            self.options.el.find('.klCarousel-box').css('width',(self.options.imgArr.length + 1) * parseInt(self.options.imgWidth) + 'px');
            //这里调用了轮播
            self.setIn = setInterval(function(){self._carousel()},self.options.setIntervals);
        },
        _upDown : function(){
            var self = this;
            if(self.options.upDown.length != 2 ) {
                return;
            }else{
                var $html = '<div class="klCarousel-up"><img src="'+self.options.upDown[0]+'"></div><div class="klCarousel-next"><img src="'+self.options.upDown[1]+'"></div>';
                self.options.el.append($html);
                self.options.el.on('click','.klCarousel-next',function(){
                    clearInterval(self.setIn);
                    var $left = parseInt(self.options.el.find(".klCarousel-box").css('margin-left'));
                    if ($left > -(parseInt(self.options.imgWidth) * (self.options.imgArr.length - 1))) {
                        $left -=  parseInt(self.options.imgWidth);
                        self.options.el.find(".klCarousel-box").css('margin-left',$left+'px');
                        self.options.el.find('.klIndex-index') ? self.options.el.find('.klIndex-index').eq(-($left / parseInt(self.options.imgWidth))).addClass('klactive').siblings().removeClass('klactive') : false;
                    }else{
                        $left = 0;
                        self.options.el.find(".klCarousel-box").css('margin-left',$left+'px');
                        self.options.el.find('.klIndex-index') ? self.options.el.find('.klIndex-index').eq(0).addClass('klactive').siblings().removeClass('klactive') : false; 
                    }
                    self.setIn = setInterval(function(){self._carousel()}, self.options.setIntervals);
                })
                self.options.el.on('click','.klCarousel-up',function(){
                    clearInterval(self.setIn);
                    var $left = parseInt(self.options.el.find(".klCarousel-box").css('margin-left'));
                    if ($left < 0) {
                        $left += parseInt(self.options.imgWidth);
                        self.options.el.find(".klCarousel-box").css('margin-left',$left+'px');
                        self.options.el.find('.klIndex-index') ? self.options.el.find('.klIndex-index').eq(-($left / parseInt(self.options.imgWidth))).addClass('klactive').siblings().removeClass('klactive') : false;
                    }else{
                        $left = -(parseInt(self.options.imgWidth) * (self.options.imgArr.length - 1));
                        self.options.el.find(".klCarousel-box").css('margin-left',$left+'px');
                        self.options.el.find('.klIndex-index') ? self.options.el.find('.klIndex-index').eq(self.options.imgArr.length - 1).addClass('klactive').siblings().removeClass('klactive') : false;
                    }
                    self.setIn = setInterval(function(){self._carousel()}, self.options.setIntervals);
                })
            }   
        }, 
        _indexs:function(){
            var self = this;
            if (self.options.indexs) {
                var $html = '<div class="klIndex-box"><div class="klIndex">';
                for (var i = 0; i < self.options.imgArr.length; i++) {
                    $html += '<b class="klIndex-index"></b>';
                }
                $html += '</div></div>';
                self.options.el.append($html);
                self.options.el.find('.klIndex-index').eq(0).addClass('klactive');
                self.options.el.find('.klIndex').css({
                    'margin-top':(parseInt(self.options.el.find('.klIndex-box').css('height'))-parseInt(self.options.el.find('.klIndex').css('height'))) / 2 + 'px',
                    'margin-left':(parseInt(self.options.el.find('.klIndex-box').css('width'))-parseInt(self.options.el.find('.klIndex').css('width'))) / 2 + 'px'
                });
                self.options.el.on('click','.klIndex-index',function(){
                    clearInterval(self.setIn)
                    var $num = $(this).index();
                    var $left = -($num * parseInt(self.options.imgWidth))+'px';
                    $(this).addClass('klactive').siblings().removeClass('klactive');
                    self.options.el.find(".klCarousel-box").css('margin-left',$left);
                    self.setIn = setInterval(function(){self._carousel()}, self.options.setIntervals);
                })
            }else{
                return false;
            }
        },
        _carousel:function(){
            var self = this;
            var $left = parseInt(self.options.el.find(".klCarousel-box").css('margin-left'));
            if ($left > (-parseInt(self.options.imgWidth) * (self.options.imgArr.length - 1))) {
                $left -= parseInt(self.options.imgWidth);
                self.options.el.find(".klCarousel-box").animate({marginLeft:$left+'px'},self.options.imgTime);
                self.options.el.find('.klIndex-index') ? self.options.el.find('.klIndex-index').eq(-($left / parseInt(self.options.imgWidth))).addClass('klactive').siblings().removeClass('klactive') : false;
            }else if ($left == (-parseInt(self.options.imgWidth) * (self.options.imgArr.length - 1))) {
                $left = '0px';
                self.options.el.find(".klCarousel-box").animate({marginLeft:$left},self.options.imgTime);
                self.options.el.find('.klIndex-index') ? self.options.el.find('.klIndex-index').eq(0).addClass('klactive').siblings().removeClass('klactive') : false;
            }else{
                $left = '0px';
                self.options.el.find(".klCarousel-box").animate({marginLeft:$left},self.options.imgTime);
                self.options.el.find('.klIndex-index') ? self.options.el.find('.klIndex-index').eq(0).addClass('klactive').siblings().removeClass('klactive') : false;
            }
        }
    });
    KlCarousel.carousel = carousel;
    window.KlCarousel = KlCarousel;
})(window,document,jQuery);
