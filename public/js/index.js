$(function () {
    $("<link rel='stylesheet' href='css/footer.css'>").appendTo("index");
    $.ajax({
        url: "http://127.0.0.1:3000/footer.html",
        type: "get",
        success: function (res) {
            //第一个小功能: -- 轮播图 --
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

            //第二个小功能: -- 轮播、loading --
            var nowTop = 0;
            var decretion = 1;
            var loadTimer = setInterval(() => {
                nowTop += -40 * decretion;
                $('.loading .container').css({
                    'top': nowTop + 'px'
                });
                if (nowTop == -120) {
                    decretion = -1;
                } else if (nowTop == 0) {
                    decretion = 1;
                }
            }, 2500);
            function start() {

            }
            function stop() {
                clearInterval(loadTimer);
            }
            $('.loading .container').on('mouseenter', function () {
                // 鼠标移入停止轮播
                stop();
            }).on('mouseleave', function () {
                // 鼠标移出继续轮播
                start();
            })


            //第三个小功能： -- 轮播下、图片放大和过渡效果 --
            $(".travel>.more>.container>.row>div>div:first-child>img")
                .on("mouseenter",function(){
                    //小火柴过渡效果
                    $(this).parent("div").siblings("div").children("p").css({'width':'92%','transition':'1s'});
                    //card阴影
                    $(this).parent("div").parent("div").css({'box-shadow':'0px 16px 10px -15px #999'})
                })
                .on('mouseleave', function() {
                    //移除小火柴
                    $(this).parent("div").siblings("div").children("p").css({ 'width': 0, 'transition': '1s' });
                    //移除阴影
                    $(this).parent("div").parent("div").css({ "box-shadow": 'none'})
                })
            
            // 第四个小功能 --目的地、字体加背景--
            $(".target_body>.container>.row>div>div>img")
                .on('mouseenter',function(){
                    $(this).parent("div").next().css({ 'background-color': '#0fc7d1' })
                    $(this).parent("div").next().children().css({ 'color': '#fff' })
                })
                // 移出
                .on('mouseleave', function () {
                    $(this).parent("div").next().css({ 'background-color': '', 'transition': '1s' });
                    $(this).parent("div").next().children("a").css({ 'color': 'rgb(82, 79, 79)' });
                    $(this).parent("div").next().children("p").css({ 'color': '#999'})
                })
            // 第五个小功能 -- 热门路线、日期变色 --
            $(".travel>.hot>.row>.contain")
            .on("mouseenter",function(){
                // $(this).children(".date").css({'color':'#0fc7d1'});//方法1
                $(this).children().first().css({'color':'#0fc7d1','font-weight':'400'});//方法2
            })
            .on('mouseleave',function(){
                $(this).children().first().css({'color':'#999','font-weight':'400'});//方法2
            })
            // 第六个小功能 -- 特色酒店card效果 --
            $(".hotel>.container>.box>.contain")
            // 移入
            .on('mouseenter',function(){
                $(this).css({'box-shadow':'1px 4px 10px #999'});
                $(this).children().children('a').css({'color':'#0fc7d1'});
                $(this).children('a').css({'right':'20px','border':'1px solid #0fc7d1','color':'#0fc7d1'});
            })
            // 移出
            .on('mouseleave',function(){
                $(this).css({'box-shadow':'none'})
                $(this).children().children('a').css({'color':'#333'});
                $(this).children('a').css({'right':'35px','border':'1px solid #ddd','color':'#ddd'});
            })

/* ----------------------------------------------------------------------------------------------------------------------------- */
            //保留两位小数并且整数部分三位一个逗号分隔符的数字金钱标准表示法：
            //这里假设我们即不知道输入数字的整数位数，也不知道小数位数
            /*将100000转为100,000.00形式*/
            var dealNumber = function(money){
                if(money && money!=null){
                    money = String(money);
                    var left=money.split('.')[0],right=money.split('.')[1];
                    right = right ? (right.length>=2 ? '.'+right.substr(0,2) : '.'+right+'0') : '.00';
                    var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
                    return (Number(money)<0?"-":"") + temp.join(',').split('').reverse().join('')+right;
                }else if(money===0){   //注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
                    return '0.00';
                }else{
                    return "";
                }
            };
            /*将100,000.00转为100000形式*/
            var undoNubmer = function(money){
                if(money && money!=null){
                    money = String(money);
                    var group = money.split('.');
                    var left = group[0].split(',').join('');
                    return Number(left+"."+group[1]);
                }else{
                    return "";
                }
            };
/* ----------------------------------------------------------------------------------------------------------------------------- */

            //第六个小功能  -- 小海豚、数据 --
            $('.travel>.dolphin>.container>.row>.data_1>h5').on('mouseenter',function(){
                console.log($(this).html()); 
                // console.log(parseInt($(this).html()));// 10
                // 拿网页上的数据、parseInt一下.toFixed(2)
                console.log(undoNubmer('10,000.00'));//10000
                // 
                console.log(dealNumber(10000));//10,000.00
            })

            


        }
    })
})