//鼠标点击变换颜色
$("#navBar nav a").click(function(){
//	点击相应的a标签,为其添加css属性
//	siblings()获取匹配集合中每个元素的同胞，通过选择器进行筛选可选的
	$(this).addClass("currentPage").siblings().removeClass("currentPage");
});

//鼠标经过变换颜色
//$("#navBar nav a").mouseover(function(){
//	$(this).addClass("mouse").siblings().removeClass("mouse");
//}).mouseout(function(){
//	$(this).removeClass("mouse");
//});

//确定滚动的方向
var down = false;
//监听页面的滚动
$(window).scroll(function(){
//	看不见导航栏
	if($(this).scrollTop() > 100){
//		给navBar添加固定
		$("#navBar").addClass("fixed");
		
		if(!down){
//			从上弹下来的效果
			$("#navBar").css({"top":"-40px"});
			$("#navBar").animate({"top":"0px"},500);
			down = true;
		}
	}else{
//		清除固定定位
		$("#navBar").removeClass("fixed");
		
		down = false;
	}
});
