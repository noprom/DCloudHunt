app_debug = 1;
(function($, doc) {
	function shield(){
		return false;
	}
	document.addEventListener('touchstart',shield,false);//取消浏览器的所有事件，使得active的样式在手机上正常生效
	document.oncontextmenu=shield;//屏蔽选择函数
	
	$.plusReady(function() {
		plus.screen.lockOrientation("portrait-primary");

		window.addEventListener('resize', function() {
			oauthArea.style.display = document.body.clientHeight > 400 ? 'block' : 'none';
		}, false);
		
		setTimeout(function() {
			plus.navigator.closeSplashscreen();
		}, 600);

		//退出应用
		var backButtonPress = 0;
		$.back = function(event) {
			backButtonPress++;
			if (backButtonPress > 1) {
				plus.runtime.quit();
			} else {
				plus.nativeUI.toast('再按一次退出应用');
			}
			setTimeout(function() {
				backButtonPress = 0;
			}, 2000);
			return false;
		};
		
		// 处理返回事件
		$.goback=function(hide){
			if($.plus){
				ws||(ws=plus.webview.currentWebview());
				if(hide||ws.preate){
					ws.hide('auto');
				}else{
					ws.close('auto');
				}
			}else if(history.length>1){
				history.back();
			}else{
				w.close();
			}
		};
		
		$.page_nav = function() {
			var navs = document.querySelectorAll(".mui-bar > .mui-tab-item");
			
			[].forEach.call(navs, function(obj) 
			{
				if(obj.id != 'page_index') {
					$.preload({
						"id": obj.id,
						"url": obj.target.replace("page_", ""),
						"styles":{
					        top:    '0px',//mui标题栏默认高度为45px
					        bottom: '50px',
					    }
					});
				}
				
				document.getElementById(obj.id).addEventListener("tap", function(){
					if(this.id == 'page_index') {
						//获得主页面的webview
					    var main = plus.webview.currentWebview();
					    mui.openWindow({"id":main.id});
					} else {
						mui.openWindow({
							"id":this.id,
							"crateNew":false,
							"styles":{
						        top:    '0px',//mui标题栏默认高度为45px
						        bottom: '50px'//默认为0px，可不定义
						    }
						});
					}
				}, false);
			});
		}
		
		//底部导航菜单绑定
		$.page_nav();
	});
}(mui, document));