require([ 'jquery', 'app', 'common', 'pagination', 'bootstrap', 'timepicker', 'dateZh' ], function($, app, common) {

	$('title').text('商城订单');

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
		showShopOrderByPage(1);
		$("#updateStatusForm").find("input[name='expresscompany']").val('');
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
		
		$("input[name='nickName']").val('');
		$("select[name='state']").val('');
		$("input[name='ordersn']").val('');
		$("input[name='receiver']").val('');
		$("input[name='mobile']").val('');
	});


	$(".setTableLength").change(function() {
		reload = true;
		showShopOrderByPage(1);
	});

	$(".searchBtn").click(function() {
		reload = true;
		showShopOrderByPage(1);
	});
	
	/** 列表查询start **/
	function showShopOrderByPage(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		$("#dataBody").append(loadingHtml);
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	} 
		$.getJSON(ctx + '/shoporder/showorderbypage', {	
				pageNum : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				startTime : $("#date-start").val(),
				endTime : $("#date-end").val(),
				
				ordersn : $("input[name='ordersn']").val(),
				nickName : $("input[name='nickName']").val(),
				state : $("select[name='state']").val(),
				receiver : $("input[name='receiver']").val(),
				mobile : $("input[name='mobile']").val()
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
                    	var order = datalist[i];
                    	var no = (pageNum-1)*pageSize+i+1;
                    	tempHtml +="<tr data-id='"+order.id+"' data-name='"+order.nickName+"' data-pageno='" + pageNum + "'>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.ordersn)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.nickName)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.receiver)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.mobile)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.phone)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.address)+"</td>";
                    	tempHtml +="<td class='excel'>"+getState(order.state)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(order.orderprice)+"</td>";
                    	tempHtml +="<td class='excel'>"+getTime(order.createtime)+"</td>";
                    	tempHtml +="<td>";
                    	tempHtml +="<button type='button' data-toggle='modal' data-target='.modal-details' class='btn btn-info btn-xs showdetail'>详情</button>&nbsp;";
                    	if(order.state == 1) {//待付款
//                    		tempHtml +="<button type='button' data-state=3 class='btn btn-danger btn-xs audit-this'>付款</button>&nbsp;";
//                    		tempHtml +="<button type='button' data-state=2 class='btn btn-primary btn-xs audit-this'>取消</button>&nbsp;";
                    	}else if(order.state == 3){//待发货
                    		tempHtml +="<button type='button' data-toggle='modal' data-target='.modal-examine' class='btn btn-danger btn-xs update-this'>发货</button>&nbsp;";
                    	}else if(order.state == 4){
                    		tempHtml +="<button type='button' data-toggle='modal' data-target='.modal-examine' class='btn btn-primary btn-xs audit-this'>修改运单</button>&nbsp;";
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
		showShopOrderByPage(pageNum);
	}
	/** 列表查询end **/
	
	/** 详情start **/
	$(document).on('click', '.showdetail', function (e) {
		var $this = $(this),
        parentTr = $this.parents('tr'),
        orderid = parentTr.data('id');
		$(".orderid").val(orderid);
		showorderproductByPage(1);
	});
	$(".setTableLengthScoreflow").change(function() {
		reloadDetail = true;
		showorderproductByPage(1);
	});
	function showorderproductByPage(pageNum) {
		var orderid = $(".orderid").val();
		$.getJSON(ctx + '/shoporder/showorderproductbypage', {	
				orderid : orderid
			},
			function(data){  
				if(data.result!=null && data.result=="noauthority") {
					common.alert1('你无此权限!');
					return;
				}
				if(data.result!=null && data.result=="againLogin") {
					common.alert1("登录过期，请重新登录");
					setTimeout("location.href = ctx + '/login.html'",1000);
       			} else if(data.result!=null && data.result.length == 0) { 
					$('.modal-details .table-responsive').append('<div class="alert alert-warning no-result text-center" role="alert">没有找到记录 </div>');
                } else{
					var datalist = data.orderproduct;
					var shoporder = data.shoporder;
					var oneHtml="";
					if(shoporder!=null){
						oneHtml +="<tr>";
						oneHtml +="<td class='excel'>"+isnull(shoporder.ordersn)+"</td>";
						oneHtml +="<td class='excel'>"+isnull(shoporder.nickName)+"</td>";
						oneHtml +="<td class='excel'>"+isnull(shoporder.receiver)+"</td>";
						oneHtml +="<td class='excel'>"+isnull(shoporder.mobile)+"</td>";
						oneHtml +="<td class='excel'>"+isnull(shoporder.expresscompany)+"</td>";
						oneHtml +="<td class='excel'>"+isnull(shoporder.expressnumber)+"</td>";
						oneHtml +="<td class='excel'>"+getState(shoporder.state)+"</td>";
						oneHtml +="<td class='excel'>"+isnull(shoporder.orderprice)+"</td>";
						oneHtml +="<td class='excel'>"+getTime(shoporder.createtime)+"</td>";
						oneHtml +="</tr>";
					}else{
						oneHtml +="<div class='alert alert-warning no-result text-center' role='alert'>没有找到记录 </div>";
					}
                    var tempHtml="";   
                    for(var i=0;i<datalist.length;i++){   
                    	var orderproduct = datalist[i];
                    	var no = 1;
                    	tempHtml +="<tr data-id='"+orderproduct.id+"' data-pageno='" + pageNum + "'>";
                    	tempHtml +="<td class='excel'>"+no+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(orderproduct.name)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(orderproduct.code)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(orderproduct.brandname)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(orderproduct.originalprice)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(orderproduct.price)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(orderproduct.num)+"</td>";
                    	tempHtml +="</tr>";
                    	if($('.alert-warning').length>0){
                    		$('.alert-warning').remove();
                    	}
                    	no++;
                    }   
                    if(datalist.length === 0&&$('.alert-warning').length<=0) { 
						$('.modal-details .table-responsive').append('<div class="alert alert-warning no-result text-center" role="alert">没有找到记录 </div>');
	                } 
                    $('#dataBodyDetail').html(tempHtml);
                    $('#oneDataBody').html(oneHtml);
				} 
			}).fail(function (err) { 
				if($('.loading')){
					$('.loading').remove();
				}
				common.alert('服务器错误！请刷新页面重试或联系管理员',"确定"); 
            });  
	}
	/** 详情end **/
	
	/**发货strat*/
	$(document).on('click', '.update-this', function (e) {
		parentTr = $(this).parents('tr'),
        id = parentTr.data('id');
		$("#updateStatusForm").find("input[name='id']").val(id);
		
		$("#updateStatusForm").find("select[name='expresscompany']").val('');
		$("#updateStatusForm").find("input[name='expresscompany']").val('');
		$("input[name='expressnumber']").val('');
	});
	$('#btn-updatestatus').click(function(e) {
        var id = $("#updateStatusForm").find("input[name='id']").val();
        var expresscompany = $("#updateStatusForm").find("input[name='expresscompany']").val();
        if(expresscompany == "" || expresscompany == null){
        	expresscompany = $("#updateStatusForm").find("select[name='expresscompany']").val();
        }
        var expressnumber = $("input[name='expressnumber']").val();
        if(expresscompany=="" || expressnumber==""){
        	$(".errorMsg").html("请填写完全运单信息");
        	return;
        }
    	$.post(ctx+"/shoporder/updateorderstate", {
    		id:id,
    		expresscompany:expresscompany,
    		expressnumber:expressnumber,
    	},function (data) {
    		 var result = data.result;
			 if(result!=null && result=="noauthority") {
				 common.alert1('你无此权限!');
				 return;
			 }
    		 if(data.result!=null && data.result=="againLogin") {
    			 common.alert1("登录过期，请重新登录");
				 setTimeout("location.href = ctx + '/login.html'",1000);
             }else if(data.result=='success'){ 
            	 $("#updateStatusForm").find("input[name='expresscompany']").val('');
            	 $("#updateStatusForm").find("select[name='expresscompany']").val('');
            	 $("input[name='expressnumber']").val('');
         		 $(".modal-examine").modal('hide');
     	         common.mySuccessModal2(data.message);
     	         showShopOrderByPage(1);
         	}else{
         		$(".errorMsg").html(data.message);
         	}
    	 },"json"); 
	});
	/**发货end*/
	
	/*修改物流单号start*/
	$(document).on('click', '.audit-this', function (e) {
		parentTr = $(this).parents('tr'),
        id = parentTr.data('id');
		
		$(".enter").addClass("dsn");
		$("#updateStatusForm").find("input[name='expresscompany']").val('');
		$(".choice").removeClass("dsn");
		$(".updateinput").removeClass("dsn");
		$(".updateselect").addClass("dsn");
		
		$.post(ctx+"/shoporder/selectorderbyid", {id:id},function (data) {
    		 var result = data.result;
			 if(result!=null && result=="noauthority") {
				 common.alert1('你无此权限!');
				 return;
			 }
    		 if(data.result!=null && data.result=="againLogin") {
    			 common.alert1("登录过期，请重新登录");
				 setTimeout("location.href = ctx + '/login.html'",1000);
             }else if(data != null){ 
            	 $("#updateStatusForm").find("select[name='expresscompany']").val(data.expresscompany);
            	 var expresscompany = $("#updateStatusForm").find("select[name='expresscompany']").val();
            	 if(expresscompany==null || expresscompany==''){
            		 $("#updateStatusForm").find("select[name='expresscompany']").val('');
            		 $(".choice").addClass("dsn");
            		 $(".enter").removeClass("dsn");
            		 $(".updateselect").removeClass("dsn");
            		 $(".updateinput").addClass("dsn");
            		 $("#updateStatusForm").find("input[name='expresscompany']").val(data.expresscompany);
            	 }
            	 $("input[name='expressnumber']").val(data.expressnumber);
         	 }
    	 },"json");
	});
	/*修改物流单号end*/
	
	$(".updateinput").click(function(){
		$(".choice").addClass("dsn");
		$("#updateStatusForm").find("select[name='expresscompany']").val('');
		$(".enter").removeClass("dsn");
		$(".updateselect").removeClass("dsn");
		$(".updateinput").addClass("dsn");
	});
	
	$(".updateselect").click(function(){
		$(".enter").addClass("dsn");
		$("#updateStatusForm").find("input[name='expresscompany']").val('');
		$(".choice").removeClass("dsn");
		$(".updateinput").removeClass("dsn");
		$(".updateselect").addClass("dsn");
	});
	
//	订单状态   1、待付款；2、已取消；3、待发货；4、待收货；5、待评价；10、已完成 
	function getState(state){
		if(state == 1){
			return "<span style='color:red'>待付款</span>";
		}else if(state == 2){
			return "<span style='color:yellow'>已取消</span>";
		}else if(state == 3){
			return "<span style='color:green'>待发货</span>";
		}else if(state == 4){
			return "<span style='color:blue'>待收货</span>";
		}else if(state == 5){
			return "<span style='color:tan'>待评价</span>";
		}else if(state == 10){
			return "<span style='color:purple'>已完成 </span>";
		}else{
			return "--";
		}
	}
	
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
});

