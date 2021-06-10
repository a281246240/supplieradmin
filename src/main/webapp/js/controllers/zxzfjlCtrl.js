require([ 'jquery', 'app', 'common', 'pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common) {

	$('title').text('在线支付记录');
	
	//支付类型：1：支付宝；2：微信；3：银联；4：广发虚拟账号；
	var payType = ["","<span style='color:#00aaee'>支付宝</span>","<span style='color:#0ccb1b'>微信</span>","银联","广发虚拟账号"];

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
			}).blur(
				function() {
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
		
		$("select[name='status-query']").val('');
		$("select[name='payType-query']").val('');
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
		$.getJSON(ctx + '/finance/showvrtualtraderecordbypage', {	
				pageNum : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				startTime : $("#date-start").val(),
				endTime : $("#date-end").val(),				
				vipname : $("input[name='vipname-query']").val(),
				status : $("select[name='status-query']").val(),
				payType : $("select[name='payType-query']").val(),
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
//                    	支付状态：1.支付已完成；0.尚未支付；-1：无效的交易；2：交易异常；
                    	var status;
                    	if(record.status==1){
                    		status="支付已完成";
                		}else if(record.status==0){
                			status="尚未支付";
                		}else if(record.status==2){
                			status="交易异常";
                		}else{
                			status="无效的交易";
                		}
                    	tempHtml +="<tr>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.nickname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.loginname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(status)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(payType[record.paytype])+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.txnamt)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.score)+"</td>";
                    	tempHtml +="<td class='excel'>"+getTime(record.createtime)+"</td>";
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
		'<th>支付状态</th>'+
		'<th>支付类型</th>'+
		'<th>充值金额</th>'+
		'<th>增加积分</th>'+
		'<th>记录时间</th>'+
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
			filename: "在线支付记录"
		});
}
