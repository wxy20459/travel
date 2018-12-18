//显示向左移动图标
$(".shade_left").hover(function (){
    $(".carousel .left").stop().fadeIn();
}, function (){
    $(".carousel .left").stop().fadeOut();
});

//显示向右移动图标
$(".shade_right").hover(function () {
    $(".carousel .right").stop().fadeIn();
}, function () {
    $(".carousel .right").stop().fadeOut();
});

//转移图片的a标签的click事件
$(".shade").click(function () {
    location.href = $(".img li:visible a").attr("href");
});

//手动向左移动
$(".carousel .btn.left").click(function (e) {
    move(-1);
    e.stopPropagation();
});
//手动向右移动
$(".carousel .btn.right").click(function (e) {
    move();
    e.stopPropagation();
});

//自动轮播
var idx = 0;
var timer = setInterval(move, 3000);

function move(left) {
    if (left) { //向左移动
        idx--;
        if (idx == -1) {
            idx = imgNum - 1;
        }
    } else {
        idx++;
        if (idx == imgNum) {
            idx = 0;
        }
    }
    $(".num li").eq(idx).addClass("active").siblings().removeClass("active");
    $(".img li").eq(idx).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
}

//图片获取焦点时，停止自动轮播
$(".carousel").hover(function () {
    clearInterval(timer);
}, function () {
    timer = setInterval(move, 3000);
});
