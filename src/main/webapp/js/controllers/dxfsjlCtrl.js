require([ 'jquery', 'app', 'common', 'pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common) {

	$('title').text('短信发送记录');
//	1提交2已接收4发送失败
	var status = ["","提交","已接收","","发送失败"];

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
		showSmsByPage(1);
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
		$("input[name='mobile_query']").val('');
		
	});
	

	$(".setTableLength").change(function() {
		reload = true;
		showSmsByPage(1);
	});

	$(".searchBtn").click(function() {
		reload = true;
		showSmsByPage(1);
	});
	
	/** 列表查询start **/
	function showSmsByPage(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		$("#dataBody").append(loadingHtml);
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	} 
		$.getJSON(ctx + '/sms/showsmsbypage', {	
				pageNum : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				mobile : $("input[name='mobile_query']").val(),
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
                    	tempHtml +="<td class='excel'>"+isnull(record.smsid)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.mobile)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.content)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.number)+"</td>";
                    	tempHtml +="<td class='excel'>"+getTime(record.createtime)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(status[record.status])+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.createby)+"</td>";
                    	tempHtml +="<td class='excel'>"+getTime(record.receivtime)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.replycontent)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(record.replytime)+"</td>";
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
		showSmsByPage(pageNum);
	}
	/** 列表查询end **/
	
	function getTime(timeValue) {
		if(timeValue!=null && timeValue!="") {
			return common.getFormatDateByLong(timeValue);
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
