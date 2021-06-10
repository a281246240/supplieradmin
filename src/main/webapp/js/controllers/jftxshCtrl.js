require([ 'jquery', 'app', 'common', 'pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common) {

	$('title').text('积分提现审核');

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
		}
		;
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
		$.getJSON(ctx + '/vipscores/showsscorecashapplybypage', {	
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
                    	var cashapply = datalist[i];
                    	var no = (pageNum-1)*pageSize+i+1;
                    	tempHtml +="<tr data-bank='"+cashapply.bank+"' data-id='"+cashapply.id+"' data-vipname='"+cashapply.vipname+"' data-pageno='" + pageNum + "'>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(cashapply.nickname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(cashapply.companyname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(cashapply.scorevalue)+"</td>";
                    	tempHtml +="<td class='excel'>"+getTime(cashapply.createtime)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(cashapply.exgablescores)+"</td>";
                    	tempHtml +="<td class='excel'>"+cashtype(cashapply.cashtype)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(cashapply.bank)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(cashapply.accountname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(cashapply.account)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(showStatus(cashapply.status))+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(cashapply.checkername)+"</td>";
                    	tempHtml +="<td class='excel'>"+getTime(cashapply.checktime)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(cashapply.remark)+"</td>";
                    	tempHtml +="<td>";
                    	if(cashapply.status == 1) {//1：待审核；2：审核不通过；3.审核通过
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
		showcashapplyQuotaApplyByPage(pageNum);
	}
	
	/** 提现方式 1：提现到提现帐号  2：到储值积分 **/
	function cashtype(val) {
		if(val == 1) {
			return "<span style='color:#FF8040'>提现到银行卡</span>";
		} else if(val == 2) {
			return "<span style='color:#548C00'>提现到储值积分</span>";
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
			var titleval = state==3?'审核通过？':'审核不通过？';
			common.commonConfirm("审核", "确定"+titleval,'',
				function() {
					$.post(ctx+"/vipscores/auditscorecashapply",{id:id,state:state},function(data){
						
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
	
	function showStatus(status){
//		1：待审核；2：审核不通过；3.审核通过；4.资料待完善
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
});


function exportExcel(){  
	$(".table2excel").html("");
	var tr='<tr>'+ 
		'<th>序号</th>'+
		'<th>申请人</th>'+
		'<th>开户行</th>'+
		'<th>开户名</th>'+
		'<th>卡号</th>'+
		'<th>提现积分</th>'+
		'<th>会员可提现积分</th>'+
		'<th>申请提交时间</th>'+
		'<th>状态</th>'+
		'<th>审核人</th>'+
		'<th>审核时间</th>'+
		'<th>备注</th>'+
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
			filename: "积分提现审核"
		});
}