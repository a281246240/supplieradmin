require([ 'jquery','common','validate', 'pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($,common,validate) {

	var addRoleForm = $('#addRoleForm');
	var status = ['停用','启用'];
	$('title').text('官网权限设置');

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
		getRoleByPage(1);
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
					if (input.val() == '' || input.val() == input.attr('placeholder')) {
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
	
	
	$(".setTableLength").change(function() {
		reload = true;
		getRoleByPage(1);
	});

	$(".searchBtn").click(function() {
		reload = true;
		getRoleByPage(1);
	});
	
	$('.clearBtn').on('click', function() {
		$("input[name='loginname-query']").val('');
		$("select[name='status-query']").val('');
		$("#date-start").val('');
		$("#date-end").val('');
		$("input[name='vipname-nickName']").val('');
		$("select[name='status-query']").val('');
		$("select[name='viprole-query']").val('');
	});
	
	//添加后台用户角色校验
	$('#addRoleForm').validate({
        rules: {
            'name': {
                required: true 
            },
            'value': {
                required: true,
                digits:true
            }
        },
        messages: {
        	'name': {
     		    required: "请填写角色名称" 
     		 },
     		'value': {
     		    required: "请填写角色值",
     		    digits:"请填写正整数"
     		 }
        },
        errorClass: "error",
		success: 'valid',
		unhighlight: function(element, errorClass, validClass) {//验证通过
			$(element).tooltip('destroy').removeClass(errorClass);
		}, 
		errorPlacement: function(label, element) {
			$(element).tooltip('destroy'); /*必需*/
			$(element).attr('title', $(label).text()).tooltip('show');
		},
        onclick: true 
    });
	
	//添加后台用户角色
	$("#btn_addrole").click(function(e){
		var isValid = addRoleForm.valid();
		var url;
		var queryType = $("#queryType").val();
        if (isValid) {
        	if(queryType=="gw"){
    			url = ctx + '/privilege/addgwRole';
    		}else if(queryType=="ht"){
    			url = ctx + '/privilege/addhtRole';
    		}
        	 $.post(url, $('#addRoleForm').serialize(),function (data) {
         		if(data.result!=null && data.result=="againLogin"){
	         		$('.commonConfirm').modal('hide');
	         		common.alert1("登录过期，请重新登录");
					setTimeout("location.href = ctx + '/login.html'",1000);
            	}else if(data.result=='success'){
            		$('.modal-staff').modal('hide');
	          		$('.mySuccessModal1').modal({show:true,backdrop: 'static', keyboard: false});
	      	        common.mySuccessModal1('添加成功!','如需继续添加，请点击返回继续添加','返回继续添加','前往后台用户列表',
  	        		function () {
  	        			$('.mySuccessModal1').modal('hide');  
  	        			$('.modal-add').modal('hide');  
  	        			getRoleByPage(1);
  	        		},
  	        		function () {
  	        			$('.modal-staff').modal('show');
  	        		});
	      	        
	      	        $("#addRoleForm").find("input[name='name']").val('');
	      			$("#addRoleForm").find("input[name='value']").val('');
	      			$("#addRoleForm").find("input[name='description']").val('');
              	}else if(data.result=='fail'){
              		$(".errorMsg").html(data.message);
              	}else{
              		$(".errorMsg").html("信息提交错误");
              	}
              },"json"); 
        	
        }
	});
	
	//加载后台用户角色
	function getRoleByPage(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		$("#dataBody").append(loadingHtml);
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	}
		var url;
		var queryType = $("#queryType").val();
		if(queryType=="gw"){
			url = ctx + '/privilege/gwviprole';
			addhtml = "<td><a href='#!/gwqxsz'><button type=\"button\" class=\"btn btn-info\">设置权限</button></a></td>";
		}else if(queryType=="ht"){
			url = ctx + '/privilege/htstaffrole';
			addhtml = "<td><a href='#!/htqxgl'><button type=\"button\" class=\"btn btn-info\">设置权限</button></a></td>";
		}
		
		$.getJSON(url, {pageNum : pageNum,pageSize : $('.setTableLength').val() || 10},
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
                    var currentuserid = $('#userid').val(); 
                    var currentUtype = $('#currentUtype').val(); 
                    for(var i=0;i<datalist.length;i++){   
                    	var role = datalist[i];
                    	var no = (pageNum-1)*pageSize+i+1;
                    	
                    	tempHtml +="<tr data-id='"+role.id+"' data-pageno='" + pageNum + "'>";
//                    	tempHtml +="<td><div class='checkbox'><label><input type='checkbox' data-roleid="+role.id+" /></label></div></td>";
                    	tempHtml +="<td class='excel'>"+role.name+"</td>";
                    	tempHtml +="<td class='excel'>"+role.value+"</td>";
                    	tempHtml +="<td class='excel'>"+role.description+"</td>";
                    	var addhtml;
                    	if(queryType=="gw"){
                			addhtml = "<td><a href='#!/gwqxsz?rolevalue="+role.value+"&rolename="+role.name+"'><button type=\"button\" class=\"btn btn-info btn-xs\">设置权限</button></a></td>";
                		}else if(queryType=="ht"){
                			addhtml = "<td><a href='#!/htqxgl?rolevalue="+role.value+"&rolename="+role.name+"'><button type=\"button\" class=\"btn btn-info btn-xs\">设置权限</button></a></td>";
                		}
                    	tempHtml += addhtml;
                    	
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
			}).fail(function (err){ 
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
		showcashapplyQuotaApplyByPage(pageNum);
	}
	
});
$(function () {
	$('#myTab li:eq(1) a').tab('show');
});