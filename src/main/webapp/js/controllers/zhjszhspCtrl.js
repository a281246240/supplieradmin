require([ 'jquery', 'app', 'common', 'pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common) {
	
	$('title').text('角色转换审批');
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
	
    $('body').append(mySuccessModal2);  

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
		$("input[name='applyname-auery']").val('');
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
	
	$("#btn-agreeApply").on('click',function(){
		$.getJSON(ctx+"/roleconvert/saveaudit",$("#agreeApplyForm").serialize(),function(data){
			
			var result = data.result;
			if(result!=null && result=="noauthority") {
				common.alert1('你无此权限!');
				return;
			}
			if(result!=null && result=="againLogin") {
        		$('.commonConfirm').modal('hide');
				common.alert("登录过期，请重新登录","确定");
				setTimeout("location.href = ctx + '/login.html'",1000);
           	}else if(result=='success'){
     	        $("#agreeApplyForm").find("input[name='remark']").val('');
     	        common.mySuccessModal2('保存成功!');
     	       $('.modal-examine').modal('hide');
     	        showCreditQuotaApplyByPage($(".currentPageNo").val());
         	}else if(result=='fail'){
         		$(".msg").html(data.message);
         	}else{
         		$(".msg").html("信息提交错误");
         	}
		});
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
		$.getJSON(ctx + '/roleconvert/getlist', {	
				pageNo : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				applyname : $("input[name='applyname-auery']").val(),
				status : $("select[name='status-query']").val(),
				starttime : $("input[name=starttime-query]").val(),
				endtime : $("input[name=endtime-query]").val()
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
					$(".currentPageNo").val(pageNum);
                    var tempHtml="";
                    for(var i=0;i<datalist.length;i++){   
                    	var apply = datalist[i];
                    	var no = (pageNum-1)*pageSize+i+1;
                    	tempHtml +="<tr data-id='"+apply.id+"' data-vipid='"+apply.vipid+"' data-targetrole='"+apply.targetrole+"' data-pageno='"+pageNum+"'>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.applyname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.mobile)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.identifyNo)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.email)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.beforerole)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.targetrole)+"</td>";
                    	tempHtml +="<td class='excel'>"+getTime(apply.createtime)+"</td>";
                    	tempHtml +="<td class='excel'>"+showStatus(apply.status)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.checkname)+"</td>";
                    	tempHtml +="<td class='excel'>"+getTime(apply.checktime)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.remark)+"</td>";
                    	tempHtml +="<td>";
                    	if(apply.status == "待审核") {//1：待审核；2：审核通过；3.审核不通过
                    		tempHtml +="<button type='button' data-toggle='modal' data-target='.modal-examine' data-status='2' " +
                    					"onclick=agreeApply("+apply.id+",'"+apply.applyname+"',2) class='btn btn-success btn-xs'>通过</button>&nbsp;";
                    		tempHtml +="<button type='button' data-toggle='modal' data-target='.modal-examine' data-status='3' " +
                    					"onclick=agreeApply("+apply.id+",'"+apply.applyname+"',3) class='btn btn-danger btn-xs'>不通过</button>&nbsp;";
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
	
	function showStatus(status){
//		1.待审核2.审核通过3.审核不通过
		if(status == "待审核"){
			return "<span style='color:red'>待审核</span>";
		}else if(status == "审核不通过"){
			return "审核不通过</span>";
		}else if(status == "审核通过"){
			return "<span style='color:green'>审核通过</span>";
		}else{
			return "资料待完善";
		}
	}
});

function agreeApply(id,applyname,status){
	$(".msg").html("");
	$("#agreeApplyForm").find("input[name='id']").val(id);
	$("#agreeApplyForm").find("input[name='applyname']").val(applyname);
	$("#agreeApplyForm").find("input[name='status']").val(status);
}