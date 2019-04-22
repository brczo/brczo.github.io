(function(w,$){
	function addStyleOnload(){ 
		var style = $('head').find('style');
		css = ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}";
		if(style.length === 0){
			style = $('<style>'+ css + '</style>');
			$('head').append(style.prop('outerHTML'));
		}else{
			style.append(css);
		}
	}
	function click(){
		var onclick = 'function' === typeof w.onclick && w.onclick;
		w.onclick = function(){
			onclick && onclick();
			generateHeart();
		}
	}
	function generateHeart(){
		let love = $('<div class="heart"></div>');
		hearts.push({
			element: love,
			x: w.event.clientX - 5,
			y: w.event.clientY - 5,
			scale: 1,
			alpha: 1,
			color: getColor(),
		});
		$('body').append(love);
	}
	function heartFly(){
		for(var i = 0; i < hearts.length; i++){
			if(0 >= hearts[i].alpha){
				hearts[i].element.remove();
			}else{
				hearts[i].scale += 0.01;
				hearts[i].alpha -= 0.005;
				hearts[i].y --;
				hearts[i].element.css({
					opacity: hearts[i].alpha, 
					left: hearts[i].x,
					top: hearts[i].y, 
					'background-color': hearts[i].color,
					'z-index': 9999,
					transform: 'scale(' + hearts[i].scale + ',' + hearts[i].scale + ') rotate(45deg)'
				});
			}
		}
		requestAnimationFrame(heartFly);
	}
	function getColor(){
		return "rgb(" + ~~ (255 * Math.random()) + "," + ~~ (255 * Math.random()) + "," + ~~ (255 * Math.random()) + ")"
	}
	function startup(){
		addStyleOnload(); //添加样式
		w.onclick = function(){ //绑定事件
			generateHeart();
		}
		heartFly(); //动画循环
	}
	var hearts = [];
	w.requestAnimationFrame = function() {
		return w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.mozRequestAnimationFrame || w.oRequestAnimationFrame || w.msRequestAnimationFrame ||
		function(w) {
            console.log(90);
			setTimeout(w, 1e3 / 60)
		}
	}(),
	startup();
})(window, jQuery);