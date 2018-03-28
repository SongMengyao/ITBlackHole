$(function(){
	var box = $("#box");
	var Button = $("#button");
	
//	获取box的宽和高
	var pageW=parseInt($(box).width());
    var pageH=parseInt($(box).height());
	
	var Top,Right;
    var width;
    width=pageW;
	
	
//	Button.bind("click",faSong);
	Button.click(function(){
		faSong();
	});
	$(document).keydown(function(e){
		if(e.keyCode == 13){
            faSong();
        }
	});
	
	function faSong(){
//		创建一个<span></span>标签
		var creSpan = $("<span id='span'></span>");
		var textVal = $("#text").val();
		
		var Span = $("#span");
		
		creSpan.text(textVal);
		$("#text").val("");
//      随机获取高度值
        Top=parseInt(pageH*(Math.random()));
        if(Top>pageH-300){
            Top=pageH-300;
        }
        
//      随机获取颜色
		var colorArr = ["#D84C29","#FFCD41","#17A05E","#1580A7","#db6be4","#f5264c","#d34a74","#5AA500","#5AA5E1","#5A50E1"];
       	index = Math.round(Math.random()*9);
       	colorSuiJi = colorArr[index];
        creSpan.css({"top":Top,"right":-300,"color":colorSuiJi});
        box.append(creSpan);
        
//      清除数据缓存
        var spanDom=$("#box>span:last-child");
        spanDom.stop().animate({"right":pageW+300},10000,"linear",function(){
            $(this).remove();
//          $(this).removeData();
        });
    }
	
});