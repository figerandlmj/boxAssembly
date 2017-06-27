require.config({
	paths:{
		'jquery':'jquery-3.2.1.min',
		'jqueryUI':'http://code.jquery.com/ui/1.10.4/jquery-ui'
	}
});
require(['jquery','window'],function($,w){
	$("#a").click(function(){
		var win=new w.Window().alert({
			title:"提示",
			content:"welcome!",
			handler4AlertBtn:function(){
				alert("you click alert button");
			},
			handler4CloseBtn:function(){
				alert("you click close button");
			},
			width:300,
			height:150,
			y:50,
			hasCloseBtn:true,
			isDraggable:true,
			dragHandle:".window_header",
			skinClassName:"window_skin_a",
			text4AlertBtn:"好的"
		}).on("alert",function(){
			alert("the second alert handler");
		}).on("alert",function(){
			alert("the third alert handler");
		});
		win.on("close",function(){
			alert("the second close handler");
		})
	})
	$("#b").click(function(){
		new w.Window().confirm({
			title:"系统消息",
			content:"你确定要删除这个文件吗？",
			width:300,
			height:150,
			y:50,
			isDraggable:true,
			dragHandle:".window_header",
			text4ConfirmBtn:"是",
			text4CancelBtn:"否"
		}).on("confirm",function(){
			alert("确定");
		}).on("cancel",function(){
			alert("取消");
		});
	})
	$("#c").click(function(){
		new w.Window().prompt({
			title:"请输入您的名字",
			content:"我们将会为您保密您输入的信息。",
			width:300,
			height:150,
			y:50,
			isDraggable:true,
			dragHandle:".window_header",
			text4PromptBtn:"输入",
			text4CancelBtn:"取消",
			defaultValue4PromptInput:"张三",
			isPromptInputPassword:true,
			handler4PromptBtn:function(inputValue){
				alert("您输入的内容是:"+inputValue);
			},
			handler4CancelBtn:function(){
				alert("取消");
			}
		});
	})
	$("#d").click(function(){
		new w.Window().common({
			title:"请输入您的名字",
			content:"我是一个通用弹框",
			width:300,
			height:150,
			y:50,
			hasCloseBtn:true
		});
	})
});