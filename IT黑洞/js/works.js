window.onload = function () {
	
//	轮播
    var container = document.getElementById('worksLunBo');
    var list = document.getElementById('worksLunBo_photo');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var len = 5;
    var animated = false;
    var interval = 3000;
    var timer;

	function animate (offset) {
        if (offset == 0) {
            return;
        }
        animated = true;
        var time = 300;
        var inteval = 10;
        var speed = offset/(time/inteval);
        var left = parseInt(list.style.left) + offset;

        var go = function (){
            if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, inteval);
            }
            else {
                list.style.left = left + 'px';
                if(left>-200){
                    list.style.left = -600 * len + 'px';
                }
                if(left<(-600 * len)) {
                    list.style.left = '-600px';
                }
                animated = false;
            }
        }
        go();
    }

    function play() {
        timer = setTimeout(function () {
            next.onclick();
            play();
            }, interval);
    }
    function stop() {
        clearTimeout(timer);
    }

    next.onclick = function () {
        if (animated) {
            return;
        }
        if (index == 5) {
            index = 1;
        }else {
            index += 1;
        }
        animate(-600);
    }
    prev.onclick = function () {
        if (animated) {
            return;
        }
        if (index == 1) {
            index = 5;
        }else {
            index -= 1;
        }
        animate(600);
    }

	container.onmouseover = stop;
    container.onmouseout = play;

    play();
    
    
    
//  数字变换
	var worksSpan1 = document.getElementById("worksSpan1");
	var worksSpan2 = document.getElementById("worksSpan2");
	var worksSpan3 = document.getElementById("worksSpan3");
	var i = 0;
	var timer2;

	
	var offset = $("#worksSpan1").offset().top;
	
	window.onscroll = function(){
		var osTop = $(window).scrollTop();
		if(osTop >= 1800 && osTop <= 2200){
			timer2 = setInterval(function(){
				i++;
				worksSpan1.innerHTML = 50 + i;
				worksSpan2.innerHTML = 30 + i;
				worksSpan3.innerHTML = 44 + i;
				if(i >= 200){
					clearInterval(timer2);
					i = 200;
				}
			},50);
		}

	}

}