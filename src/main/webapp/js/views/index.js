require(['jquery','angular','common','angular-route','angular-sanitize','appRoute','bootstrap','jquery-ui'], function($,angular,common) {
	
	$(function() {
		
		var timer=null;
		var flag=0;		
       
		//给文档添加tlApp这个模块
		angular.bootstrap(document,["tlApp"]);
		
		//引进common里面弹出框
		$("body").append(commonConfirmHtml);
		$("body").append(commonConfirmHtml1);
		$("body").append(mySuccessModal);
		$("body").append(mySuccessModal1);
		$("body").append(mySuccessModal2);
		$("body").append(alertHtml);
		$("body").append(alert1Html);
		
		
		$.getJSON(ctx + '/index/getMenu', {pageNum : 1,pageSize : 9999,},
			function(data){
   				var datapage = data.result;
				var datalist = datapage.result;
				var pageSize = datapage.pageSize;
                var tempHtml="";
                for(var i=0;i<datalist.length;i++){   
                 	var menu = datalist[i];
                 	var submenulist = "";
                 	for(var j=0;j<menu.subMenuList.length;j++){
                 		one = menu.subMenuList[j];
                 		/*if(menu.ispage == 0){
                 			continue;
                 		}*/
                 		submenulist += "<li><a href=\""+one.uri+"\">"+one.name+"</a></li>";
                 	}
                 	/*if(menu.ispage == 0){
             			continue;
             		}*/
                 	tempHtml += "<h3 class=\""+menu.classname+"\"><span class=\"ico\"></span><i class=\"re\"></i>"+menu.name+"</h3><div><ul>"+submenulist+"</ul></div>";
                 	
                 	if($('.alert-warning').length>0){
                 		$('.alert-warning').remove();
                 	}
                 }
                $('#subsidebar').prepend(tempHtml+'<hr class="sideLine"/>');
                 
                //侧边栏折叠
        		$( ".accordion" ).accordion({
        	    	collapsible: true,
        	    	heightStyle: "content",
        	    	active:false
        	    });
        		hover();
                
		}).fail(function (err){ 
			if($('.loading')){
				$('.loading').remove();
			}
			common.alert('服务器错误！请刷新页面重试或联系管理员',"确定"); 
        });  
		
		//一些公共方法 start
		(function(){
			//更多筛选
			$(document).on('click','.more span', function(){
				$('.distant').toggle();
			});
			
			//复选框主动触发
			$(document).on('click','.check tr',function(ev){
				if($(ev.target).parents('td,th').index()!=0&&ev.target.tagName.toLowerCase()!="button"){
					$(this).find('input[type=checkbox]').trigger('click');
				}			
			});
			//全选
			$(document).on('click','.check .all', function() {
				if ($(this).is(':checked')) {
					$('input[type=checkbox]').prop('checked', true);
				} else {
					$('input[type=checkbox]').removeAttr('checked');
				}
			});
			//各个复选框
			$(document).on('click','.check input[type=checkbox]:not(.all)', function() {
				if ($(this).is(':checked')) {
					$('.all').prop('checked', true);
					$("input[type=checkbox]").not(".all").each(function() {
						if (!$(this).is(':checked')) {
							$('.all').removeAttr('checked');
							return false;
						}
					});
				} else {
					if ($('.all').is(':checked')) {
						$('.all').removeAttr('checked');
					}
				}
			});
		
			
		})();
		//一些公共方法 end
		
	    //侧边栏 start
		$(document).on('click','.sidebar1 h3',function(){
	    	$('.sidebar1 li').css('backgroundColor','transparent');
	    	$('.sidebar1 h3').css({
	    		'background-color':'transparent',
	    		'border-top':'1px solid #4a4a47'
	    	});
	    	$('.sidebar1 h3').find('span').css('background-position-x','0px');
	    	$('.sidebar1 h3').find('i').css('background-position-x','-11px');
	    	if($(this).attr('class')=='home'){	    		
	    		$('.sidebar1 .accordion  h3').each(function(){
	    			if($(this).hasClass('ui-state-active')){
	    				 $(this).trigger('click'); 
		    		}   
	    		 });    		
	    	}
	    	if($(this).hasClass('ui-accordion-header-active')||$(this).attr('class')=='home'){
	    		$(this).css({
		    		'background-color':'#282826',
		    		'border-top':'1px solid #282826'
		    	});
		    	$(this).find('span').css('background-position-x','-29px');
		    	$(this).find('i').css('background-position-x','0px');
	    	}	    	
	    });	  
	    
	    $('.sidebar1 h3.home').on('click',function(){
	    	addTabItems($(this));
	    });
	    
	    function hover(){
	    	$('.sidebar1 li').hover(function(){	
		    	if($(this).attr('style').indexOf('sideBar_bg.png')!=-1){	    		
		    		flag=1;		 	    		  		
		    	}else{	  	    		
		    		$(this).css('background','#2e2e2b');     		
		    	}	    	    
		    },function(){
		    	if(flag){
		    		flag=0;		    		
		    	}else{
		    		$(this).css('background','transparent');    		   
		    	}
		    });	   
	    }
	    $(document).on('click','.sidebar1 li',function(){	    	
	    	flag=1;
	    	$('.sidebar1 li').css('background','transparent').find('a').css('color','#c7c9d3');
	    	$(this).css('background','url(./img/sideBar_bg.png) no-repeat').find('a').css('color','#ffffff');	    	
	    	addTabItems($(this));
	    });
	    //侧边栏end
	  
	    
	    //tab start	
	    //右键事件	   	    
	    window.onresize=function(){	    		    	
	    	common.setTabBotton();
	    	delChange();
	    	return false;		   
		}	    
		$('.navtab ').on('click','li',function(){
			$(this).addClass('active').siblings('li').removeClass('active').find('span').remove();
			if($(this).find('span').length<=0&&$(this).find('a').text()!='首页'){
				$(this).find('a').before('<span aria-hidden="true">×</span>');
			}					
		});
		$('.navtab ').on('click','span',function(){			
			var oParent=$(this).parent('li');
			var i=tabItems.indexOf($(this).siblings('a').text());
			removeIt($(this).siblings('a').text());			
			if(oParent.next('li').length){					
				oParent.next().find('a').trigger('click');
			}else{					
				oParent.prev().find('a').trigger('click');
			}					
			oParent.remove();
			common.setTabBotton();
			delChange();
		});
		 $(document).on('click','.l-tab-links-right',function(){
		    moveToNextTabItem();
	     });
	     $(document).on('click','.l-tab-links-left',function(){
	    	moveToPrevTabItem();
	     });
	     
	   
	     
	    function removeIt(val) {
    		var index = tabItems.indexOf(val);
    		if (index > -1) {
    			tabItems.splice(index, 1);
	    	}
    	}    	
	    function addTabItems(it){	    		    	
	    	var link=it.find('a');
	    	var title=link.text();	    	
	    	if(tabItems.indexOf(title)!=-1){
	    		$('.navtab ul li').find('a').each(function(){
	    			if($(this).text()==title){
	    				$(this).trigger('click');
	    			}
	    		});	    			
	    	}else{	    		
	    		tabItems.push(title);
	    		$('.navtab ul').find('li').removeClass('active').find('span').remove();
	    		$('.navtab ul').append('<li class="active clearfix"><span aria-hidden="true">×</span><a href="'+link.attr('href')+'" >'+title+'</a></li>');	    	
	    	}	    	
	    	common.setTabBotton();
	    	common.moveToTabItem(title);
	    }
	    function delChange(){
    		var temp=0,contentWidth=0;
    		var oParent=parseInt($('.navtab ul').css('left'));
    		var navWidth=document.body.offsetWidth;
    		$('.navtab ul li').each(function(){
    			temp=contentWidth;
	    		contentWidth+=$(this).width();	    		
	    	});
    		if(contentWidth>navWidth-158&&(navWidth-158)-(contentWidth+oParent)>0){
    			var offset=-1*oParent-(navWidth-158)+(contentWidth+oParent)+16;
    			$('.navtab ul').css('left',-1*offset+'px');
    		}    		
    	}
	    function moveToNextTabItem(){
	    	var temp=0,contentWidth=0;
	    	var oParent=parseInt($('.navtab ul').css('left'));
	    	$('.navtab ul li').each(function(){
	    		temp=contentWidth;
	    		contentWidth+=$(this).width();
	    		if(contentWidth>document.body.offsetWidth-158-oParent){
	    			var offset=(document.body.offsetWidth-158-contentWidth)-16;	    		
	    			$('.navtab ul').css('left',offset+"px");
	    			return false;
	    		}	    			    		    		
	    	});
	    }
	    function moveToPrevTabItem(){
	    	var temp=0,contentWidth=0;
	    	var oParent=parseInt($('.navtab ul').css('left'));
	    	$('.navtab ul li').each(function(){
	    		temp=contentWidth;
	    		contentWidth+=$(this).width();
	    		if(contentWidth+16>=-1*oParent){
	    			$('.navtab ul').css('left',-1*(temp-16)+"px");
	    			return false;
	    		}  			    		    		
	    	});
	    }
	    //tab end
	    
	    //用户信息 start
	    $('.forAdmin li.set a').on('click',function(){
	    	addTabItems($(this).parent('li'));
	    });
	    $('.header1 div').hover(function(){
	    	if($(this).get(0).className=='admin'){
	    		$('.forAdmin').css('display','block');
	    		$(this).find('span.ico').css('background-position-x','-55px');
	    	}
	    },function(){
	    	if($(this).get(0).className=='admin'){
	    		clearTimeout(timer);
	    		$(this).find('span.ico').css('background-position-x','-26px');
	    		timer=setTimeout(function(){
	    			$('.forAdmin').css('display','none');	    			
	    		},100);
	    	}
	    });
	    $(".forAdmin").hover(function(){
	    	clearTimeout(timer);
	    	$(this).css('display','block');
	    },function(){
	    	timer=setTimeout(function(){
	    		$(this).css('display','none');
	    	},500);
	    });	    
	    $('.forAdmin a').hover(function(){
	    	$(this).css('color','#ef6d44');
	    	$(this).find('i').css('background-position-x','0px');
	    },function(){
	    	$(this).css('color','#c7c9d3');
	    	$(this).find('i').css('background-position-x','-17px');
	    });
	    //用户信息 end
	   
	    
	    
	});
});