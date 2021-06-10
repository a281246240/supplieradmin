require([ 'jquery', 'app', 'common','province', 'pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common,province) {

	var checkVipForm = $('#checkVipForm');
	var status = ['<span>停用</span>','<span style="color:green">启用</span>','<span style="color:red">待审核</span>','<span>审核不通过</span>'];
	$('title').text('会员管理');
	
	

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
		showrolename();
	})
	
	var addrQuery = new province.Address({
        wrapper: $('.address-group'),
        provinceWrapper: $('#provinceQuery'),
        cityWrapper: $('#cityQuery'),
        districtWrapper: $('#districtQuery'),
        townWrapper: $('#townQuery'),
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
	
	/*显示所有角色s*/
	function showrolename(){
		 $.post(ctx+"/vip/showrolename", {},function (data) {
			var result = data.result;
			if(result!=null && result=="noauthority") {
				common.alert1('你无此权限!');
				return;
			}
     		if(data.result!=null && data.result=="againLogin") {
         		$('.commonConfirm').modal('hide');
     			common.alert1("登录过期，请重新登录");
				setTimeout("location.href = ctx + '/login.html'",1000);
        	}else{
        		var datalist = data.result;
        		var tempHtml = "<option value=''>全部</option>";
        		for(var i=0;i<datalist.length;i++){   
                	var viplist = datalist[i];
                	tempHtml += "<option value='"+viplist.value+"'>"+viplist.name+"</option>";
                }
      	        $("select[name='viprole-query']").append(tempHtml);
          	}
          },"json");
	}
	/*显示所有角色e*/
	
	function showVipByPage(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		$("#dataBody").append(loadingHtml);
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	}
		$.getJSON(ctx + '/vip/showvipbypage', {
				pageNum : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				startTime : $("#date-start").val(),
				endTime : $("#date-end").val(),
				loginname : $("input[name='loginname-query']").val(),
				status : $("select[name='status-query']").val(),
				nickName : $("input[name='vipname-nickName']").val(),
				role : $("select[name='viprole-query']").val()
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
                    	if(currentuserid!=user.id) {
                    		tempHtml +="<td>";
                    		if(user.status==0) {
                    			tempHtml +="<button type='button' data-state=1 data-name="+user.nickname+" class='btn btn-xs btn-success updatestate-this'>启用</button>&nbsp;";
                    		}else if(user.status==1){
                    			tempHtml +="<button type='button' data-state=0 data-name="+user.nickname+" class='btn btn-xs btn-danger updatestate-this'>停用</button>&nbsp;";
                    		}else if(user.status==2) {
                    			tempHtml +="<button type='button'data-toggle='modal' data-target='.modal-edit' onclick='checkVip(" +user.id+")' data-name="+user.nickname+" class='btn btn-xs btn-warning'>审核</button>&nbsp;";
                    		       
                    		}
                    		tempHtml +="</td>";
                    	}else{
                    		tempHtml +="<td></td>";
                    	}
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.companyname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.licenseno)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.nickname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.mobile)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.loginname)+"</td>";
                    	tempHtml +="<td class='excel'>"+getVipType(user.role)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(status[user.status])+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.pcdtname)+"</td>";
                    	tempHtml +="<td class='excel'>"+common.getSmpFormatDate(user.registertime)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(user.referrercode)+"</td>";
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
	
	//会员角色（1：创业导师、2：B2B会员、4：营销人员、8 :普通会员、16：财务、32：员工、64：b2b营销人员）
	function getVipType(type) {
		var str = "--";
		if(type == 1) {
			str = "创业导师";
		}else if(type == 2) {
			str = "B2B会员";
		}else if(type == 4) {
			str = "营销人员";
		}else if(type == 8) {
			str = "普通会员";
		}else if(type == 16) {
			str = "财务";
		}else if(type == 32) {
			str = "员工";
		}else if(type == 512) {
			str = "微信支付";
		}else if(type == 64) {
			str = "b2b营销人员";
		}
		return str;
	}
	
	function getConcatMobile(Mobile) {
		if(Mobile!=null && Mobile.length>7) {
			return "  "+Mobile;
		}else{
			return '';
		}
	}
	
	 /** 保存并审核通过s **/
	$("#btn_checkPass").click(function() {
	 	//var isValid = checkVipForm.valid();
		var statePass = 1;//审核通过
		$("#checkVipForm").find("input[name='state']").val(statePass);
		var isValid = true;
		save_updateState(isValid);
	});
	/** 保存并审核通过e **/
	
	//审核不通过
	$("#btn_noCheckPass").click(function(){
		var state_Pass = 3;//审核不通过
		$("#checkVipForm").find("input[name='state']").val(state_Pass);
		var isValid = true;
		save_updateState(isValid);
	});
	
	function save_updateState(isValid){
		if (isValid) { 	
	     	 $.post(ctx+"/vip/checkvip", $('#checkVipForm').serialize(),function (data) {
	     		var result = data.result;
				if(result!=null && result=="noauthority") {
					common.alert1('你无此权限!');
					return;
				}
	     		if(result!=null && result=="againLogin") {
	    			 $('.commonConfirm').modal('hide');
	    			 common.alert1("登录过期，请重新登录");;
					 setTimeout("location.href = ctx + '/login.html'",1000);
	            }else if(result=='success'){ 
	          		 $(".modal-edit").modal('hide');
	      	         common.mySuccessModal2('提交成功');
	      	         showVipByPage(1);
	          	}else{
	          		$(".updateMsg").html(data.message);
	          	}
	          },"json"); 
	     } 
		
	}
	
	
	//修改状态
    $(document).on('click', '.updatestate-this', function (e) { 
        var $this = $(this),
        state = $this.data('state'),
        name = $this.data('name'),
        parentTr = $this.parents('tr'),
        pageno = parentTr.data('pageno'),
        id = parentTr.data('id');
        updateState(id,name,state,pageno);
    });
	 function updateState(id,name,state,pageno) {
		 $('.commonConfirm').modal('show');
			var titleval = state==0?'停用':'启用';
			common.commonConfirm(titleval, "确定"+titleval,name,
				function() {
					$.post(ctx+"/vip/updatestatus",{
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

$('input').on('focus', function() {
	$(this).css('border-color', '#ffa300');
	if($(this).parent('.dropdown').length){
		$(this).siblings('.dropdown-menu').css('display','block');
	}
	return false;
});
$('.dropdown input').on('click',function(){
	return false;
});
$('input').on('blur', function() {
	$(this).css('border-color', '#cccccc');		
});

$(document).on('click',function(){
	$('.dropdown-menu').css('display','none');
})
//选择省市区  start
$('.nav-tabs li').on('click',function(){
	$(this).addClass('active').siblings('li').removeClass('active');
	$(this).closest('div').find('.tab-content').find('div').eq($(this).index()).show().siblings('div').hide();
	return false;
});
$('.tab-content div').on('click', 'a',function(ev){
	$(this).css({color:'#FFFFFF',background:'#363633'}).parent('li').siblings('li').find('a').css({color:'#626262',background:'none'});
	if($(this).closest('div').index()==$(this).closest('.tab-content').find('div').length-1){
		$(document).trigger('click');
		return false;
	}				
	$(this).closest('.dropdown-menu').find('.nav-tabs').find('li').eq($(this).closest('div').index()+1).trigger('click');	
});								
$('.dropdown-menu').on('click',function(){
	return false;
});	

//获取营业执照图片服务器地址
//发布线上需改动
//var licesnPath = 'http://127.0.0.1:8080/tlkh';
//测试地址
//var licesnPath = 'http://test.tl5688.com/';
//正式地址
var licesnPath = 'https://www.tl5688.com/';


//var licesnPath = 'https://www.tl5688.com/';
function checkVip(id) {
	$(".updateMsg").html("");
	$.getJSON(ctx + '/vip/querybyid', {
		id : id
	}, function(data) {
		$("#checkVipForm").find("input[name='id']").val(data.id);
		$("#checkVipForm").find("input[name='companyname']").val(data.companyname);
		$("#checkVipForm").find("input[name='licenseno']").val(data.licenseno);
		$("#checkVipForm").find("input[name='tel']").val(data.tel);
		$("#checkVipForm").find("input[name='pcdtnameshow']").val(data.pcdtname);
		$("#checkVipForm").find("input[name='licenseurl']").val(data.licenseurl);
		$("#licenseurl").attr("src",licesnPath + data.licenseurl);
		
		$("#checkVipForm").find("input[name='address']").val(data.address);
		$("#checkVipForm").find("input[name='nickname']").val(data.nickname);
		$("#checkVipForm").find("input[name='mobile']").val(data.mobile);
		$("#checkVipForm").find("input[name='businessscope']").val(data.businessscope);
		$("#checkVipForm").find("#registertime").val(data.registertime);
		$("#checkVipForm").find("input[name='proid']").val(data.proid);
		$("#checkVipForm").find("input[name='cityid']").val(data.cityid);
		$("#checkVipForm").find("input[name='districtid']").val(data.districtid);
		$("#checkVipForm").find("input[name='townid']").val(data.townid);
		
//		var naturalWidth = document.getElementById('licenseurl').naturalWidth,
//		 naturalHeight = document.getElementById('licenseurl').naturalHeight;
//alert(naturalWidth + "|" + naturalHeight);
//		$("#licenseurl").css("width",naturalWidth).css("height",naturalHeight);
	});
}



