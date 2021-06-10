require([ 'jquery', 'app', 'common', 'pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common) {
	
	$('title').text('发票管理');

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
		showInvoiceCount();
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
		showInvoiceApplyByPage(1);
	});
	
	//搜索
	$(".searchBtn").click(function() {
		reload = true;
		showInvoiceApplyByPage(1);
		showInvoiceCount();
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
		var statehc = $("select[name='status-query']").val();
		
		$.getJSON(ctx + '/taxreceipt/showInvoiceAll', {	
				pageNumber : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				statehc : statehc,
				startTime : $("#date-start").val(),
				endTime : $("#date-end").val()
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
					//var totalCount = 100;
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
                    	tempHtml +="</td>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	//tempHtml +="<td class='excel'>"+isnull(apply.orderid)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.kpr)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.fpdm)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.fphm)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.gfmc)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.gfsh)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnumber(apply.jehj)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.kprq)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.updator)+"</td>";
                    	if(apply.fphc == 0){
                    		tempHtml +="<td class='excel'>待红冲</td>";
                    	}else if(apply.fphc == 1){
                    		tempHtml +="<td class='excel'>已红冲</td>";
                    	}else{
                    		tempHtml +="<td class='excel'></td>";
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

	//统计发票信息
	function showInvoiceCount(){
		$.post(ctx + '/taxreceipt/showInvoiceCount', {	
			startTime : $("#date-start").val(),
			endTime : $("#date-end").val()
		},
		function(data){ 
			var contHtml="";   
				contHtml +="<tr>";
				contHtml +="<td class='excel'>"+isnull(data.fs)+"</td>";
            	contHtml +="<td class='excel'>"+isnumber(data.jehj)+"</td>";
            	contHtml +="<td class='excel'>"+isnumber(data.sehj)+"</td>";
            	contHtml +="<td class='excel'>"+isnumber(data.jshj)+"</td>";
            	contHtml +="<td class='excel'>"+isnull(data.nsrsum)+"</td>";
            	contHtml +="</tr>";
            $("#dataBodyCount").html("");
            $("#dataBodyCount").append(contHtml);
		},"json")
	}

	function pageselectCallback(page_index, jq) {
		if (first_load) { //第一次初始化不需要请求
			first_load = false;
			return false;
		}
		pageNum = page_index + 1;
		showInvoiceApplyByPage(pageNum);
	}
	
	function getTime(timeValue) {
		if(timeValue!=null && timeValue!="") {
			return common.getSmpFormatDate(timeValue);
		}else{
			return "--";
		}
	}
	
	
	function isnull(value) {
		if (value == null || value == '' || typeof (value) == "undefined" || value == 'null')
			return "";
		else
			return value;
	}

	function isnumber(value) {
		if(value == null || value == '' || value == 'null'){
			return "0.00";
		}else{
			return value;
		}
	}
	
	$('#exportExcelTab').on('click',function(){
			$('.table2excel').html('');
			var tr = '<tr>'+
					'<th>操作</th>'+
					'<th>序号</th>'+
					'<th>开票人</th>'+
					'<th>发票代码</th>'+
					'<th>发票号码</th>'+
					'<th>购方名称</th>'+
					'<th>购方税号</th>'+
					'<th>发票金额（元）</th>'+
					'<th>发票日期</th>'+
					'<th>开票结果</th>'+
					'<th>红冲标志</th>'+
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
				filename: "发票管理"
			});
		});
	
});




