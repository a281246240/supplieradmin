require([ 'jquery', 'app', 'common', 'pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common) {

	var addUserForm = $('#');
	var updateUserForm = $('#');
	$('title').text('白条额度审批');

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
	});

	$(".setTableLength").change(function() {
		reload = true;
		showCreditQuotaApplyByPage(1);
	});

	$(".searchBtn").click(function() {
		reload = true;
		showCreditQuotaApplyByPage(1);
	});
	
//	var stateVal = ['','等待审批','审批不通过','审批已通过'];
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
	
	function showCreditQuotaApplyByPage(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		$("#dataBody").append(loadingHtml);
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	}
		$.getJSON(ctx + '/admincredit/showcreditbypage', {	
				pageNum : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				vipname : $("input[name='vipname-query']").val(),
				status : $("select[name='status-query']").val(),
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
                    	tempHtml +="<tr data-id='"+credit.id+"' data-id='"+credit.id+"' data-pageno='" + pageNum + "'>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(credit.nickName)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(credit.quota)+"</td>";
                    	tempHtml +="<td class='excel'>"+getTime(credit.createTime)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(credit.reason)+"</td>";
                    	tempHtml +="<td class='excel'>"+showStatus(credit.status)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(credit.checkername)+"</td>";
                    	tempHtml +="<td class='excel'>"+timestamp1Time(credit.checkTime, "yyyy-MM-dd HH:mm:ss")+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(credit.remark)+"</td>";
                    	tempHtml +="<td>";
                    	/** 状态（1等待审批/2审批不通过/3审批已通过） **/
                    	if(credit.status == 1) {
                    		tempHtml +="<button type='button' data-toggle='modal' data-target='.modal-examine' onclick=updateStatus("
        								+credit.id+",'"+credit.nickName+"','"+credit.quota+"',3) class='btn btn-success btn-xs'>通过</button>&nbsp;";
                    		
                    		tempHtml +="<button type='button' data-toggle='modal' data-target='.modal-examine' onclick=updateStatus("
        								+credit.id+",'"+credit.nickName+"','"+credit.quota+"',2) class='btn btn-danger btn-xs'>不通过</button>&nbsp;";
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
	
	$('#btn-updatestatus').click(function(e) {
    	 $.post(ctx+"/admincredit/auditcredit", $('#updateStatusForm').serialize(),function (data) {
    		 var result = data.result;
			if(result!=null && result=="noauthority") {
				common.alert1('你无此权限!');
				return;
			}
    		if(data.result!=null && data.result=="againLogin") {
        		$('.commonConfirm').modal('hide');
				common.alert("登录过期，请重新登录","确定");
				setTimeout("location.href = ctx + '/tlsc/login.html'",1000);
           	}else if(data.result=='success'){
     	        $("#addReplayForm").find("input[name='orderid']").val('');
     	        $("#addReplayForm").find("input[name='toorgname']").val('');
     	        $("#addReplayForm").find(".reason").val('');
     	        common.mySuccessModal2('回复成功!');
     	        $('.modal-examine').modal('hide');    	       
     	        showCreditQuotaApplyByPage(1);
         	}else if(data.result=='fail'){
         		$(".msg").html(data.message);
         	}else{
         		$(".msg").html("信息提交错误");
         	}
         },"json"); 
	});

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

function timestamp1Time(time, format){
	if(time==null || time=="") {
		return "--";
	}
	var t = new Date(time);
	var tf = function(i){
		return (i < 10 ? '0' : '') + i
	};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
		switch(a){
			case 'yyyy':
				return tf(t.getFullYear());
				break;
			case 'MM':
				return tf(t.getMonth() + 1);
				break;
			case 'mm':
				return tf(t.getMinutes());
				break;
			case 'dd':
				return tf(t.getDate());
				break;
			case 'HH':
				return tf(t.getHours());
				break;
			case 'ss':
				return tf(t.getSeconds());
				break;
		};
	});
};

function updateStatus(id,vipname,quota,status) {
	$("#updateStatusForm").find("input[name='id']").val(id);
	$("#updateStatusForm").find("input[name='vipname']").val(vipname);
	$("#updateStatusForm").find("input[name='status']").val(status);
	$("#updateStatusForm").find("input[name='quota']").val(quota);
}
