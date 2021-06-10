require([ 'jquery', 'app', 'common', 'pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common) {

	$('title').text('虚拟账号列表');
//	账号状态(0.未开通1.启用2.冻结3.待注销)
	var getStatus = ['未开通','启用','冻结','待注销'];
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
		$("#subaccountname1_input").val('');
		$("#subaccount1_input").val('');
		$("select[name='status-select']").val('');
		$("#contactname_input").val('');
		$("#contactphone_input").val('');
		$("#bank_input").val('');
		$("#nickname_input").val('');
		
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
		$.getJSON(ctx + '/fictitious/showvrtualaccountbypage', {	
				pageNum : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				subaccount1 : $("#subaccount1_input").val(),
				nickname : $("#nickname_input").val(),
				status : $("select[name='status-select']").val(),
				contactname : $("#contactname_input").val(),
				contactphone : $("#contactphone_input").val(),
				bank : $("#bank_input").val(),
				
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
                    	tempHtml +="<tr>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.nickname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.subaccount1)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.subaccountname1)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(getStatus[record.status])+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.contactname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.contactphone)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.bank)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.balance)+"</td>";
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
			return common.getFormatDateByLong(timeValue);
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
					$.post(ctx+"/vipscores/auditfictitiousaccountlist",{id:id,state:state},function(data){
						
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
		'<th>用户名</th>'+
		'<th>虚拟子账户</th>'+
		'<th>子账户名</th>'+
		'<th>账号状态</th>'+
		'<th>联系人</th>'+
		'<th>联系人电话</th>'+
		'<th>开户行</th>'+
		'<th>虚拟账号余额</th>'+
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
			filename: "虚拟账号列表"
		});
}
