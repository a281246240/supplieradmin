require([ 'jquery', 'app', 'common','validate', 'pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common,validate) {

	$('title').text('后台权限管理');

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
		loadOptDetail(1);
		
		var url = location.href;
		var rolename = url.substring(url.indexOf("rolename")+"rolename".length+1);
		$("#rolename").html(decodeURI(rolename));
		
		$("input.checkoneblock").each(function(index,one){
			if(one.checked==true){
				console.log("***");
				console.log(one);
				$(one).find("input.oneopt").attr("checked","checked");
			}
		});
	});
	
	//返回按钮
	$(".goback").on('click',function(){
		window.history.back();
	});
	
	//全选当前页
	$('.checknow').on('click', function() {
		$.each($("#myTabContent>div.active").find("input.oneopt"),function(index,oneli){
			oneli.checked=true;
		});
		
		$.each($("#myTabContent>div.active").find("input.checkoneblock"),function(index,oneli){
			oneli.checked=true;
		});
	});
	
	//全否当前页
	$('.nothingnow').on('click',function(){
		$.each($("#myTabContent>div.active").find("input.oneopt"),function(index,oneli){
			oneli.checked=false;
		});
		
		$.each($("#myTabContent>div.active").find("input.checkoneblock"),function(index,oneli){
			oneli.checked=false;
		});
	});
	
	//全选所有
	$('.all').on('click',function(){
		$.each($("input.oneopt"),function(index,oneli){
			oneli.checked=true;
		});
		$.each($("input.checkoneblock"),function(index,oneli){
			oneli.checked=true;
		});
	});
	
	//全否所有
	$('.nothing').on('click',function(){
		$.each($("input.oneopt"),function(index,oneli){
			oneli.checked=false;
		});
		$.each($("input.checkoneblock"),function(index,oneli){
			oneli.checked=false;
		});
	});
	
	//每页中一小块全选
	$(document).on("click","input.checkoneblock",function(){
		var ret = this.checked;
		$("input.checkoneblock").each(function(index,one){
			$(one).change(function(){
				$(one).parents("li").find("input.oneopt").prop("checked",ret);
			});
		});
	});
	
	//保存所有已设置的权限
	$(".saveall").click(function(e){
		var values= "";
		$("input.oneopt").each(function(index,one){
			if(one.checked==true){
				values += "," + one.value ;
			}
		});
		var rolevalue = location.href;
		if(rolevalue.indexOf("&")==-1){
			rolevalue = rolevalue.substring(rolevalue.indexOf("rolevalue")+"rolevalue".length+1);
		}else{
			rolevalue = rolevalue.substring(rolevalue.indexOf("rolevalue")+"rolevalue".length+1,rolevalue.indexOf("&"));
		}
		var url = "";
		var queryType = $("#queryType").val();
		if(queryType=="gw"){
			url = ctx + '/privilege/savegwoperationset';
		}else if(queryType=="ht"){
			url = ctx + '/privilege/savehtoperationset';
		}
		$.post(url, {values:values,rolevalue:rolevalue} ,function (data) {
		if(data.result!=null && data.result=="againLogin"){
			$('.commonConfirm').modal('hide');
			common.alert1("登录过期，请重新登录");
			setTimeout("location.href = ctx + '/login.html'",1000);
		}else if(data.result=='success'){
//			$('.modal-staff').modal('hide');
//			$('.mySuccessModal1').modal({show:true,backdrop: 'static', keyboard: false});
		    /*common.mySuccessModal1('保存成功!','如需继续添加，请点击返回继续添加','返回继续添加','前往后台用户列表',
			function () {
				$('.mySuccessModal1').modal('hide');  
				$('.modal-add').modal('hide');  
				loadOptDetail(1);
			},
			function () {
				$('.modal-staff').modal('show');
			});*/
			common.mySuccessModal2("保存成功!");
		    
		    $("#addRoleForm").find("input[name='name']").val('');
			$("#addRoleForm").find("input[name='value']").val('');
			$("#addRoleForm").find("select[name='description']").val('');
		}else if(data.result=='fail'){
			$(".errorMsg").html(data.message);
		}else{
			$(".errorMsg").html("信息提交错误");
		  	}
		},"json"); 
	});
	
	/*//各个复选框
	$(document).on('click', 'input[type=checkbox]:not(.all)', function() {
		if ($(this).is(':checked')) {
			$('.all').prop('checked', true);
			$("input[type=checkbox]").not(".all").each(function() {
				if (!$(this).is(':checked')) {
					$('.all').removeAttr('checked');
					return false;
				}
			});
		} else {
			if ($('.all').is(':checked')) {
				$('.all').removeAttr('checked');
			}
		}
	});*/

	$(".setTableLength").change(function() {
		reload = true;
		loadOptDetail(1);
	});

	$(".searchBtn").click(function() {
		reload = true;
		loadOptDetail(1);
	});
	
	//加载后台用户可操作权限
	function loadOptDetail(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		$("#dataBody").append(loadingHtml);
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	}
		var url;
		var queryType = $("#queryType").val();
		if(queryType=="gw"){
			url = ctx + '/privilege/gwvipoperation';
		}else if(queryType=="ht"){
			url = ctx + '/privilege/htstaffoperation';
		}
		var rolevalue = location.href;
		if(rolevalue.indexOf("&")==-1){
			rolevalue = rolevalue.substring(rolevalue.indexOf("rolevalue")+"rolevalue".length+1);
		}else{
			rolevalue = rolevalue.substring(rolevalue.indexOf("rolevalue")+"rolevalue".length+1,rolevalue.indexOf("&"));
		}
		
		$.getJSON(url, {pageNum : pageNum,pageSize : $('.setTableLength').val() || 10,rolevalue:rolevalue},
			function(data){
				if($('.loading')){
					$('.loading').remove();
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
                    var currentuserid = $('#userid').val(); 
                    var currentUtype = $('#currentUtype').val(); 
                    for(var i=0;i<datalist.length;i++){   
                    	var role = datalist[i];
                    	if(i==1 && queryType=="ht"){
                    		tempHtml += "<li class=\"active\"><a href=\"#"+role.parameter+"\" data-toggle=\"tab\">"+role.name+"</a></li>";	
                    	}else if(i==0 && queryType=="gw"){
                    		tempHtml += "<li class=\"active\"><a href=\"#"+role.parameter+"\" data-toggle=\"tab\">"+role.name+"</a></li>";	
                    	}else{
                    		tempHtml += "<li class=\"\"><a href=\"#"+role.parameter+"\" data-toggle=\"tab\">"+role.name+"</a></li>";
                    	}

                    	tempHtml +="</tr>";
                    	if($('.alert-warning').length>0){
                    		$('.alert-warning').remove();
                    	}
                    } 
                    $('#myTab').html(tempHtml);
                    
                    for(var i=0;i<datalist.length;i++){
                    	var addHtml = "";
                    	var oneli = "";
                    	var modulelist = datalist[i].subMenuList;
                    	for(var j=0;j<modulelist.length;j++){
                    		var onemodule = modulelist[j];
                    		var optHtml = "";
                    		var operationlist = onemodule.subOperationList;
                    		for(var k=0;k<operationlist.length;k++){
                    			var opt = operationlist[k];
                    			var choosedstr = opt.choosedStr + "";
                    			if(choosedstr.indexOf(","+opt.id+",")!=-1){
                    				optHtml += "<li><input type=\"checkbox\" class=\"oneopt\" value=\""+opt.id+"\" checked=\"checked\" /><span>"+opt.name+"</span></li>";
                    			}else{
                    				optHtml += "<li><input type=\"checkbox\" class=\"oneopt\" value=\""+opt.id+"\" /><span>"+opt.name+"</span></li>";
                    			}
                    		}
                    		var choose = onemodule.choosedStr + "";
                    		if(choose.indexOf(","+onemodule.id+",")!=-1){
                    			oneli += "<li><input type=\"checkbox\" class=\"checkoneblock\" value=\""+onemodule.id+"\" checked=\"checked\" /><span>"+onemodule.name+"</span>" +
                    					 "<div class=\"vip_details\"><ul>"+ optHtml +"</ul></div></li>";
                    		}else{
                    			oneli += "<li><input type=\"checkbox\" class=\"checkoneblock\" value=\""+onemodule.id+"\" /><span>"+onemodule.name+"</span><div class=\"vip_details\">"+
                    					 "<ul>"+ optHtml +"</ul></div></li>";
                    		}
                    	}
                    	if(i==1 && queryType=="ht"){
                    		addHtml += "<div class=\"tab-pane fade in active\" id=\""+datalist[i].parameter+"\"><ul>"+oneli+"</ul></div>";
                    	}else if(i==0 && queryType=="gw"){
                    		addHtml += "<div class=\"tab-pane fade in active\" id=\""+datalist[i].parameter+"\"><ul>"+oneli+"</ul></div>";
                    	}else{
                    		addHtml += "<div class=\"tab-pane fade in\" id=\""+datalist[i].parameter+"\"><ul>"+oneli+"</ul></div>";
                    	}
                    	$("#myTabContent").append(addHtml);
                    }
                    
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
			}).fail(function (err){ 
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
					if (input.val() == '' || input.val() == input.attr('placeholder')) {
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
	
});
$(function () {
	$('#myTab li:eq(1) a').tab('show');
});