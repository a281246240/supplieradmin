require([ 'jquery', 'app', 'common', 'validate','pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common,validate) {

	$('title').text('订单管理');
	var deliverytype = ['','上门提货','自送网点'];
	var iscreditapply = ['否','是'];
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
		showOrderByPage(1);
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
		$("input[name='orderid-query']").val('');
		$("input[name='sender-query']").val('');
		$("input[name='receiver-query']").val('');
		$("input[name='username-query']").val('');
		
		$("select[name='state-query']").val('');
		$("select[name='iscreditapply-query']").val('');
		
		$('.setTableLength').val(10);
		$("#date-start").val('');
		$("#date-end").val('');
	});

	$(".setTableLength").change(function() {
		reload = true;
		showOrderByPage(1);
	});

	$(".searchBtn").click(function() {
		reload = true;
		showOrderByPage(1);
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
		 $("#addStaffForm").find("select[name='role']").val('管理员');
		 $("#addStaffForm").find("input[name='phone']").val('');
	 })
	 /** 清空添加数据 end **/
	
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
        		if(data.result!=null && data.result=="againLogin") {
            		$('.commonConfirm').modal('hide');
            		common.alert1("登录过期，请重新登录");
 					setTimeout("location.href = ctx + '/login.html'",1000);
               	}else if(data.result=='success'){
               		$('.modal-staff').modal('hide');
             		$('.mySuccessModal1').modal({show:true,backdrop: 'static', keyboard: false});
         	        common.mySuccessModal1('添加成功!','如需继续添加，请点击返回继续添加', 
         	        		'返回继续添加','前往后台用户列表',
     	        		function () {
     	        			$('.mySuccessModal1').modal('hide');  
     	        			$('.modal-order').modal('hide');  
     	        			showOrderByPage(1);
     	        		},
     	        		function () {
     	        			$('.modal-staff').modal('show');
     	        		});
         	        $("#addStaffForm").find("input[name='nickname']").val('');
         			$("#addStaffForm").find("input[name='loginname']").val('');
         			$("#addStaffForm").find("select[name='role']").val('管理员');
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
             'phone':{ 
             	isPhone:true
             }
         },
         messages: {
         	'nickname': {
      		    required: "请填写姓名"
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
     		 if(data.result!=null && data.result=="againLogin") {
    			 $('.commonConfirm').modal('hide');
    			 common.alert1("登录过期，请重新登录");;
				 setTimeout("location.href = ctx + '/login.html'",1000);
             }else if(data.result=='success'){ 
          		 $(".modal-view").modal('hide');
      	         common.mySuccessModal2('修改成功!');
      	         showOrderByPage(1);
          	}else{
          		$(".updateMsg").html(data.message);
          	}
          },"json"); 
     }  
	});
	/** 修改end **/
		
	function showOrderByPage(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		$("#dataBody").append(loadingHtml);
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	}
		$.getJSON(ctx + '/adminorder/showorderbypage', {	
				pageNum : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				startTime : $("#date-start").val(),
				endTime : $("#date-end").val(),
				
				orderid :　$("input[name='orderid-query']").val(),
				sender :　$("input[name='sender-query']").val(),
				receiver :　$("input[name='receiver-query']").val(),
				state :　$("select[name='state-query").val(),
				iscreditapply :　$("select[name='iscreditapply-query").val(),
				username :　$("input[name='username-query']").val(),
			},
			function(data){  
				if($('.loading')){
					$('.loading').remove();
				}
				var sumnum = 0;
				var sumweight = 0.0;
				var sumvalume = 0.0;
				var sumorderfee = 0.0;
				var sumagencyfund = 0.0;
				var result = data.result;
				if(result!=null && result=="noauthority") {
					common.alert1('你无此权限!');
					return;
				}
				if(data.result!=null && data.result=="againLogin") {
					common.alert1("登录过期，请重新登录");
						setTimeout("location.href = ctx + '/login.html'",1000);
       			} else if(data.result.length == 0) { 
					$('.table-responsive').append('<div class="alert alert-warning no-result text-center" role="alert">没有找到记录... </div>');
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
                    var currentorderid = $('#orderid').val(); 
                    var currentUtype = $('#currentUtype').val(); 
                    for(var i=0;i<datalist.length;i++){   
                    	var order = datalist[i];
                    	var no = (pageNum-1)*pageSize+i+1;
                    	tempHtml +="<tr data-id='"+order.id+"' data-pageno='" + pageNum + "'>";
//                    	tempHtml +="<td><div class='checkbox'><label><input type='checkbox' data-orderid="+order.id+" /></label></div></td>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.orderid)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.username)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.sender)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.senderphone)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.receiver)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.receiverphone)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.goodsname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.goodsnum)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.weight)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.volume)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.transportway)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.sendfee)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.orgname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(deliverytype[order.deliverytype])+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.pickupgoodstime)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.settletype)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.agencyfund)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.state)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.createtime)+"</td>";
                		tempHtml +="<td><button type='button' data-toggle='modal' data-target='.modal-edityd' onclick='showOrderInfo(" +order.id+")' class='btn btn-primary btn-xs'>查看</button>&nbsp;</td>";
                    	tempHtml +="</tr>";
                    	sumnum += order.goodsnum;
        				sumweight += order.weight;
        				sumvalume += order.volume;
        				sumorderfee += order.sendfee;
        				sumagencyfund += order.agencyfund;
                    	if($('.alert-warning').length>0){
                    		$('.alert-warning').remove();
                    	}
                    }   
                    var sl=parseFloat(sumvalume).toFixed(2);
                    var sf=parseFloat(sumorderfee).toFixed(2);
                    tempHtml +="<tr>" +
                    		"<td style='padding: 6px 5px 3px;'>总计</td>  <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> " +
                    		"<td>"+sumnum+"</td>" +
                    		"<td>"+sumweight+"</td>" +
                    		"<td>"+sl+"</td>" +
                    		"<td></td>" +
                    		"<td>"+sf+"</td>" +
                    		"<td></td> <td></td> <td></td> <td></td>" +
                    		"<td>"+sumagencyfund+"</td>" +
                    		"<td></td> <td></td> <td></td>" +
                    		"</tr>";
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
		showOrderByPage(pageNum);
	}

	function isnull(value) {
		if (value == null || value == '' || typeof (value) == "undefined" || value == '/')
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

function showOrderInfo(id){
	$.getJSON(ctx + '/adminorder/showorderinfo', {
		id : id
	}, function(data) {
		if(data != null){
			$(".modal-edityd").find("input[name='orderid']").val(data.orderid);
			$(".modal-edityd").find("input[name='orgname']").val(data.orgname);
			$(".modal-edityd").find("select[name='transportway']").val(data.transportway);
			$(".modal-edityd").find("input[name='createtime']").val(data.createtime);
			$(".modal-edityd").find("select[name='settletype']").val(data.settletype);
			$(".modal-edityd").find("select[name='ifnotifydispatch']").val(data.ifnotifydispatch);
			$(".modal-edityd").find("select[name='paytype']").val(data.paytype);
			$(".modal-edityd").find("select[name='dispatchtype']").val(data.dispatchtype);
			$(".modal-edityd").find("input[name='agencyfund']").val(data.agencyfund);
			$(".modal-edityd").find("input[name='receiptnum']").val(data.receiptnum);
			$(".modal-edityd").find("input[name='receiptno']").val(data.receiptno);
			$(".modal-edityd").find("input[name='receiver']").val(data.receiver);
			$(".modal-edityd").find("input[name='receiverphone']").val(data.receiverphone);
			$(".modal-edityd").find("input[name='sender']").val(data.sender);
			$(".modal-edityd").find("input[name='senderphone']").val(data.senderphone);
			
			$(".modal-edityd").find("input[name='destname']").val(data.destname);
			
			$(".modal-edityd").find("input[name='receivercompany']").val(data.receivercompany);
			$(".modal-edityd").find("input[name='sendvipname']").val(data.sendvipname);
			$(".modal-edityd").find("input[name='sendercompany']").val(data.sendercompany);
			
			$(".modal-edityd").find("input[name='receiverpcdt']").val(data.receiverpcdt);
			$(".modal-edityd").find("input[name='senderpcdt']").val(data.senderpcdt);
			
			
			$(".modal-edityd").find("input[name='receiveraddress']").val(data.receiveraddress);
			$(".modal-edityd").find("input[name='senderaddress']").val(data.senderaddress);
			
			
			$(".modal-edityd").find("input[name='goodsname']").val(data.goodsname);
			$(".modal-edityd").find("input[name='goodsnum']").val(data.goodsnum);
			$(".modal-edityd").find("input[name='sendfee']").val(data.sendfee);
			$(".modal-edityd").find("input[name='freightcollectfee']").val(data.freightcollectfee);
			$(".modal-edityd").find("input[name='weight']").val(data.weight);
			$(".modal-edityd").find("input[name='volume']").val(data.volume);
			$(".modal-edityd").find("input[name='goodsvalue']").val(data.goodsvalue);
			$(".modal-edityd").find("input[name='securefee']").val(data.securefee);
			$(".modal-edityd").find("select[name='packtype']").val(data.packtype);
			$(".modal-edityd").find("input[name='remark']").val(data.remark);
		}else{
			alert("查询失败");
		}
	});
}


