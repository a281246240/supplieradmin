require([ 'jquery', 'app', 'common', 'pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common) {

	$('title').text('订单开票审核');

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
		showInvoiceApplyByPage(1);
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
		}
		;
	});
	function placeholderSupport() {
		return 'placeholder' in document.createElement('input');
	}
	//placeholder兼容ie end

	//清除按钮
	$('.clearBtn').on('click', function() {
		$("select[name='inviceType-query']").val('');
		$("select[name='status-query']").val('');
		$('.setTableLength').val(10);
		$("#date-start").val('');
		$("#date-end").val('');
		
		$("input[name='order-query']").val('');
		$("input[name='accountname-query']").val('');
		$("input[name='vipname-query']").val('');
	});

	$(".setTableLength").change(function() {
		reload = true;
		showInvoiceApplyByPage(1);
	});

	$(".searchBtn").click(function() {
		reload = true;
		showInvoiceApplyByPage(1);
	});
	
	/** 列表查询start **/
	function showInvoiceApplyByPage(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		$("#dataBody").append(loadingHtml);
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	} 
		
		
		$.getJSON(ctx + '/taxreceipt/showinvoiceapplybypage', {	
				pageNum : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				//personname : $("input[name='vipname-query']").val(),
				viptype : $("select[name='inviceType-query']").val(),
				state : $("select[name='status-query']").val(),
				startTime : $("#date-start").val(),
				endTime : $("#date-end").val(),
				//accountname : $("input[name='accountname-query']").val(),
				orderid : $("input[name='order-query']").val()
			},
			function(data){  
//				if($('.loading')){
//					$('.loading').remove();
//				}
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
                    	var apply = datalist[i];
                    	var no = (pageNum-1)*pageSize+i+1;
                    	tempHtml +="<tr data-bank='"+apply.bank+"' data-id='"+apply.id+"' data-vipname='"+apply.vipname+"' data-pageno='" + pageNum + "'>";
                    	tempHtml +="<td>";
                    	if(apply.state == 1) {//0：未开发票；1：申请中；2：已开发票；3：申请被拒;4:发票审核中；
                    		tempHtml +="<button type='button' value='0' data-state=3 class='btn btn-success btn-xs audit-this'>同意开票</button>&nbsp;"; 
                    		tempHtml +="<button type='button' value='1' data-state=3 class='btn btn-warn btn-xs audit-this'>驳回</button>&nbsp;"; 
                    	}else if(apply.state == 2){
                    		tempHtml +="<button style='color:red' type='button' value='2' data-state=3 class='btn btn-fphc btn-xs audit-hcs'>发票红冲</button>&nbsp;"; 
                    	}
                    	tempHtml +="</td>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.orderid)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.orderprice)+"</td>";
                    	tempHtml +="<td class='excel'>"+apply.orderpay+"</td>";
                    	tempHtml +="<td class='excel'>"+getTime(apply.createtime)+"</td>";
                    	tempHtml +="<td class='excel'>"+viptype(apply.viptype)+"</td>";
                    	if(apply.viptype == 1){
                    		tempHtml +="<td class='excel'>"+isnull(apply.personname)+"</td>";
                    	}else if(apply.viptype == 2){
                    		tempHtml +="<td class='excel'>"+isnull(apply.companyname)+"</td>";
                    	}
                    	
                    	tempHtml +="<td class='excel'>"+showState(apply.state)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.updatorName)+"</td>";
                    	tempHtml +="<td class='excel'>"+getTime(apply.updatetime)+"</td>";
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
		showInvoiceApplyByPage(pageNum);
	}
	
	/** 发票客户类型：1：个人；2：企业 **/
	function viptype(val) {
		if(val == 1) {
			return "<span style='color:#FF8040'>个人</span>";
		} else if(val == 2) {
			return "<span style='color:#548C00'>企业</span>";
		} else {
			return "";
		}
	}
	/** 列表查询end **/
	
	function getTime(timeValue) {
		if(timeValue!=null && timeValue!="") {
			return common.getSmpFormatDate(timeValue);
		}else{
			return "--";
		}
	}
	
	//发票红冲
	$(document).on('click', '.audit-hcs', function (e) {
		var $this = $(this),
        state = $this.data('state'),
        //state = $this.val();
        parentTr = $this.parents('tr'),
        pageno = parentTr.data('pageno'),
        bank = parentTr.data('bank'),
        vipname = parentTr.data('vipname'),
        id = parentTr.data('id'),
        orderid = parentTr.find("td").eq(2).text();
		
		$('.commonConfirm').modal('show');
		 //0：待审核；1：审核不通过；2.审核通过
		common.commonConfirm("红冲", "确定作废该张发票？",'',
			function() {
			$.post(ctx + "/taxreceipt/invoicezfhc",
        		{
        			orderid:orderid,
        			id:id
        		},function(data){
			var result = data.result;
			if(result == "success"){
				
				$('.commonConfirm').modal('hide');
         		common.mySuccessModal2(data.message);
         		showInvoiceApplyByPage(pageno);
			}else if(result == "fail"){
				$('.commonConfirm').modal('hide');
         		common.mySuccessModal2(data.message);
         		showInvoiceApplyByPage(pageno);
			}else{
				alert("红冲异常！");
			}
        },"json");
		});
	});
	
	/** 审核start **/
	$(document).on('click', '.audit-this', function (e) {
		var $this = $(this),
        //state = $this.data('state'),
        state = $this.val();
        parentTr = $this.parents('tr'),
        pageno = parentTr.data('pageno'),
        bank = parentTr.data('bank'),
        vipname = parentTr.data('vipname'),
        id = parentTr.data('id'),
        orderid = parentTr.find("td").eq(2).text();
        
		audit(id,orderid,bank,vipname,state,pageno);
	});
	
	function audit(id,orderid,bank,vipname,state,pageno) {
		 $('.commonConfirm').modal('show');
		 //0：待审核；1：审核不通过；2.审核通过
			var titleval = state==0?'审核通过？':'审核不通过？';
			common.commonConfirm("审核", "确定"+titleval,'',
				function() {
				jQuery.post(ctx+"/taxreceipt/auditscorecashapply",{
					id:id,
					orderid:orderid,
					state:state
					},function(data){	
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
	                 		common.mySuccessModal2(data.message);
	                 		showInvoiceApplyByPage(pageno);
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
			return "";
		else
			return value;
	}

	function isnumber(value) {
		if (value == null || value == '')
			return "0.00";
		else
			return value;
	}
	
	/**
	 * 0：未开发票；1：申请中；2：已开发票；3：申请被拒 
	 */
	function showState(state){ 
		if(state == 0){
			return "<span>未开发票</span>";
		}else if(state == 1){
			return "<span style='color:orange'>申请中</span>";
		}else if(state == 2){
			return "<span style='color:green'>已开发票</span>";
		}else if(state == 3){
			return "<span style='color:yellow'>申请被拒</span>";
		}else if(state == 4){
			return "<span style='color:blue'>审核中</span>";
		}else if(state == 5){
			return "<span style='color:red'>已红冲</span>";
		}else{
			return "";
		}
	}
	
$('#exportExcelTab').on('click',function(){
//	function exportExcel(){
		$('.table2excel').html('');
		var tr = '<tr>'+
			'<th>操作</th>'+
			'<th>序号</th>'+
			'<th>订单号</th>'+
			'<th>订单总额（元）</th>'+
			'<th>实付款（元）</th>'+
			'<th>发票申请时间</th>'+
			'<th>开票对象</th>'+
			'<th>对象名称</th>'+
			'<th>状态</th>'+
			'<th>经办人</th>'+
			'<th>经办时间</th>'+
		'</tr>';
		$('.table2excel').append(tr);
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
			filename: "订单开票审核"
		});
//	}
	});
});
