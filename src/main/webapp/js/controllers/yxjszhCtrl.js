require([ 'jquery', 'app', 'common', 'pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common) {

	var addUserForm = $('#');
	var updateUserForm = $('#');
	var status = ['<span>停用</span>','<span style="color:green">启用</span>','<span style="color:red">待审核</span>','<span style="color:yellow">审核不通过</span>'];
	$('title').text('b2b营销角色审批');

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
		showVipByPage(1);
	})
	
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

	$(".setTableLength").change(function() {
		reload = true;
		showVipByPage(1);
	});

	$(".searchBtn").click(function() {
		reload = true;
		showVipByPage(1);
	});
	
	$('.clearBtn').on('click', function() {
		$("input[name='loginname-query']").val('');
		$("select[name='status-query']").val('');
		$("#date-start").val('');
		$("#date-end").val('');
		$("input[name='vipname-nickName']").val('');
		$("select[name='status-query']").val('');
		$("select[name='viprole-query']").val('');
	});
	
	
	function showVipByPage(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		$("#dataBody").append(loadingHtml);
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	}
		var role = 64; //b2b营销人员
		$.getJSON(ctx + '/roleconvert/showvipbypage', {
				pageNum : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				startTime : $("#date-start").val(),
				endTime : $("#date-end").val(),
				loginname : $("input[name='loginname-query']").val(),
				status : $("select[name='status-query']").val(),
				nickName : $("input[name='vipname-nickName']").val(),
				viprole : role
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
                    var currentuserid = $('#adminuserid').val();
                    var currentUtype = $('#currentUtype').val(); 
                    
                    for(var i=0;i<datalist.length;i++){   
                    	var user = datalist[i];
                    	var no = (pageNum-1)*pageSize+i+1;
                    	tempHtml +="<tr data-id='"+user.id+"' data-pageno='" + pageNum + "'>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.nickName)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.loginname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.name)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.mobile)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.companyName)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.concatPerson)+getConcatMobile(user.concatMobile)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.address)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.licenseNo)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.url)+"</td>";
                    	tempHtml +="<td class='excel'>"+common.getSmpFormatDate(user.registerTime)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(status[user.status])+"</td>";
                    	if(currentuserid!=user.id) {
                    		tempHtml +="<td>";
                    		if(user.status==2) {//2：待审核；1：启用；3.审核不通过
                    			tempHtml +="<button type='button' data-toggle='modal' data-target='.modal-examine' data-state=1 data-orgname="+user.nickName+" " +
            						"class='btn btn-success btn-xs updatestate-this'>通过</button>&nbsp;";
                    			tempHtml +="<button type='button' data-toggle='modal' data-target='.modal-examine' data-state=3 data-orgname="+user.nickName+" " +
            						"class='btn btn-danger btn-xs updatestate-this'>不通过</button>&nbsp;";
                    		}
                    		tempHtml +="</td>";
                    	}else{
                    		tempHtml +="<td></td>";
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

	function pageselectCallback(page_index, jq) {
		if (first_load) { //第一次初始化不需要请求
			first_load = false;
			return false;
		}
		pageNum = page_index + 1;
		showVipByPage(pageNum);
	}
	
	function getConcatMobile(Mobile) {
		if(Mobile!=null && Mobile.length>7) {
			return "  "+Mobile;
		}else{
			return '';
		}
	}
	
	//修改状态
    $(document).on('click', '.updatestate-this', function (e) { 
        var $this = $(this),
        state = $this.data('state'),
        orgname = $this.data('orgname'),
        parentTr = $this.parents('tr'),
        pageno = parentTr.data('pageno'),
        id = parentTr.data('id');
        updateState(id,orgname,state,pageno);
    });
	 function updateState(id,name,state,pageno) {
		 $('.commonConfirm').modal('show');
			var titleval = state==1?'通过':'不通过';
			common.commonConfirm(titleval, "确定"+titleval,name,
				function() {
					$.post(ctx+"/roleconvert/updatestatus",{
						id : id,
						state : state,
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
	                 		common.mySuccessModal2('修改成功!'); 
	                 		showVipByPage(pageno);
	                 	}else{
	                 		common.alert1('修改失败，请重新操作!');
	                 	}
					},"json").fail(function (err) { 
						if($('.loading')){
							$('.loading').remove();
						}
						common.alert('服务器错误！请刷新页面重试或联系管理员',"确定"); 
		          });
				}
		);
	 }
	
	
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
	
});

