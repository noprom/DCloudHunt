mui.init({
	statusBarBackground: '#f7f7f7',
});

current_pid = 0;

function showlist() {
	current_pid++;
	console.log("showlist" + current_pid);

	pagesize = 20;
	var list_api = 'http://image.baidu.com/data/imgs?col=%E7%BE%8E%E5%A5%B3&tag=%E5%85%A8%E9%83%A8&sort=0&tag3=&pn=PAGE_ID&rn=20&p=channel&from=1'.replace('PAGE_ID', current_pid * pagesize);
	console.log(list_api);

	var w = plus.nativeUI.showWaiting("不要停...");
	mui.ajax(list_api, {
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 20000, //超时时间设置为10秒；
		success: function(data) {
			var html = "";
			for (k in data.imgs) {
				if (k >= pagesize)
					continue;

				var li = document.createElement("li");
				li.innerHTML = '<img class="imgslider" src="' + data.imgs[k].imageUrl + '" onerror="img_load_error(this)" />';
				document.getElementById("lists").appendChild(li);
			}
			w && w.close();
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(xhr);
			console.log(type);
			console.log(errorThrown);
			w && w.close();
		}
	});

	mui('#refreshContainer').pullRefresh().endPullupToRefresh();
}

function img_load_error(img) {
	console.log("img_load_error:" + img.src);
	img.parentElement.style.display = 'none';
}

mui.init({
	pullRefresh: {
		container: "#refreshContainer",
		up: {
			contentdown: "向上拉动刷新",
			contentover: "释放立即刷新",
			contentrefresh: "正在刷新...",
			callback: showlist
		}
	}
});

mui.plusReady(function() {
	showlist();
});