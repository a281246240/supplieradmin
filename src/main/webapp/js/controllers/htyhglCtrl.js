require([ 'jquery', 'app', 'common', 'validate','pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common,validate) {

	var addStaffForm = $('#addStaffForm');
	var updateStaffForm = $('#updateStaffForm');
	var status = ['停用','<span style="color:green">启用</span>'];
	$('title').text('后台用户管理');

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
		showrolename();
		showStaffByPage(1);
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
	
	$(".setTableLength").change(function() {
		reload = true;
		showStaffByPage(1);
	});

	$(".searchBtn").click(function() {
		reload = true;
		showStaffByPage(1);
	});
	
	$('.clearBtn').on('click', function() {
		$("input[name='nickname-query']").val('');
		$("select[name='role-query']").val('');
		$("input[name='loginname-query']").val('');
		$("select[name='status-query']").val('');
		$("#date-start").val('');
		$("#date-end").val('');
	});
	
	$.validator.addMethod("isPhone", function(value, element) {
   	    var length = value.length;
   	    return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value))||/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(value);
   	 }, "手机、电话格式不正确");
	
	/** 添加验证start **/
	$('#addStaffForm').validate({
        rules: {
            'nickname': {
                required: true 
            },
            'role': {
            	required: true
      		 },
            'loginname': {
                required: true 
            },
            'phone':{ 
            	isPhone:true
            }
        },
        messages: {
        	'nickname': {
     		    required: "请填写姓名" 
     		 },
     		'role': {
      		    required: "请选择用户类型"
      		 },
     		'loginname': {
     		    required: "请填写登录帐号" 
     		 },
     		 'phone': { }
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
		 $("#addStaffForm").find("input[name='nickname']").val('');
		 $("#addStaffForm").find("input[name='loginname']").val('');
		 $("#addStaffForm").find("select[name='role']").val('');
		 $("#addStaffForm").find("input[name='phone']").val('');
	 })
	 /** 清空添加数据 end **/
	
	/*显示所有角色s*/
	function showrolename(){
		 $.post(ctx+"/staff/showrolename", {},function (data) {
			var result = data.result;
			if(result!=null && result=="noauthority") {
				common.alert1('你无此权限!');
				return;
			}
     		if(data.result!=null && data.result=="againLogin") {
         		$('.commonConfirm').modal('hide');
     			common.alert1("登录过期，请重新登录");
				setTimeout("location.href = ctx + '/login.html'",1000);
        	}else{
        		var datalist = data.result;
        		var tempHtml = "<option value=''>全部</option>";
        		for(var i=0;i<datalist.length;i++){   
                	var rolelist = datalist[i];
                	tempHtml += "<option value='"+rolelist.value+"'>"+rolelist.name+"</option>";
                }
      	        $("#addStaffForm").find("select[name='role']").append(tempHtml);
      	        $("#updateStaffForm").find("select[name='role']").append(tempHtml);
      	        $("select[name='role-query']").append(tempHtml);
          	}
          },"json");
	}
	/*显示所有角色e*/
	
	/*添加start **/
	$('#btn_addstaff').click(function(e) {
    	var isValid = addStaffForm.valid();
        if (isValid) {
        	 $.post(ctx+"/staff/savestaff", $('#addStaffForm').serialize(),function (data) {
        		 
        		var result = data.result;
				if(result!=null && result=="noauthority") {
					common.alert1('你无此权限!');
					return;
				}
        		if(result!=null && result=="againLogin") {
            		$('.commonConfirm').modal('hide');
            		common.alert1("登录过期，请重新登录");
 					setTimeout("location.href = ctx + '/login.html'",1000);
               	}else if(result=='success'){
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
         	        $("#addStaffForm").find("input[name='nickname']").val('');
         			$("#addStaffForm").find("input[name='loginname']").val('');
         			$("#addStaffForm").find("select[name='role']").val('');
         			$("#addStaffForm").find("input[name='phone']").val('');
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
	 $('#updateStaffForm').validate({
         rules: {
             'nickname': {
                 required: true
             },
             'role': {
                 required: true
             },
             'phone':{ 
             	isPhone:true
             }
         },
         messages: {
         	'nickname': {
      		    required: "请填写姓名"
      		 },
      		'role': {
      		    required: "请选择用户类型"
      		 },
      		 'phone': {
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
	$("#btn_updatestaff").click(function() {
	 	var isValid = updateStaffForm.valid();
	     if (isValid) { 	
	     	 $.post(ctx+"/staff/updatestaff", $('#updateStaffForm').serialize(),function (data) {
	     		 
	     		var result = data.result;
				if(result!=null && result=="noauthority") {
					common.alert1('你无此权限!');
					return;
				}
	     		 if(result!=null && result=="againLogin") {
	    			 $('.commonConfirm').modal('hide');
	    			 common.alert1("登录过期，请重新登录");;
					 setTimeout("location.href = ctx + '/login.html'",1000);
	             }else if(result=='success'){ 
	          		 $(".modal-edit").modal('hide');
	      	         common.mySuccessModal2('修改成功!');
	      	         showStaffByPage(1);
	          	}else{
	          		$(".updateMsg").html(data.message);
	          	}
	          },"json"); 
	     }  
	});
	/** 修改end **/
		
	function showStaffByPage(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		$("#dataBody").append(loadingHtml);
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	}
		$.getJSON(ctx + '/staff/showstaffbypage', {	
				pageNum : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				startTime : $("#date-start").val(),
				endTime : $("#date-end").val(),
				
				loginname : $("input[name='loginname-query']").val(),
				status : $("select[name='status-query']").val(),
				nickName : $("input[name='nickname-query']").val(),
				role : $("select[name='role-query']").val()
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
                    var currentuserid = $('#adminuserid').val();
                    var currentUtype = $('#currentUtype').val(); 
                    for(var i=0;i<datalist.length;i++){   
                    	var user = datalist[i];
                    	var no = (pageNum-1)*pageSize+i+1;
                    	tempHtml +="<tr data-id='"+user.id+"' data-pageno='" + pageNum + "'>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.nickName)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.loginname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.phone)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(status[user.status])+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.name)+"</td>";
                    	tempHtml +="<td class='excel'>"+common.getSmpFormatDate(user.createTime)+"</td>";
                    	if(currentuserid!=user.id) {
                    		tempHtml +="<td><button type='button' data-toggle='modal' data-target='.modal-edit' onclick='updateStaff(" +user.id+")' class='btn btn-warning btn-xs'>编辑</button>&nbsp;";
                    	
                    		if(user.status==0) {
                    			tempHtml +="<button type='button' data-state=1 data-orgname="+user.nickName+" class='btn btn-xs btn-success updatestate-this'>启用</button>&nbsp;";
                    		}else if(user.status==1){
                    			tempHtml +="<button type='button' data-state=0 data-orgname="+user.nickName+" class='btn btn-xs btn-danger updatestate-this'>停用</button>&nbsp;";
                    		}
                    		
                    		if(user.id!=currentuserid) {
		                    	if(currentUtype==0 || currentUtype==1) { //用户为超级管理员或管理员时
		                    		tempHtml +="<button type='button' data-toggle='modal' data-target='.modal-resetpwd' data-realname="+user.realname+" class='btn btn-danger btn-xs resetpwd-this'>重置密码</button>&nbsp;";
		                    	}
	                    	}
                    		
                    		tempHtml +="</td>";
                    	}else{
                    		tempHtml +="<td></td>";
                    	}
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
		showStaffByPage(pageNum);
	}
	
	$(document).on('click', '.resetpwd-this', function (e) { 
        var $this = $(this),
        realname = $this.data('realname'),
        parentTr = $this.parents('tr'),
        id = parentTr.data('id');
        $("#resetpwdForm").find("input[name='id']").val(id);
        $("#resetpwdForm").find("input[name='realname']").val(realname);
        $("#resetpwdForm").find("input[name='password']").val('');
        $(".resetpwdMsg").html("");
    });
 
	//重置密码
    $(document).on('click', '#btn_resetpsw', function (e) { 
        var id = $("#resetpwdForm").find("input[name='id']").val();
        var realname = $("#resetpwdForm").find("input[name='realname']").val();
        var password = $("#resetpwdForm").find("input[name='password']").val();
        resetPwd(id,realname,password);
    });
	 function resetPwd(id,realname,password) {
		 $.post(ctx+"/staff/updatedefaultpwd",{id:id,password:password},function(data){
			 	var result = data.result;
				if(result!=null && result=="noauthority") {
					common.alert1('你无此权限!');
					return;
				}
        		if(data.result!=null && data.result=="againLogin") {
					ccommon.alert1("登录过期，请重新登录");
					setTimeout("location.href = ctx + '/login.html'",1000);
           		}else if(data.result=='success'){ 
           			$('.modal-resetpwd').modal('hide');
           			$('.commonConfirm').modal('hide');
             		common.mySuccessModal2('密码初始化666666!');
             	}else{
             		$(".resetpwdMsg").html(data.message);
             	}
			},"json");
	 }

	//修改状态
    $(document).on('click', '.updatestate-this', function (e) { 
        var $this = $(this),
        state = $this.data('state'),
        orgname = $this.data('orgname'),
        parentTr = $this.parents('tr'),
        pageno = parentTr.data('pageno'),
        id = parentTr.data('id');
        updateState(id,orgname,state,pageno);
    });
	 function updateState(id,name,state,pageno) {
		 $('.commonConfirm').modal('show');
			var titleval = state==0?'停用':'启用';
			common.commonConfirm(titleval, "确定"+titleval,name,
				function() {
					$.post(ctx+"/staff/updatestate",{id:id,state:state},function(data){
						
						var result = data.result;
						if(result!=null && result=="noauthority") {
							common.alert1('你无此权限!');
							return;
						}
	            		if(result!=null && result=="againLogin") {
	            			$('.commonConfirm').modal('hide');
							ccommon.alert1("登录过期，请重新登录");
	 						setTimeout("location.href = ctx + '/login.html'",1000);
	               		}else if(result=='success'){ 
	                 		$('.commonConfirm').modal('hide');
	                 		common.mySuccessModal2('修改成功!'); 
	                 		showStaffByPage(pageno);
	                 	}else{
	                 		common.alert1('修改失败，请重新操作!');
	                 	}
					},"json").fail(function (err) { 
						if($('.loading')){
							$('.loading').remove();
						}
						common.alert('服务器错误！请刷新页面重试或联系管理员',"确定"); 
		          });
				}
		);
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

function clearResetpwdMsg() {
	$(".resetpwdMsg").html("");
}

function updateStaff(id) {
	$(".updateMsg").html("");
	$.getJSON(ctx + '/staff/querybyid', {
		id : id
	}, function(data) {
		$("#updateStaffForm").find("input[name='nickname']").val(data.nickname);
		$("#updateStaffForm").find("input[name='id']").val(data.id);
		$("#updateStaffForm").find("input[name='phone']").val(data.phone);
		$("#updateStaffForm").find("select[name='role']").val(data.role);
	});
}