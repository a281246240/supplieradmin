require([ 'jquery', 'app', 'common', 'validate', 'pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common,validate) {

	var totalPages = 0;
	var pageSize = '10';
	var first_load = true;
	var reload = true;
	$('title').text('系统参数管理');
	$(document).ready(function() {
		showSysparamByPage(1);
	});

	var addSysparamForm = $('#addSysparamForm');
	var updateSysparamForm = $('#updateSysparamForm');
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
		$('.setTableLength').val(10);
		$("#date-start").val('');
		$("#date-end").val('');
		
		$("input[name='key']").val('');
		$("input[name='showname']").val('');
		$("input[name='description']").val('');
	});
	

	$(".setTableLength").change(function() {
		reload = true;
		showSysparamByPage(1);
	});

	$(".searchBtn").click(function() {
		reload = true;
		showSysparamByPage(1);
	});
	
	/** 列表查询start **/
	function showSysparamByPage(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		$("#dataBody").append(loadingHtml);
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	} 
		$.getJSON(ctx + '/sysparam/getList', {	
				pageNo : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				
				key : $("input[name=key]").val(),
				showname : $("input[name=showname]").val(),
				description : $("input[name=description]").val()
			},
			function(data){  
				if($('.loading')){
					$('.loading').remove();
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
                    	var record = datalist[i];
                    	var no = (pageNum-1)*pageSize+i+1;
                    	
                    	tempHtml +="<tr data-id='"+record.id+"' data-pageno='" + pageNum + "'>";
                    	tempHtml +="<td><div class='checkbox'><label><input type='checkbox' data-id="+record.id+" /></label></div></td>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.key)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.value)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.showname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.description)+"</td>";
                    	
                    	tempHtml +="<td><button type='button' data-toggle='modal' data-target='.modal-edit' onclick='updatesysparam("+record.id+")' class='btn btn-warning btn-xs'\">编辑</button>&nbsp;</td>";
                    	
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

	/** 添加验证start **/
	$('#addSysparamForm').validate({
        rules: {
            'key': {
                required: true 
            },
            'value': {
                required: true,
                number: true
            },
            'showname':{ 
            	required: true
            }
        },
        messages: {
        	'key': {
     		    required: "请填写字段名" 
     		 },
     		'value': {
     		    required: "请填写参数值",
     		    number: "请输入有效的数字"
     		 },
     		 'showname': { 
     			required: "请填写参数名"
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
	
	/** 清空添加数据 start **/
	 $('.add').click(function(e) {
		 $(".errorMsg").html("");
		 $("#addSysparamForm").find("input[name='key']").val('');
		 $("#addSysparamForm").find("input[name='value']").val('');
		 $("#addSysparamForm").find("select[name='showname']").val('');
		 $("#addSysparamForm").find("input[name='description']").val('');
	 })
	 /** 清空添加数据 end **/
	
	/*添加start **/
	$('#btn_addsysparam').click(function(e) {
    	var isValid = addSysparamForm.valid();
        if (isValid) {
        	 $.post(ctx+"/sysparam/add", $('#addSysparamForm').serialize(),function (data) {
        		if(data.result!=null && data.result=="againLogin") {
            		$('.commonConfirm').modal('hide');
            		common.alert1("登录过期，请重新登录");
 					setTimeout("location.href = ctx + '/login.html'",1000);
               	}else if(data.result=='success'){
               		$('.modal-add').modal('hide');
             		$('.mySuccessModal1').modal({show:true,backdrop: 'static', keyboard: false});
         	        common.mySuccessModal1('添加成功!','如需继续添加，请点击返回继续添加', 
         	        		'返回继续添加','前往后台用户列表',
     	        		function () {
     	        			$('.mySuccessModal1').modal('hide');  
     	        			$('.modal-add').modal('hide');  
     	        			showStaffByPage(1);
     	        		},
     	        		function () {
     	        			$('.modal-add').modal('show');
     	        		});
         	         $("#addSysparamForm").find("input[name='key']").val('');
         			 $("#addSysparamForm").find("input[name='value']").val('');
         			 $("#addSysparamForm").find("select[name='showname']").val('');
         			 $("#addSysparamForm").find("input[name='description']").val('');
             	}else if(data.result=='fail'){
             		$(".errorMsg").html(data.message);
             	}else{
             		$(".errorMsg").html("信息提交错误");
             	}
             },"json"); 
        }  
	});
	/** 添加end **/
	 
	 /** 修改验证start **/
	 $('#updateSysparamForm').validate({
         rules: {
        	 'key': {
                 required: true 
             },
             'value': {
                 required: true,
                 number: true
             },
             'showname':{ 
             	required: true
             }
         },
         messages: {
        	 'key': {
      		    required: "请填写字段名" 
      		 },
      		'value': {
      		    required: "请填写参数值",
      		    number: "请输入有效的数字"
      		 },
      		 'showname': { 
      			required: "请填写参数名"
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
	$("#btn_updatesysparam").click(function() {
	 	var isValid = updateSysparamForm.valid();
	    if (isValid) { 	
	     	 $.post(ctx+"/sysparam/update", $('#updateSysparamForm').serialize(),function (data) {
	     		 if(data.result!=null && data.result=="againLogin") {
	    			 $('.commonConfirm').modal('hide');
	    			 common.alert1("登录过期，请重新登录");;
					 setTimeout("location.href = ctx + '/login.html'",1000);
	             }else if(data.result=='success'){ 
	          		 $(".modal-edit").modal('hide');
	      	         common.mySuccessModal2('修改成功!');
	      	         showSysparamByPage(1);
	          	 }else{
	          		$(".updateMsg").html(data.message);
	          	 }
	          },"json"); 
	    }  
	});
	/** 修改end **/
	/** 删除start **/
	$(".delete-batch").click(function(){
		//待删除id字符串
		var ids = "";
		$('input[type=checkbox]:checked').each(function(index){
			ids = ids + $(this).data("id") + ","; 
		});
		console.log("ids = "+ids);
		$.getJSON(ctx+"/sysparam/batchdelete",{ids:ids},function(data){
			if(data.result=='success'){
				showSysparamByPage(1);
			}
		});
	});
	/** 删除end **/

	function pageselectCallback(page_index, jq) {
		if (first_load) { //第一次初始化不需要请求
			first_load = false;
			return false;
		}
		pageNum = page_index + 1;
		showSysparamByPage(pageNum);
	}
	/** 列表查询end **/
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

function updatesysparam(id) {
	$(".updateMsg").html("");
	$.getJSON(ctx + '/sysparam/querybyid', {
		id : id
	}, function(data) {
		/*$("#updateSysparamForm").find("input[name='id']").val('');
		$("#updateSysparamForm").find("input[name='key']").val('');
		$("#updateSysparamForm").find("input[name='value']").val('');
		$("#updateSysparamForm").find("input[name='showname']").val('');
		$("#updateSysparamForm").find("input[name='description']").val('');*/
		
		$("#updateSysparamForm").find("input[name='id']").val(data.id);
		$("#updateSysparamForm").find("input[name='key']").val(data.key);
		$("#updateSysparamForm").find("input[name='value']").val(data.value);
		$("#updateSysparamForm").find("input[name='showname']").val(data.showname);
		$("#updateSysparamForm").find("input[name='description']").val(data.description);
	});
}