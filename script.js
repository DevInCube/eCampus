
(function (global, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else if (typeof define === "function" && define.amd) {
    define(['exports'], factory); // AMD
  } else {
    factory(global.Campus = {}); // <script>
  }
}(this, function (campus) {
	
	var styles = '<style type="text/css"> \
		body { width: 100%;  }\
		#logo { position: absolute; float: left; margin-left: -150px; margin-top: -40px; } \
		.panel {background: white; padding:25px; width: 620px; margin-left: auto;  margin-right: auto;}\
		#control { background: steelblue; margin-left: 100px; height: 32px; margin-left: auto;  margin-right: auto; padding-top:15px; padding-left:50px; }\
		label { color:white; font-size:12px;  margin-left:10px; }\
		input { width: 75px; margin-left:5px;  margin-right:5px; } \
		#msglist {  list-style: none;  padding:0px; } \
		.msg { background: #eef; margin-bottom: 5px; max-width: 600px;  padding:5px;  padding-left: 15px;} \
		.id { float: right; color:gray; font-size:12px; font-weight:bold; } \
		p.title { margin-bottom:0px; margin-top:5px; color:black; font-size:12px;  } \
		p.from, p.to { margin:2px; color:gray; font-size:10px;  } \
		p.from>span, p.to>span { color:black; }\
		pre.body { margin:0px;  background-color: white; padding:5px; word-wrap: break-word; } \
		</style>';
		
	var bodyAll = '\
		<div class="panel">\
		<img src="images/logo.png" id="logo" alt="е-Кампус КПІ">\
		<div id="control">\
		<label>From:</label><input id="fromId" value="1">\
		<label>To:</label><input id="toId" value="10">\
		<input id="run" type="submit" value="Run" >\
		</div>\
		<ul id="msglist" ></ul>\
		</div>';
		
	var messageTemp = ' <li class="msg">\
		<div class="id">{{msgId}}</div>\
		<p class="title">{{subject}}</p>\
		<p class="from">From: <span>{{sender}}</span></p>\
		<p class="to">To: <span>{{recipientTitle}}</span></p>\
		<pre class="body">{{body}}</pre>\</li>';
	
	function prepareView() {
		$('style').remove();		
		$('head').append(styles);
		$('body').html(bodyAll);		
	}
	
	campus.run = function () {
		$.getScript( 'https://rawgit.com/janl/mustache.js/master/mustache.js');
		prepareView();
		var loader = null;		
		var list = $('#msglist');
		$('#run').click(function(e){
			if(loader != null) 
				loader.abort();
			list.empty();
			var fromId = $('#fromId').val();
			var toId = $('#toId').val();
			if(fromId > toId) 
				fromId = toId - 1;
			for(var i = fromId; i < toId; i++)
				getMsg(i);
		})
		
		function print(message){
			if (!empty(message)) {
				message.body =  message.body.replace(/<br\s*[\/]?>/gi, "\n");
				var msgView = Mustache.to_html(messageTemp, message);
				list.append(msgView);
			}
		}
		
		function getMsg(id){
			var loader = $.ajax({  
				type: "POST",  
				dataType:"json", 
				url: "/ajax/msg.get.php",  
				data: "rec=" + id, 
				success: print
			});
		}
	} //run

}));

