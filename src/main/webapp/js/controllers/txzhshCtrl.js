require([ 'jquery', 'app', 'common', 'pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common) {

	$('title').text('提现账户审核');

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
		showCreditQuotaApplyByPage(1);
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
		$("input[name='vipname-query']").val('');
		$("select[name='status-query']").val('');
		$('.setTableLength').val(10);
		$("#date-start").val('');
		$("#date-end").val('');
		
		$("input[name='bank-query']").val('');
		$("input[name='accountname-query']").val('');
		$("input[name='vipname-query']").val('');
	});


	$(".setTableLength").change(function() {
		reload = true;
		showCreditQuotaApplyByPage(1);
	});

	$(".searchBtn").click(function() {
		reload = true;
		showCreditQuotaApplyByPage(1);
	});
	
	/** 列表查询start **/
	function showCreditQuotaApplyByPage(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		$("#dataBody").append(loadingHtml);
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	} 
		$.getJSON(ctx + '/vipscores/showscorecashingaccountbypage', {	
				pageNum : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				vipname : $("input[name='vipname-query']").val(),
				status : $("select[name='status-query']").val(),
				startTime : $("#date-start").val(),
				endTime : $("#date-end").val(),
				accountname : $("input[name='accountname-query']").val(),
				bank : $("input[name='bank-query']").val()
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
                    	var credit = datalist[i];
                    	var no = (pageNum-1)*pageSize+i+1;
                    	tempHtml +="<tr data-bank='"+credit.bank+"' data-id='"+credit.id+"' data-vipname='"+isnull(credit.nickName)+"' data-pageno='" + pageNum + "'>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(credit.nickName)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(credit.bank)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(credit.accountname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(credit.account)+"</td>";
                    	tempHtml +="<td class='excel'>"+getTime(credit.createtime)+"</td>";
                    	tempHtml +="<td class='excel'>"+zhuanhuan(credit.status)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(credit.checkername)+"</td>";
                    	tempHtml +="<td class='excel'>"+getTime(credit.checktime)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(credit.remark)+"</td>";
                    	tempHtml +="<td>";
                    	if(credit.status == 1) {//1：待审核；2：审核不通过；3.审核通过
                    		tempHtml +="<button type='button' data-state=3 class='btn btn-success btn-xs audit-this'>通过</button>&nbsp;";
                    		
                    		tempHtml +="<button type='button' data-state=2 class='btn btn-danger btn-xs audit-this'>不通过</button>&nbsp;";
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
		showCreditQuotaApplyByPage(pageNum);
	}
	/** 列表查询end **/
	
	/** 审核start **/
	$(document).on('click', '.audit-this', function (e) {
		var $this = $(this),
        state = $this.data('state'),
        parentTr = $this.parents('tr'),
        pageno = parentTr.data('pageno'),
        bank = parentTr.data('bank'),
        vipname = parentTr.data('vipname'),
        id = parentTr.data('id');
		audit(id,bank,vipname,state,pageno);
	});
	function audit(id,bank,vipname,state,pageno) {
		 $('.commonConfirm').modal('show');
		 //0：待审核；1：审核不通过；2.审核通过
			var titleval = state==1?'审核不通过：':'审核通过：';
			common.commonConfirm(titleval, "确定"+titleval,vipname+"-"+bank,
				function() {
					$.post(ctx+"/vipscores/auditscorecashingaccount",{id:id,state:state},function(data){
						
						var result = data.result;
						if(result!=null && result=="noauthority") {
							common.alert1('你无此权限!');
							return;
						}
	            		if(data.result!=null && data.result=="againLogin") {
	            			$('.commonConfirm').modal('hide');
							ccommon.alert1("登录过期，请重新登录");
	 						setTimeout("location.href = ctx + '/login.html'",1000);
	               		}else if(data.result=='success'){ 
	                 		$('.commonConfirm').modal('hide');
	                 		common.mySuccessModal2(data.message);
	                 		showCreditQuotaApplyByPage(pageno);
	                 	}else{
	                 		$('.commonConfirm').modal('hide');
	                 		common.alert(data.message,"确定");
	                 	}
					},"json");
				}
		);
	 }
	/** 审核end **/
	
//	状态：（1：待审核；2：审核不通过；3.审核通过；4.资料待完善）
	function zhuanhuan(status){
		if(status == 1){
			return "<span style='color:red'>待审核</span>";
		}else if(status == 2){
			return "审核不通过</span>";
		}else if(status == 3){
			return "<span style='color:green'>审核通过</span>";
		}else{
			return "资料待完善";
		}
	}
	
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
