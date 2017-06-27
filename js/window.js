define(['widget','jquery','jqueryUI'],function(widget,$,$UI){
	function Window(){
		this.cfg={
			width:500,
			height:300,
			content:"",
			title:"系统消息",
			hasCloseBtn:false,
			hasMask:true,
			isDraggable:true,
			dragHandle:null,
			skinClassName:null,
			text4AlertBtn:"确定",
			text4ConfirmBtn:"确定",
			text4CancelBtn:"取消",
			handler4AlertBtn:null,
			handler4CloseBtn:null,
			handler4ConfirmBtn:null,
			handler4CancelBtn:null,
			text4PromptBtn:"确定",
			isPromptInputPassword:false,
			defaultValue4PromptInput:"",
			maxlength4PromptInput:10,
			handler4PromptBtn:null
		};
	}
	Window.prototype=$.extend({},new widget.Widget(),{
		renderUI:function(){//添加dom节点
			var footerContent="";
			switch(this.cfg.winType){
				case "alert":{
					footerContent='<input class="window_alertBtn" type="button" value="'+this.cfg.text4AlertBtn+'">';
					break;
				}
				case "confirm":{
					footerContent='<input class="window_confirmBtn" type="button" value="'+this.cfg.text4ConfirmBtn+'"><input class="window_cancelBtn" type="button" value="'+this.cfg.text4CancelBtn+'">';
					break;
				}
				case "prompt":{
					this.cfg.content+='<p class="window_promptInputWrapper"><input type="'+(this.cfg.isPromptInputPassword ? "password" : "text")+'" value="'+this.cfg.defaultValue4PromptInput+'" maxlength="'+this.cfg.maxlength4PromptInput+'" class="window_promptInput"></p>';
					footerContent='<input class="window_promptBtn" type="button" value="'+this.cfg.text4PromptBtn+'"><input class="window_cancelBtn" type="button" value="'+this.cfg.text4CancelBtn+'">';
					break;
				}
			}
			this.boundingBox=$(
				'<div class="window_boundingBox">'+
					'<div class="window_body">'+this.cfg.content+'</div>'+
				'</div>'
			);
			if(this.cfg.winType!="common"){
				this.boundingBox.prepend('<div class="window_header">'+this.cfg.title+'</div>');
				this.boundingBox.append('<div class="window_footer">'+footerContent+'</div>');
			}
			if(this.cfg.hasCloseBtn){
				this.boundingBox.append('<span class="window_closeBtn">X</sapn>');
			}
			if(this.cfg.hasMask){
				this._mask=$('<div class="window_mask"></div>');
				this._mask.appendTo("body");
			}
			this.boundingBox.appendTo(document.body);
			this._promptInput=this.boundingBox.find(".window_promptInput");
		},
		bindUI:function(){//监听事件
			var that=this;
			this.boundingBox.delegate(".window_alertBtn","click",function(){
				that.fire("alert");
				that.destroy();
			}).delegate(".window_closeBtn","click",function(){
				that.fire("close");
				that.destroy();
			}).delegate(".window_confirmBtn","click",function(){
				that.fire("confirm");
				that.destroy();
			}).delegate(".window_cancelBtn","click",function(){
				that.fire("cancel");
				that.destroy();
			}).delegate(".window_promptBtn","click",function(){
				that.fire("prompt",that._promptInput.val());
				that.destroy();
			});
			if(this.cfg.handler4AlertBtn){
				this.on("alert",this.cfg.handler4AlertBtn);
			}
			if(this.cfg.handler4CloseBtn){
				this.on("close",this.cfg.handler4CloseBtn);
			}
			if(this.cfg.handler4ConfirmBtn){
				this.on("confirm",this.cfg.handler4ConfirmBtn);
			}
			if(this.cfg.handler4CancelBtn){
				this.on("cancel",this.cfg.handler4CancelBtn);
			}
			if(this.cfg.handler4PromptBtn){
				this.on("prompt",this.cfg.handler4PromptBtn);
			}
		},
		syncUI:function(){//初始化组件属性
			this.boundingBox.css({
				width:this.cfg.width+"px",
				height:this.cfg.height+"px",
				left:(this.cfg.x||(window.innerWidth-this.cfg.width)/2)+"px",
				top:(this.cfg.y||(window.innerHeight-this.cfg.height)/2)+"px"
			});
			if(this.cfg.skinClassName){
				this.boundingBox.addClass(this.cfg.skinClassName);
			}
			if(this.cfg.isDraggable){
				if(this.cfg.dragHandle){
					this.boundingBox.draggable({handle:this.cfg.dragHandle});
				}else{
					this.boundingBox.draggable();
				}
			}
		},
		destructor:function(){//销毁前的处理函数
			this._mask&&this._mask.remove();
		},
		alert:function(cfg){
			$.extend(this.cfg,cfg,{winType:"alert"}),//后者与前者合并覆盖前者，返回前者
			this.render();	
			return this;//为了实现连缀写法
		},
		confirm:function(cfg){
			$.extend(this.cfg,cfg,{winType:"confirm"}),//后者与前者合并覆盖前者，返回前者
			this.render();	
			return this;//为了实现连缀写法
		},
		prompt:function(cfg){
			$.extend(this.cfg,cfg,{winType:"prompt"}),//后者与前者合并覆盖前者，返回前者
			this.render();	
			this._promptInput.focus();
			return this;//为了实现连缀写法
		},
		common:function(cfg){
			$.extend(this.cfg,cfg,{winType:"common"}),//后者与前者合并覆盖前者，返回前者
			this.render();
			return this;//为了实现连缀写法
		}
	});
	return{
		Window:Window
	}
})