$(function () {
    $("<link rel='stylesheet' href='css/footer.css'>").appendTo("index");
    $.ajax({
        url: "http://127.0.0.1:3000/footer.html",
        type: "get",
        success: function (res) {
            //第一个功能: -- 轮播图 --
            var nowIndex = 0;
            var len = $('.picBox li').length;
            var timer;
            // 初始化入口函数
            function init() {
                // 绑定事件
                bindEvent();
                // 自动轮播
                sliderAuto();
            }
            init();

            function bindEvent() {
                // 按钮绑定事件
                $('.btn a').on('click', function () {
                    // 获得按钮上的class类名
                    var tar = $(this).attr('class');
                    // 调用移动函数
                    move(tar);
                });
                // 点击list按钮
                $('.list li').on('click', function () {
                    // 获得当前点击li索引
                    var i = $(this).index();
                    // 调用移动函数
                    move(i);
                });
                // 鼠标移入移出
                $('.wrapper').on('mouseenter', function () {
                    // 鼠标移入清除定时器
                    clearTimeout(timer);
                    // 鼠标移入显示左右箭头
                    $('.btn a').css({
                        'display': 'block',
                        'opacity': .5
                    });
                    //鼠标移入左箭头，左箭头显示
                    $('.btn .left').on('mouseenter', function () {
                        //左箭头高亮
                        $('.btn .left').css({
                            'display': 'block',
                            'opacity': 1
                        });
                        //右箭头透明 0.5
                        $('.btn .right').css({
                            'opacity': .5
                        });
                    })
                    //鼠标移入右箭头，右箭头显示
                    $('.btn .right').on('mouseenter', function () {
                        //右箭头高亮
                        $('.btn .right').css({
                            'display': 'block',
                            'opacity': 1
                        });
                        //左箭头透明0.5
                        $('.btn .left').css({
                            'opacity': .5
                        });
                    })
                }).on('mouseleave', function () {
                    // 鼠标移出继续轮播
                    sliderAuto();
                })
            }

            function sliderAuto() {
                clearTimeout(timer);
                // 自动轮播  延迟3s 向右轮播相当于点击右键按钮
                timer = setTimeout(function () {
                    move('right');
                }, 3000);
            }

            // 移动函数
            function move(dir) {
                // 判断左右按钮
                if (dir == 'right' || dir == 'left') {
                    // 方向是右  
                    if (dir == 'right') {
                        // 索引++  向后轮播
                        nowIndex++;
                        // 判断当前索引值   超出边界为0
                        nowIndex = nowIndex > len - 1 ? 0 : nowIndex;
                        // 向右切换一张  再次触发延迟向右展示下一张
                        sliderAuto();
                    } else {
                        // 向前轮播
                        nowIndex--;
                        // 判断索引边界
                        nowIndex = nowIndex < 0 ? len - 1 : nowIndex;
                    }
                } else {
                    // 如果是点击li小圆点  直接切换当前选中索引
                    nowIndex = dir;
                }
                // 移动ul
                $('.picBox').css({
                    'left': -nowIndex * 1901 + 'px',
                });
                // 调用小圆点
                changeStyle();
            }

            // 切换选中小圆点
            function changeStyle() {
                $('.active').removeClass('active');
                $('.list li').eq(nowIndex).addClass('active');
            }

            //第二个功能: -- loading --
            var nowTop = 0;
            var decretion = 1;
            var loadTimer = setInterval(() => {
                nowTop += -40 * decretion;
                $('.loading .container').css({
                    'top': nowTop + 'px'
                });
                if (nowTop == -120) {
                    decretion = -1;
                }else if(nowTop == 0){
                    decretion = 1;
                }
            }, 2500);
            function start(){
               
            }
            function stop(){
                clearInterval(loadTimer);
            }
            $('.loading .container').on('mouseenter', function () {
                // 鼠标移入停止轮播
                stop();
            }).on('mouseleave', function () {
                // 鼠标移出继续轮播
                start();
            })
            
            //第三个功能： --图片放大--
        }
    })
})