require([ 'jquery', 'common', 'validate','timepicker', 'pagination', 'bootstrap', 'dateZh' ], function($, common,validate,timepicker) {
	
	
	var addNewsForm = $('#addNewsForm');
	var updateNewsForm = $('#updateNewsForm');
	$('title').text('新闻管理');
	
	var state=['否','是'];
	var type=['','集团新闻','行业新闻','营销活动','快运新闻','会员新闻','市场新闻'];
	
	//日期控件
	$('#date-start, #date-end').datetimepicker({
		format : "yyyy-mm-dd hh:ii:ss",
		language : "zh-CN",
		todayBtn : 1,
		autoclose : true,
		todayHighlight : true,
		forceParse : true,
		minuteStep : 10
	});

	var totalPages = 0;
	var pageSize = '10';
	var first_load = true;
	var reload = true;

	$(document).ready(function() {
		showNewsByPage(1);
	});

	//placeholder兼容ie start
	$(function() {
		if (!placeholderSupport()) { // 判断浏览器是否支持 placeholder
			$('[placeholder]').focus(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
					input.removeClass('placeholder');
				}
			}).blur(function() {
				var input = $(this);
				if (input.val() == ''
						|| input.val() == input.attr('placeholder')) {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));
				}
			}).blur();
		};
	});
	function placeholderSupport() {
		return 'placeholder' in document.createElement('input');
	}
	//placeholder兼容ie end

	//清除按钮
	$('.clearBtn').on('click', function() {
		$("input[id='title']").val('');
		$("input[id='creatorname']").val('');
		$("select[name='type']").val('');
		$('.setTableLength').val(10);
		$("#date-start").val('');
		$("#date-end").val('');
	});
	
	$(".setTableLength").change(function() {
		reload = true;
		showNewsByPage(1);
	});

	$(".searchBtn").click(function() {
		reload = true;
		showNewsByPage(1);
	});
	
	/** 列表查询start **/
	function showNewsByPage(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		$("#dataBody").append(loadingHtml);
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	} 
		$.getJSON(ctx + '/news/shownewsbypage', {	
				pageNum : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				
				title : $("#title").val(),
				creatorname : $("#creatorname").val(),
				type : $("select[name='type']").val(),
				startTime : $("#date-start").val(),
				endTime : $("#date-end").val(),	
			},
			function(data){  
				if($('.loading')){
					$('.loading').remove();
				}
				
				var result = data.result;
				if(result!=null && result=="noauthority") {
					common.alert1('你无此权限!');
					return;
				}
				if(data.result!=null && data.result=="againLogin") {
					common.alert1("登录过期，请重新登录");
					setTimeout("location.href = ctx + '/login.html'",1000);
       			} else if(data.result.length == 0) { 
					$('.table-responsive').append('<div class="alert alert-warning no-result text-center" role="alert">没有找到记录 </div>');
                } else{
       				var datapage = data.result;
					var datalist = datapage.result;
					var totalCount = datapage.totalCount;
					var pageNum = datapage.pageNo;
					var pageSize = datapage.pageSize;
					var totalPages = datapage.totalPages;
					$(".totalCount").html(totalCount);
					$(".totalPages").html(totalPages);
					$(".pageNo").html(pageNum);
                    var tempHtml="";   
                    for(var i=0;i<datalist.length;i++){   
                    	var newsList = datalist[i];
                    	var no = (pageNum-1)*pageSize+i+1;
                    	
                    	tempHtml +="<tr data-id='"+newsList.id+"' data-pageno='" + pageNum + "'>";
                    	tempHtml +="<td><div class='checkbox'><label><input type='checkbox' data-roleid="+newsList.id+" name='itemCheck' value="+newsList.id+" /></label></div></td>";
                    	tempHtml +="<td style='text-align:left;'>"+isnull(newsList.title)+"</td>";
                    	tempHtml +="<td>"+isnull(type[newsList.type])+"</td>";
                    	tempHtml +="<td>"+isnull(state[newsList.state])+"</td>";
                    	tempHtml +="<td>"+isnull(newsList.creatorname)+"</td>";
                    	tempHtml +="<td>"+getTime(newsList.createtime)+"</td>";
                    	tempHtml +="<td>"+isnull(newsList.source)+"</td>";
                    	tempHtml +="<td>"+isnull(newsList.updatename)+"</td>";
                    	tempHtml +="<td>"+isnull(newsList.updatetime)+"</td>";
                    	
                    	tempHtml +="<td>";
//                    		tempHtml +="<button type='button' data-toggle='modal' data-target='.modal-deleteNews' onclick='deleteNews(" +newsList.id+")' class='btn btn-warning btn-xs'>删除</button>&nbsp";
                    		tempHtml +="<button type='button' data-toggle='modal' data-target='.modal-editNews' onclick='updateNews(" +newsList.id+")' class='btn btn-warning btn-xs'>编辑</button>&nbsp";
                    		tempHtml +="<button type='button' data-id="+newsList.id+" class='btn btn-danger btn-xs delete-btn'>删除</button>&nbsp;";
                    	tempHtml +="</td>";
                    	
                    	tempHtml +="</tr>";
                    	if($('.alert-warning').length>0){
                    		$('.alert-warning').remove();
                    	}
                    }   
                    if(datalist.length === 0&&$('.alert-warning').length<=0) { 
						$('.table-responsive').append('<div class="alert alert-warning no-result text-center" role="alert">没有找到记录 </div>');
	                } 
                    $('#dataBody').html(tempHtml);
                   
                    if (reload) {
                    	reload = false;
                    	first_load = true;
    					var initPagination = function() {
    						$("#Pagination").pagination(totalCount, {
    							num_edge_entries : 1, // 边缘页数
    							num_display_entries : 4, // 主体页数
    							callback: pageselectCallback,
    							prev_text : "«",
    							next_text : "»",
    							items_per_page : pageSize, 
    							link_to : 'javascript:void(0);'
    						});
    					}();
    					/**分页e**/
                    }
				} 
			}).fail(function (err) { 
				if($('.loading')){
					$('.loading').remove();
				}
				common.alert('服务器错误！请刷新页面重试或联系管理员',"确定"); 
            });  
	}

	function pageselectCallback(page_index, jq) {
		if (first_load) { //第一次初始化不需要请求
			first_load = false;
			return false;
		}
		pageNum = page_index + 1;
		showNewsByPage(pageNum);
	}
	/** 列表查询end **/
	
	
	/** 添加验证start **/
	$('#addNewsForm').validate({
        rules: {
            'title': {
                required: true 
            },
            'summary': {
                required: true 
            },
            'content': {
                required: true 
            },
            'source':{ 
            	required:true
            },
            'fileImg':{ 
            	required:true
            }
        },
        messages: {
        	'title': {
     		    required: "请填写新闻标题" 
     		 },
     		'summary': {
                required: "请填写新闻概要" 
            },
     		'content': {
     		    required: "请填写新闻内容" 
     		 },
     		 'source': {
     			required: "请填写新闻来源" 
     		 },
     		'fileImg':{ 
            	required:"请导入新闻标题图标"
            }
        },
        errorClass: "error",
		success: 'valid',
		unhighlight: function(element, errorClass, validClass) { //验证通过
			$(element).tooltip('destroy').removeClass(errorClass);
		}, 
		errorPlacement: function(label, element) {
			$(element).tooltip('destroy'); /*必需*/
			$(element).attr('title', $(label).text()).tooltip('show');
		},
        onclick: true 
    });
	/** 添加验证end **/
	
	/*添加start
	$('#btn_addnews').click(function(e) {
    	var isValid = addNewsForm.valid();
    	alert();
        if (isValid) {
        	 $.post(ctx+"/news/addnews",$('#addNewsForm').serialize(),function (data) {
        		if(data.result!=null && data.result=="againLogin") {
            		$('.commonConfirm').modal('hide');
            		common.alert1("登录过期，请重新登录");
 					setTimeout("location.href = ctx + '/login.html'",1000);
               	}else if(data.result=='success'){
               		$('.modal-user').modal('hide');
             		$('.mySuccessModal1').modal({show:true,backdrop: 'static', keyboard: false});
         	        common.mySuccessModal1('添加成功!','如需继续添加，请点击继续添加', 
         	        		'继续添加','返回新闻列表',
     	        		function () {
     	        			$('.mySuccessModal1').modal('hide');  
     	        			$('.modal-addNews').modal('hide');  
     	        			showNewsByPage(1);
     	        		},
     	        		function () {
     	        			$('.mySuccessModal1').modal('hide');  
     	        		});
         	        $("#addNewsForm").find("input[name='title']").val('');
         			$("#addNewsForm").find("input[name='content']").val('');
         			$("#addNewsForm").find("input[name='source']").val('');
         			editor.setContent('');
             	}else if(data.result=='fail'){
             		$(".errorMsg").html(data.message);
             	}else{
             		$(".errorMsg").html("信息提交错误");
             	}
             },"json"); 
        }  
	}); **/
	/** 添加end **/
	
	/**删除start */
	$(document).on('click', '.delete-btn', function(){
		var varId = $(this).data("id");
		
		$('.commonConfirm').modal('show');				
		common.commonConfirm("删除", "确定删除", "",
			function() {
            	 $.post(ctx+"/news/deletebyid", {
    				 id:varId
    			 },function (data) {
    				 
    				 var result = data.result;
					 if(result!=null && result=="noauthority") {
						 common.alert1('你无此权限!');
						 return;
					 }
    	    		 if(data.result!=null && data.result=="againLogin") {
    	    			 $('.commonConfirm').modal('hide');
    	    			 common.alert1("登录过期，请重新登录");
    					 setTimeout("location.href = ctx + '/login.html'",1000);
    	             }else if(data.result=='success'){ 
    	            	 $('.commonConfirm').modal('hide');
    	     	         common.mySuccessModal2('删除成功!');
    	     	       
    	     	         showNewsByPage(1);
    	         	}else{
    	         		$(".updateMsg").html(data.message);
    	         	}
    	         },"json"); 
			}
		);
	});
	/** 删除end **/
	
	
	/**删除多个s*/
	$('#deleteMany').click(function(e) {
		var ids = "";
		var count = 0;
		var checks = document.getElementsByName("itemCheck");
		console.log(checks);
		for(var i=0;i<checks.length;i++){
			if(checks[i].checked){
				count++;
				ids += checks[i].value + ",";
			}
		}
		if(count<1){
			common.alert1("请至少选择一个");
		}else{
			$('.commonConfirm').modal('show');
			common.commonConfirm("删除", "确定删除", "这"+count+"条新闻",
				function() {
	            	 $.post(ctx+"/news/deletebyids", {ids:ids},
	            		function (data) {
	            		 
	            		 	var result = data.result;
		     				if(result!=null && result=="noauthority") {
		     					common.alert1('你无此权限!');
		     					return;
		     				}
	    		    		 if(data.result!=null && data.result=="againLogin") {
	    		    			 $('.commonConfirm').modal('hide');
	    		    			 common.alert1("登录过期，请重新登录");
	    						 setTimeout("location.href = ctx + '/login.html'",1000);
	    		             }else if(data.result=='success'){ 
	    		         		 $(".commonConfirm").modal('hide');
	    		     	         common.mySuccessModal2('删除成功!');
	    		     	         showNewsByPage(1);
	    		         	}else{
	    		         		$(".updateMsg").html(data.message);
	    		         	}
	    		 },"json"); 
			});
		}
	});
	/**删除多个e*/
	

	 /** 修改验证start **/
	 $('#updateNewsForm').validate({
		 rules: {
	            'title': {
	                required: true 
	            },
	            'summary': {
	                required: true 
	            },
	            'content': {
	                required: true 
	            },
	            'source':{ 
	            	required:true
	            }
	        },
	        messages: {
	        	'title': {
	     		    required: "请填写新闻标题" 
	     		 },
	     		'summary': {
	                required: "请填写新闻概要" 
	            },
	     		'content': {
	     		    required: "请填写新闻内容" 
	     		 },
	     		 'source': {
	     			required: "请填写新闻来源" 
	     		 }
	        },
	        errorClass: "error",
			success: 'valid',
			unhighlight: function(element, errorClass, validClass) { //验证通过
				$(element).tooltip('destroy').removeClass(errorClass);
			}, 
			errorPlacement: function(label, element) {
				$(element).tooltip('destroy'); /*必需*/
				$(element).attr('title', $(label).text()).tooltip('show');
			},
	        onclick: true 
    });
	 /** 修改验证end **/
	 
	 /** 修改start **/
		/*$("#btn_updateNews").click(function() {
	    	var isValid = updateNewsForm.valid();
	        if (isValid) { 	
	        	 $.post(ctx+"/news/updateNews", $('#updateNewsForm').serialize(),function (data) {
	        		 if(data.result!=null && data.result=="againLogin") {
		    			 $('.commonConfirm').modal('hide');
		    			 common.alert1("登录过期，请重新登录");
						 setTimeout("location.href = ctx + '/login.html'",1000);
		             }else if(data.result=='success'){ 
	             		 $(".modal-editNews").modal('hide');
	         	         common.mySuccessModal2('修改成功!');
	         	         showNewsByPage(1);
	             	}else{
	             		$(".updateMsg").html(data.message);
	             	}
	             },"json"); 
	        }  
		});*/
	/** 修改end **/
	 
	function getTime(timeValue) {
		if(timeValue!=null && timeValue!="") {
			return common.getSmpFormatDate(timeValue);
		}else{
			return "--";
		}
	} 

	function isnull(value) {
		if (value == null || value == '' || typeof (value) == "undefined")
			return "--";
		else
			return value;
	}

	function isnumber(value) {
		if (value == null || value == '')
			return "0.00";
		else
			return value;
	}
	
	

	
});

/*修改*/
function updateNews(id) {
	$(".updateMsg").html("");
	$.getJSON(ctx + '/news/querybyid', {
		id : id
	}, function(data) {
			$("#updateNewsForm").find("input[name='id']").val(data.id);
			$("#updateNewsForm").find("input[name='title']").val(data.title);
			$("#updateNewsForm").find("input[name='summary']").val(data.summary);
			$("#myEditor2").text(data.content);
			$("#updateNewsForm").find("select[name='state']").val(data.state);
			$("#updateNewsForm").find("input[name='source']").val(data.source);
			$("#updateNewsForm").find("select[name='type']").val(data.type);
			$("#myImg").attr("src",ctx + data.titleimg);
			editor2.setContent(data.content);
			  
	});
}

/**file图片回显*/
function changImg(e){    
    for (var i = 0; i < e.target.files.length; i++) {    
        var file = e.target.files.item(i);    
        if (!(/^image\/.*$/i.test(file.type))) {    
            continue; //不是图片 就跳出这一次循环    
        }    
        //实例化FileReader API    
        var freader = new FileReader();    
        freader.readAsDataURL(file);    
        freader.onload = function(e) {    
            $("#myImg").attr("src",e.target.result);    
        }    
    }    
}


	



