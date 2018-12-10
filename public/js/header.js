$(function(){
    $("<link rel='stylesheet' href='css/header.css'>").appendTo("head");
    $.ajax({
      url:"http://127.0.0.1:3000/header.html",
      type:"get",
      success:function(res){
        //res->html片段
        $(res).replaceAll("#header");
      }
    })
})