require([ 'jquery', 'app', 'common', 'validate','pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common,validate) {

	$('title').text('会员积分流水');

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
	var reloadDetail = true;
	var first_loadDetail = true;

	$(document).ready(function() {
		showVipScoresByPage(1);
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
		$("input[name='viploginname-query']").val('');
		$("input[name='vipname-query']").val('');
	});

	$(".setTableLength").change(function() {
		reload = true;
		showVipScoresByPage(1);
	});

	$(".searchBtn").click(function() {
		reload = true;
		showVipScoresByPage(1);
	});
	
	function showVipScoresByPage(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		$("#dataBody").append(loadingHtml);
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	}
		$.getJSON(ctx + '/finance/showvipscoresbypage', {	
				pageNum : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				startTime : $("#date-start").val(),
				endTime : $("#date-end").val(),
				nickName : $("input[name='vipname-query']").val(),
				loginname : $("input[name='viploginname-query']").val()
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
                    	var score = datalist[i];
                    	var no = (pageNum-1)*pageSize+i+1;
                    	tempHtml +="<tr data-vipid='"+score.vipid+"' data-vipnickname='"+score.nickname+"' data-pageno='" + pageNum + "'>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(score.nickname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(score.loginname)+"</td>";
                    	tempHtml +="<td class='excel'>"+score.vipscores+"</td>";
                    	tempHtml +="<td class='excel'>"+score.presentscores+"</td>";
                    	tempHtml +="<td class='excel'>"+score.exgablescores+"</td>";
                    	tempHtml +="<td class='excel'>"+score.lockedscores+"</td>";
                    	tempHtml +="<td class='excel'>"+score.stockscores+"</td>";
                		tempHtml +="<td><button type='button' data-toggle='modal' data-target='.modal-details' class='btn btn-info btn-xs showdetail'>详细</button>&nbsp;</td>";
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
		showVipScoresByPage(pageNum);
	}
	
	
	/** 详情start **/
	$(document).on('click', '.showdetail', function (e) {
		var $this = $(this),
        parentTr = $this.parents('tr'),
        vipid = parentTr.data('vipid');
		vipnickname = parentTr.data('vipnickname');
		$(".detailVipId").val(vipid);
		$(".detailVipName").val(vipnickname);
		showVipscoreflowByPage(1);
	});
	
	$(".setTableLengthScoreflow").change(function() {
		reloadDetail = true;
		showVipscoreflowByPage(1);
	});
	
	function showVipscoreflowByPage(pageNum) {
		var vipid = $(".detailVipId").val();
		$.getJSON(ctx + '/finance/showvipscoreflowbypage', {	
				pageNum : pageNum,
				pageSize : $('.setTableLengthScoreflow').val() || 10,
				vipid : vipid
				},
			function(data){  
				var result = data.result;
				if(result!=null && result=="noauthority") {
					common.alert1('你无此权限!');
					return;
				}
				if(data.result!=null && data.result=="againLogin") {
					common.alert1("登录过期，请重新登录");
						setTimeout("location.href = ctx + '/login.html'",1000);
       			} else if(data.result.length == 0) { 
					$('.modal-details .table-responsive').append('<div class="alert alert-warning no-result text-center" role="alert">没有找到记录 </div>');
                } else{
       				var datapage = data.result;
					var datalist = datapage.result;
					var totalCount = datapage.totalCount;
					var pageNumDetail = datapage.pageNo;
					var pageSize = datapage.pageSize;
					var totalPages = datapage.totalPages;
					$(".totalCountDetail").html(totalCount);
					$(".totalPagesDetail").html(totalPages);
					$(".pageNoDetail").html(pageNumDetail);
                    var tempHtml="";   
                    for(var i=0;i<datalist.length;i++){   
                    	var score = datalist[i];
                    	var no = (pageNum-1)*pageSize+i+1;
                    	tempHtml +="<tr data-id='"+score.id+"' data-pageno='" + pageNum + "'>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+getscoreType(score.type)+"</td>";
                    	tempHtml +="<td class='excel'>"+getTradeType(score.tradetype)+score.scores+"</td>";
                    	tempHtml +="<td class='excel'>"+score.vipScore+"</td>";
                    	tempHtml +="<td class='excel'>"+score.presentScore+"</td>";
                    	tempHtml +="<td class='excel'>"+score.exgableScore+"</td>";
                    	tempHtml +="<td class='excel'>"+score.remark+"</td>";
                    	tempHtml +="<td class='excel'>"+score.createTime+"</td>"; 
                    	tempHtml +="</tr>";
                    	if($('.alert-warning').length>0){
                    		$('.alert-warning').remove();
                    	}
                    }   
                    if(datalist.length === 0&&$('.alert-warning').length<=0) { 
						$('.modal-details .table-responsive').append('<div class="alert alert-warning no-result text-center" role="alert">没有找到记录 </div>');
	                } 
                    $('#dataBodyDetail').html(tempHtml);
                   
                    if (reloadDetail) {
                    	reloadDetail = false;
                    	first_loadDetail = true;
    					var initPagination = function() {
    						$("#PaginationDetail").pagination(totalCount, {
    							num_edge_entries : 1, // 边缘页数
    							num_display_entries : 4, // 主体页数
    							callback: pageselectCallbackDetail,
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
	function pageselectCallbackDetail(page_index, jq) {
		if (first_loadDetail) { //第一次初始化不需要请求
			first_loadDetail = false;
			return false;
		}
		
		pageNum = page_index + 1;
		console.log("pageselectCallbackDetail:"+pageNum);
		showVipscoreflowByPage(pageNum);
	}
	
	 function getTradeType(type) {
     	if(type=1) {
     		return "+";
     	}else if(type=0){
     		return "-";
     	}
     }
	
	//积分类型（1.会员积分（储值的积分）；2.赠送积分；4.可提现积分；8.锁定积分；16.代金券；32.股份；）
	function getscoreType(type) {
		if(type == 1) {
			return "储值积分";
		}else if(type == 2) {
			return "赠送积分";
		}else if(type == 4) {
			return "可提现积分";
		}else if(type == 8) {
			return "锁定积分";
		}else if(type == 16) {
			return "代金券";
		}else if(type == 32) {
			return "股份";
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

function exportExcel(){  
	$(".table2excel").html("");
	var tr='<tr>'+ 
		'<th>序号</th>'+
		'<th>会员名称</th>'+
		'<th>登录名</th>'+
		'<th>会员积分</th>'+
		'<th>赠送积分</th>'+
		'<th>可提现积分</th>'+
		'<th>锁定积分</th>'+
		'<th>股权积分</th>'+
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
			filename: "会员积分流水"
		});
}

function exportExcel2(){  
	$(".table2excel").html("");
	var vipname = $(".detailVipName").val();
	var tr='<tr>'+ 
		'<th>序号</th>'+
		'<th>积分类型</th>'+
		'<th>变动分值</th>'+
		'<th>会员积分结余</th>'+
		'<th>赠送积分结余</th>'+
		'<th>可提现积分结余</th>'+
		'<th>备注</th>'+
		'<th>创建时间</th>'+
		'</tr>';
		$(".table2excel").append(tr);
		$("#dataBodyDetail tr").each(function(){
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
			filename: vipname+"会员积分流水详情"
		});
}
