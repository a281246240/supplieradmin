require([ 'jquery','common', 'validate','timepicker', 'pagination', 'bootstrap', 'dateZh' ], function($,common,validate,timepicker) {
	var addNewsForm = $('#addNewsForm');
	var updateNewsForm = $('#updateNewsForm');
	$('title').text('后台模块管理');

	
	var totalPages = 0;
	var pageSize = '10';
	var first_load = true;
	var reload = true;

	$(document).ready(function() {
		showOperationByPage(1);
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
			}).blur(
				function() {
					var input = $(this);
					if (input.val() == ''
							|| input.val() == input.attr('placeholder')) {
						input.addClass('placeholder');
						input.val(input.attr('placeholder'));
					}
				}).blur();
		}
		;
	});
	function placeholderSupport() {
		return 'placeholder' in document.createElement('input');
	}
	//placeholder兼容ie end

	//清除按钮
	$('.clearBtn').on('click', function() {
		$('.setTableLength').val(10);
		$("#name_input").val('');
		$("select[name='type_input']").val('');
		$("select[name='ispage_input']").val('');
		$("select[name='value_input']").val('');
	});


	$(".setTableLength").change(function() {
		reload = true;
		showOperationByPage(1);
	});

	$(".searchBtn").click(function() {
		reload = true;
		showOperationByPage(1);
	});
	
	/** 列表查询start **/
	function showOperationByPage(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		$("#dataBody").append(loadingHtml);
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	} 
		$.getJSON(ctx + '/staffoperation/showstaffoperationbypage', {	
				pageNum : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				name_input:$("#name_input").val(),
				type_input:$("select[name='type_input']").val(),
				ispage_input:$("select[name='ispage_input']").val(),
				value_input:$("select[name='value_input']").val(),
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
//                    1.查询，2.添加，4.修改，8.删除
//                    var value = ["","查询","添加","","修改","","","","删除"];
//                    分组1，模块2，操作4
                    var type = ["","分组","模块","","操作"];
                    for(var i=0;i<datalist.length;i++){   
                    	var newsList = datalist[i];
                    	var no = (pageNum-1)*pageSize+i+1;
                    	var valuelist = newsList.value;
                    	if(valuelist==null){
                    		valuelist=0;
                    	}
                    	
                    	tempHtml +="<tr data-id='"+newsList.id+"' data-pageno='" + pageNum + "'>";
                    	
                    	tempHtml +="<td><div class='checkbox'><label><input type='checkbox' name='itemCheck' value="+newsList.id+" /></label></div></td>";
                    	tempHtml +="<td class='excel'>"+isnull(newsList.name)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(type[newsList.type])+"</td>";
                    	if(newsList.ispage==1){
                    		tempHtml +="<td class='excel'>显示</td>";
                		}else{
                			tempHtml +="<td class='excel'>不显示</td>";
                		}
                    	tempHtml +="<td class='excel'>"+isnull(newsList.uri)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(newsList.parameter)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(newsList.classname)+"</td>";
                    	if(newsList.value == 1){
                    		tempHtml +="<td class='excel'>拦截</td>";
                		}else if(newsList.value == 2){
                			tempHtml +="<td class='excel'>不拦截</td>";
                		}else{
                			tempHtml +="<td class='excel'>--</td>";
                		}
                    	tempHtml +="<td class='excel'>"+isnull(newsList.description)+"</td>";
                    	
                    	tempHtml +="<td>";
                    		tempHtml +="<button type='button' data-id="+newsList.id+" data-target='.modal-deleteNews' id='delete-btn' class='btn btn-danger btn-xs'>删除</button>&nbsp";
                    		tempHtml +="<button type='button' data-toggle='modal' data-target='.modal-edit' onclick='updateModule(" +newsList.id+")' class='btn btn-warning btn-xs'>编辑</button>&nbsp";
                    		if(newsList.type==1){
                    			tempHtml +="<button type='button' data-toggle='modal' data-target='.modal-add' onclick='addModule(" +newsList.id+")' class='btn btn-info btn-xs'>添加模块</button>&nbsp";
                    		}else if(newsList.type==2){
                    			tempHtml +="<button type='button' data-toggle='modal' data-target='.modal-add' onclick='addOperation(" +newsList.id+")' class='btn btn-primary btn-xs'>添加操作</button>&nbsp";
                    		}
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
		showOperationByPage(pageNum);
	}
	/** 列表查询end **/
	
	
	/** 添加验证start **/
	$('#addNewsForm').validate({
        rules: {
            'name': {
                required: true 
            },
            /*'uri': {
                required: true 
            },
            'parameter':{ 
            	required:true
            },
            'classname':{ 
            	required:true
            },
            'description':{ 
            	required:true
            }*/
        },
        messages: {
        	'name': {
                required: "请填写模块名称 "
            },
            /*'uri': {
                required: "请填写模块uri"
            },
            'parameter':{ 
            	required: "请填写参数名"
            },
            'classname':{ 
            	required: "请填写类名"
            },*/
//            'description':{ 
//            	required: "请填写模块权限描述"
//            }
        	
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
	
	/**添加分组前初始化*/
	$('#addgroup').click(function(){
		$('#addDiv').html('');
		$("#addNewsForm").find("input[name='parentid']").val(-1);
		$("#addNewsForm").find("input[name='type']").val(1);
	    $("#addNewsForm").find("input[name='name']").val('');
	    $("#addNewsForm").find("input[name='ispage']").val(1);
	    $("#addNewsForm").find("input[name='uri']").val('');
		$("#addNewsForm").find("input[name='parameter']").val('');
		$("#addNewsForm").find("input[name='classname']").val('');
		$("#addNewsForm").find("input[name='description']").val('');
	});
	
	/*添加start **/
	$('#btn_addnews').click(function(e) {
		
    	var isValid = addNewsForm.valid();
        if (isValid) {
        	 $.post(ctx+"/staffoperation/addstaffoperation",$('#addNewsForm').serialize(),function (data) {
        		
        		var result = data.result;
 				if(result!=null && result=="noauthority") {
 					common.alert1('你无此权限!');
 					return;
 				}
        		if(data.result!=null && data.result=="againLogin") {
            		$('.commonConfirm').modal('hide');
            		common.alert1("登录过期，请重新登录");
 					setTimeout("location.href = ctx + '/login.html'",1000);
               	}else if(data.message == "name exist"){
                	common.alert1("已存在同名模块,请重新命名");
                }else if(data.result=='success'){
               		$('.modal-add').modal('hide');
         	        common.mySuccessModal2('添加成功!');
     	        	showOperationByPage(1);
     	        	
         	        $("#addNewsForm").find("input[name='parentid']").val(-1);
            		$("#addNewsForm").find("input[name='type']").val(1);
         	        $("#addNewsForm").find("input[name='name']").val('');
         	        $("#addNewsForm").find("input[name='ispage']").val(1);
         			$("#addNewsForm").find("input[name='uri']").val('');
         			$("#addNewsForm").find("input[name='parameter']").val('');
         			$("#addNewsForm").find("input[name='classname']").val('');
         			$("#addNewsForm").find("input[name='description']").val('');
         			$('#addDiv').html('');
             	}else if(data.result=='fail'){
             		$(".errorMsg").html(data.message);
             	}else{
             		$(".errorMsg").html("信息提交错误");
             	}
             },"json"); 
        }  
	});
	/** 添加end **/
	
	/**删除start */
	$(document).on('click', '#delete-btn', function(){
		var varId = $(this).data("id");
		
		$('.commonConfirm').modal('show');				
		common.commonConfirm("删除", "是否删除，若该模块下面有子模块将一并删除", "",
			function() {
				$.post(ctx+"/staffoperation/deletebyid", {
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
		            	 $(".commonConfirm").modal('hide');
		     	         common.mySuccessModal2('删除成功!');
		     	         showOperationByPage(1);
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
			common.commonConfirm("删除", "确定删除", "这"+count+"个模块吗,若模块下有子模块将一并删除",
				function() {
	            	 $.post(ctx+"/staffoperation/deletebyids", {ids:ids},
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
	    		     	        showOperationByPage(1);
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
	            'name': {
	                required: true 
	            },
//	            'uri': {
//	                required: true 
//	            },
//	            'parameter':{ 
//	            	required:true
//	            },
//	            'classname':{ 
//	            	required:true
//	            },
//	            'description':{ 
//	            	required:true
//	            }
	        },
	        messages: {
	        	'name': {
	                required: "请填写模块名称 "
	            },
//	            'uri': {
//	                required: "请填写模块uri"
//	            },
//	            'parameter':{ 
//	            	required: "请填写参数名"
//	            },
//	            'classname':{ 
//	            	required: "请填写类名"
//	            },
//	            'description':{ 
//	            	required: "请填写模块权限描述"
//	            }
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
		$("#btn_updateNews").click(function() {
	    	var isValid = updateNewsForm.valid();
	        if (isValid) { 	
	        	 $.post(ctx+"/staffoperation/updatestaffoperation", $('#updateNewsForm').serialize(),function (data) {
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
	             		 $(".modal-edit").modal('hide');
	         	         common.mySuccessModal2(data.message);
	         	         showOperationByPage(1);
	             	}else{
	             		$(".updateMsg").html(data.message);
	             	}
	             },"json"); 
	        }  
		});
	/** 修改end **/
		
	function getTime(timeValue) {
		if(timeValue!=null && timeValue!="") {
			return common.getFormatDateByLong(timeValue);
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
function updateModule(id) {
	$(".updateMsg").html("");
	$.getJSON(ctx + '/staffoperation/querybyid', {
		id : id
	}, function(data) {
			var result = data.result;
			if(result!=null && result=="noauthority") {
				alert('你无此权限!');
				return;
			}
			$("#updateNewsForm").find("input[name='id']").val(data.id);
			$("#updateNewsForm").find("input[name='name']").val(data.name);
			$("#updateNewsForm").find("select[name='ispage']").val(data.ispage);
			$("#updateNewsForm").find("input[name='uri']").val(data.uri);
			$("#updateNewsForm").find("input[name='parameter']").val(data.parameter);
			$("#updateNewsForm").find("input[name='classname']").val(data.classname);
			$("#updateNewsForm").find("input[name='description']").val(data.description);
			if(data.type == 4){
				var tempHtml = "";
				tempHtml +="<label class='col-sm-41 control-label'>模块权限：</label><div class='col-sm-81'>" ;
				tempHtml +="<select name='value' >" ;
				if(data.value == 1){
					tempHtml +="<option value='1' selected='selected'>拦截</option>"; 
					tempHtml +="<option value='2'>不拦截</option>"; 
				}else{
					tempHtml +="<option value='1' >拦截</option>"; 
					tempHtml +="<option value='2' selected='selected'>不拦截</option>"; 
				}
				tempHtml +="</select></div>";
				$('#updateDiv').html(tempHtml);
			}else{
				$('#updateDiv').html('');
			}
	});
}

/*添加模块*/
function addModule(id) {
	$('#addDiv').html('');
	$("#addNewsForm").find("input[name='name']").val('');
    $("#addNewsForm").find("input[name='ispage']").val(1);
	$("#addNewsForm").find("input[name='uri']").val('');
	$("#addNewsForm").find("input[name='parameter']").val('');
	$("#addNewsForm").find("input[name='classname']").val('');
	$("#addNewsForm").find("input[name='description']").val('');
	
	$(".updateMsg").html("");
	$("#addNewsForm").find("input[name='parentid']").val(id);
	$("#addNewsForm").find("input[name='type']").val(2);
}

/*添加操作*/
function addOperation(id) {
	$(".updateMsg").html("");
	$("#addNewsForm").find("input[name='parentid']").val(id);
	$("#addNewsForm").find("input[name='type']").val(4);
	
	var tempHtml="";
  	tempHtml +="<label class='col-sm-41 control-label'>模块权限：</label><div class='col-sm-81'>" +
	  			"<select name='value' >" +
		  			"<option value='1'>拦截</option>" +
		  			"<option value='2'>不拦截</option>" +
	  			"</select></div>";
	$('#addDiv').html(tempHtml);
}
	



