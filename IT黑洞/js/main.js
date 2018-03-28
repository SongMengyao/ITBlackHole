$(function() {

	//回到顶部
	$(window).scroll(function() {
		var t = $(this).scrollTop()

		if(t > 200) {
			$(".returnTop").stop().fadeIn();
		} else {
			$(".returnTop").stop().fadeOut()
		}
	})

	$(".returnTop").click(function() {
		$("body,html").animate({ scrollTop: 0 }, 500)
	})
	
	
	
//banner轮播
$(".home-banner").eq(0).show();
$(".home-slide i").click(function() {
	$(this).addClass("home-slide-i").siblings().removeClass("home-slide-i")

	var index = $(this).index();
	i = index;
	
//	alert(index)  //获取索引值

	$(".home-banner").eq(index).stop().fadeIn(300).siblings().stop().fadeOut(300);
})

//自动轮播
var i = 0;
var t = setInterval(move, 1500)
//核心向右运动函数
function move() {
	i++;
	if(i == 3) {
		i = 0;
	}

	$(".home-slide i").eq(i).addClass("home-slide-i").siblings().removeClass()
	$(".home-banner").eq(i).fadeIn(300).siblings().fadeOut(300)
}

//向左运动函数
function moveL() {
	i--;
	if(i == 0) {
		i = 3;
	}
	$(".home-slide i").eq(i).addClass("home-slide-i").siblings().removeClass()
	$(".home-banner").eq(i).fadeIn(300).siblings().fadeOut(300)
}


//定时器的开始与结束
$(".home_main").hover(function() {
	clearInterval(t);
}, function() {
	t = setInterval(move, 1500);
})
	
})





//弹框
//var planButton = document.getElementsByClassName('planButton')[3];
var planButton1 = document.getElementById("button1");
var planButton2 = document.getElementById("button2");
var planButton3 = document.getElementById("button3");
var planButton4 = document.getElementById("button4");
var plansMask = document.getElementById("plans_mask");
var plansTanKuang = document.getElementById("plans_tanKuang");
var plansClose = document.getElementById("plans_close");

planButton1.onclick = function(){
	plansMask.style.display = "block";
}
planButton2.onclick = function(){
	plansMask.style.display = "block";
}
planButton3.onclick = function(){
	plansMask.style.display = "block";
}
planButton4.onclick = function(){
	plansMask.style.display = "block";
}
plansClose.onclick = function(){
	plansMask.style.display = "none";
}