function exportExcel(){  
	$(".table2excel").html("");
	var tr='<tr>'+ 
		'<th>序号</th>'+
		'<th>订单号</th>'+
		'<th>下单人</th>'+
		'<th>收货人</th>'+
		'<th>收货人手机号</th>'+
		'<th>收货人固定号</th>'+
		'<th>收货地址</th>'+
		'<th>订单状态</th>'+
		'<th>订单总价</th>'+
		'<th>下单时间</th>'+
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
		filename: "积分商城订单"
	});
}

function exportExcel2(){  
	$(".table2excel").html("");
	var th='<tr>'+ 
		'<th>订单号</th>'+
		'<th>下单人</th>'+
		'<th>收货人</th>'+
		'<th>收货人手机号</th>'+
		'<th>快递公司</th>'+
		'<th>快递单号</th>'+
		'<th>订单状态</th>'+
		'<th>订单总价</th>'+
		'<th>下单时间</th>'+
		'</tr>';
	$(".table2excel").append(th);
	$("#oneDataBody tr").each(function(){
		var th='<tr>';
		$(this).find(".excel").each(function(){ 
			th+=('<td> '+$(this).text()+'</td>'); 
		}); 
		th+='</tr>';
		$(".table2excel").append(th);
	});
	var tr='<tr>'+ 
		'<th>序号</th>'+
		'<th>商品</th>'+
		'<th>编号</th>'+
		'<th>品牌</th>'+
		'<th>原价</th>'+
		'<th>积分</th>'+
		'<th>数量</th>'+
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
		filename: "订单详情"
	});
}

