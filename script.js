$('style').remove();
$('head').append('<style type="text/css"> \
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
</style>');

$('body').html("");
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
$('body').prepend(bodyAll);

var temp = ' <li class="msg">\
<div class="id">{{msgId}}</div>\
<p class="title">{{subject}}</p>\
<p class="from">From: <span>{{sender}}</span></p>\
<p class="to">To: <span>{{recipientTitle}}</span></p>\
<pre class="body">{{body}}</pre>\</li>';

var loader = null;
$.getScript( 'https://rawgit.com/janl/mustache.js/master/mustache.js', init);
function init(res, status){
	
	$('#run').click(function(e){
		alert('run');
		if(loader != null) loader.abort();
		$('#msglist').html("");
		var fromId = $('#fromId').val();
		var toId = $('#toId').val();
		if(fromId<toId) {
			for(var i=fromId; i < toId; i++)
				getMsg(i);
		}
		else	
			alert('Nope!');
	});
	
	function print(r){
		if (!empty(r)) {
		    r.body =  r.body.replace(/<br\s*[\/]?>/gi, "\n");
			var msg = Mustache.to_html(temp, r);
    			$('#msglist').append(msg);
		}
	}
	
	function getMsg(id){
		var loader = $.ajax({  
			type: "POST",  
			dataType:"json",  // html json
			url: "http://campus.kpi.ua/student/index.php?mode=msg/ajax/msg.get.php",  
			data: "rec="+id, 
			success: print
		});
	}
	
}

