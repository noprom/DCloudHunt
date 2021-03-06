mui.init({
	pullRefresh: {
		container: "#refreshContainer",
		up: {
			contentdown: "向上拉动刷新",
			contentover: "释放立即刷新",
			contentrefresh: "正在刷新...",
			callback: articlelist
		}
	}
});

// 下拉刷新业务实现
var count = 0;

function articlelist() {
	count++;

	var cate = 'T1370583240249';
	mui.ajax('http://c.m.163.com/nc/article/list/' + cate + '/' + count * 20 + '-20.html', {
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			mui.each(data[cate], function(index, row) {
				var li = document.createElement("li");
				li.className = 'mui-table-view-cell';
				li.setAttribute("docid", row.docid);
				li.innerHTML = '<a class="mui-navigate-right show_article" docid="' + row.docid + '">' + row.title + '</a>';

				li.addEventListener("tap", function(ent) {
					articleshow(this.getAttribute("docid"));
				}, false);
				document.getElementById("articlelist").appendChild(li);
			});
		},
		error: function(xhr, type, errorThrown) {
			console.log(xhr + type + errorThrown);
		}
	});

	mui('#refreshContainer').pullRefresh().endPullupToRefresh();
}

/**
 * 显示文章详情
 * @param {Object} art
 */
function articleshow(art) {
	var article = 'http://c.3g.163.com/nc/article/' + art + '/full.html';
	mui.ajax(article, {
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			var content = data[art];
			var tpl = "article_show.html";
			var url = content.template == 'webview' ? content.link[0].href : tpl;
			
			mui.openWindow({
				"url": plus.os.name == "iOS" ? tpl : url,
				"id": art,
				"crateNew": false,
				"extras": {
					"article": content
				},
				"waiting": {
					autoShow: true,
					title: 'Loading...',
				}
			});
		},
		error: function(xhr, type, errorThrown) {
			console.log(xhr + ":" + type + ":" + errorThrown);
		}
	});
}
mui.ready(function() {
	articlelist();
});