require([ 'jquery', 'app', 'common', 'pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common) {

	$('title').text('虚拟账号交易记录');

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
		showcashapplyQuotaApplyByPage(1);
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
		$('.setTableLength').val(10);
		$("#date-start").val('');
		$("#date-end").val('');
		$("input[name='vipname-query']").val('');
		$("select[name='useFor-query']").val('');
		$("select[name='tradeKind-query']").val('');
		$("input[name='traceNo-query']").val('');
		$("input[name='companyName-query']").val('');
		
	});
	
	$(".setTableLength").change(function() {
		reload = true;
		showcashapplyQuotaApplyByPage(1);
	});

	$(".searchBtn").click(function() {
		reload = true;
		showcashapplyQuotaApplyByPage(1);
	});
	
	/** 列表查询start **/
	function showcashapplyQuotaApplyByPage(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		$("#dataBody").append(loadingHtml);
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	} 
		$.getJSON(ctx + '/fictitious/showvrtualtraderecordbypage', {	
				pageNum : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				startTime : $("#date-start").val(),
				endTime : $("#date-end").val(),
				nickname : $("input[name='vipname-query']").val(),
				useFor : $("select[name='useFor-query']").val(),
				tradeKind : $("select[name='tradeKind-query']").val(),
				traceNo : $("input[name='traceNo-query']").val(),
				companyName : $("input[name='companyName-query']").val() 
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
                    	var record = datalist[i];
                    	var no = (pageNum-1)*pageSize+i+1;
//                    	交易类别(1.订单结算2.订单扣费8.银行充值4.平台提现 128.银联支付 256.支付宝支付 512.微信支付)
                    	var tradeKind;
                    	if(record.tradeKind==1){
                    		tradeKind="订单结算";
                    	}else if(record.tradeKind==2){
                    		tradeKind="订单扣费";
                    	}else if(record.tradeKind==4){
                    		tradeKind="平台提现";
                    	}else if(record.tradeKind==8){
                    		tradeKind="银行充值";
                    	}else if(record.tradeKind==128){
                    		tradeKind="银联支付";
                    	}else if(record.tradeKind==256){
                    		tradeKind="支付宝支付";
                    	}else{
                    		tradeKind="微信支付";
                    	}
//                    	交易用途：1.会员储值/2.保证金充值/4.VIP会员储值/8.白条还款/16.订单扣费/32.订单结算/64.平台提现/128.VIP承运商储值/
                    	var useFor;
                    	if(record.useFor==1){
                    		useFor="会员储值";
                    	}else if(record.useFor==2){
                    		useFor="保证金充值";
                    	}else if(record.useFor==4){
                    		useFor="VIP会员储值";
                    	}else if(record.useFor==8){
                    		useFor="白条还款";
                    	}else if(record.useFor==16){
                    		useFor="订单扣费";
                    	}else if(record.useFor==32){
                    		useFor="订单结算";
                    	}else if(record.useFor==64){
                    		useFor="平台提现";
                    	}else{
                    		useFor="VIP承运商储值";
                    	}
                    	
                    	tempHtml +="<tr>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.nickname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.loginname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(useFor)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.money)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.money)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(tradeKind)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.traceNo)+"</td>";
                    	tempHtml +="<td class='excel'>"+getTime(record.createTime)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.tradeMsg)+"</td>";
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
		showcashapplyQuotaApplyByPage(pageNum);
	}
	/** 列表查询end **/
	
	function getTime(timeValue) {
		if(timeValue!=null && timeValue!="") {
			return common.getSmpFormatDate(timeValue);
		}else{
			return "--";
		}
	}
	
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
					$.post(ctx+"/vipscores/auditfictitiousaccountransaction",{id:id,state:state},function(data){
						
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
	                 		showcashapplyQuotaApplyByPage(pageno);
	                 	}else{
	                 		$('.commonConfirm').modal('hide');
	                 		common.alert(data.message,"确定");
	                 	}
					},"json");
				}
		);
	 }
	/** 审核end **/
	
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

function exportExcel(){  
	$(".table2excel").html("");
	var tr='<tr>'+ 
		'<th>序号</th>'+
		'<th>用户姓名</th>'+
		'<th>公司名称</th>'+
		'<th>交易用途</th>'+
		'<th>支付金额</th>'+
		'<th>对应积分值</th>'+
		'<th>交易类别</th>'+
		'<th>流水号</th>'+
		'<th>记录时间</th>'+
		'<th>详细信息</th>'+
		'</tr>';
		$(".table2excel").append(tr);
		$("#dataBody tr").each(function(){
			var tr='<tr>';
			$(this).find(".excel").each(function(){ 
				tr+=('<td> '+$(this).text()+'</td>'); 
			}); 
			tr+='</tr>';
			$(".table2excel").append(tr);
		});
		$(".table2excel").table2excel({
			exclude: ".noExl",
			name: "Excel Document Name",
			filename: "虚拟账号交易记录"
		});
}
