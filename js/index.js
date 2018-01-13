	function $(id)
	{
		return document.getElementById(id);
	}
	window.onload = function () {
		var audioDom = $("audioDom");
		var vnum = $("vnum");
		var totimer = null;
		//audioDom.volume = vnum.value / 10; //这样除就成为小数
		audioDom.oncanplaythrough = function(){
			
			totimer = this.duration; 
		};
		
		// 音乐播放中执行的回调函数
		audioDom.ontimeupdate = function(){
			$("fm_time").innerHTML = getTime(this.duration - this.currentTime);
			var per = ((this.currentTime / this.duration)* 100);
			$("bar").style.width = per + "%";
		} 

		//获取时长
		function getTime(timer)
		{
			var m = parseInt(timer / 60);
			var s = parseInt(timer % 60);
			m = m < 10 ? "0" + m : m;
			s = s < 10 ? "0" + s : s;
			
			return m + ":" + s;
		};

		// 播放
		$("play").onclick = function(){
			audioDom.play();
			$("stop").style.cssText = "display:block;";
			$("play").style.cssText = "display:none;";
		};

		// 暂停
		$("stop").onclick = function(){
			audioDom.pause();
			$("play").style.cssText = "display:block;";
			$("stop").style.cssText = "display:none;";
		}
	};
    /*音量 start*/
	$("vol_box").children[2].onmousedown = function(e){
		var ev = e || window.event;
		var x = ev.clientX;
		var num = $("singer_info").offsetLeft + $("fm_box_small").offsetLeft + $("vol").offsetLeft + 8; //获取元素距离窗口左边的距离(重要)
		var non = x - this.parentElement.offsetLeft-num;
		$("vol_box").children[0].style.width=non +"px";

		if(non <= 0)
		{
			non = 0;
			$("vol_box").children[0].style.width=non +"px";
		}
		$("vol_box").children[1].style.left=non + "px"; 
		
		var ll = targetDom.offsetLeft;
		var ss = targetDom.parentElement.offsetWidth - targetDom.offsetWidth;
		var locally = ev.clientX - x + ll;
		var pop = (locally / ss * 100);
		$("audioDom").volume = pop * 0.01;
	};
	vol();

	
	function vol()
	{
		$("audioDom").volume = 0.2;
		targetDom = $("vol_box").children[1];
		var ev = targetDom || window.event;
		var x = ev.clientX;
		var l = targetDom.offsetLeft;
		var s = targetDom.parentElement.offsetWidth - targetDom.offsetWidth;
		var locally = ev.clientX - x + l;
		var pop = $("audioDom").volume * 100; //得出当前音量的所在位置
		targetDom.style.left = pop + $("audioDom").volume * 10 + "px"; //得出拖动按钮的位置
		$("vol_box").children[0].style.width = pop + "%";
	}
	
	// 拖拽音量
	function drag()
	{
		$("vol_box").children[1].onmousedown = function(e)
		{	
			var ev = e || window.event;
			targetDom = this;
			var x = ev.clientX;
			var l = targetDom.offsetLeft;
			var s = targetDom.parentElement.offsetWidth - targetDom.offsetWidth;
			document.onmousemove = function(e)
			{	
				var evv = e || window.event;
				var locally = evv.clientX - x + l;
				if(locally <= 0)
				{
					locally = 0;
				}
				if(locally > s)
				{
					locally = s;
				}
				var pop = (locally / s * 100);
				targetDom.style.left = locally + "px";
				$("vol_box").children[0].style.width = pop + "%";
				$("audioDom").volume = pop * 0.01;
			};
			document.onmouseup =function (e)
			{
				document.onmousemove = null;
				document.onmousedown = null;
			}
			return false;
		} 
	}
	drag();  
	/*音量 end*/