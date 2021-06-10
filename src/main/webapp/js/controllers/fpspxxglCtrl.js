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
		$(".table-responsive-one").hide();
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
		$("input[name='goodsName']").val('');
		$(".table-responsive-one").hide();
		//$('.table-responsive-one').hide();
	});

	$(".setTableLength").change(function() {
		reload = true;
		showInvoiceApplyByPage(1);
	});
	
	
	//搜索
	$(".searchBtn").click(function() {
		reload = true;
		var goodsna = $("input[name='goodsName']").val();
		if(goodsna == '' || goodsna == null){
			showInvoiceApplyByPage(1);
		}else{
			//$('.table-responsive-one').show();
			$(".table-responsive-one").show();
			selectDetailed();
		}
		
	});
	
	function clearGoods(){
		var spfl = $('input[name="newGoodsNumber"]').val('');
		var mc = $('input[name="newGoodsName"]').val('');
		var slv = $('input[name="newGoodsSLV"]').val('');
		$("#message").hide();
	}
	
	
	//新增商品信息
	$('.insertGoods').on('click',function(){
		clearGoods();
		$('.commonConfirmGoods').modal('show');
		common.commonConfirmGoods("新增商品",
				function() {
				var spfl = $('input[name="newGoodsNumber"]').val();
				var mc = $('input[name="newGoodsName"]').val();
				var slv = $('input[name="newGoodsSLV"]').val();
				if(spfl == null || spfl == "" || mc == null || mc == "" || slv == null || slv == ""){
					$("#message").show();
					//common.alert("新增商品信息不能有空！","确定");
				}else{
					jQuery.post(ctx+"/taxreceipt/insertGoods",{
						spfl:spfl,
						mc:mc,
						slv:slv
						},function(data){	
							var result = data.result;
							if(result!=null && result=="noauthority") {
								common.alert1('你无此权限!');
								return;
							}
		            		if(data.result!=null && data.result=="againLogin") {
		            			$('.commonConfirmGoods').modal('hide');
								common.alert1("登录过期，请重新登录");
		 						setTimeout("location.href = ctx + '/login.html'",1000);
		               		}else if(data.result=='success'){ 
		                 		$('.commonConfirmGoods').modal('hide');
		                 		common.mySuccessModal2(data.message);
		                 		showInvoiceApplyByPage(pageno);
		                 		clearGoods();
		                 	}else{
		                 		$('.commonConfirmGoods').modal('hide');
		                 		common.alert(data.message,"确定");
		                 		clearGoods();
		                 	}
						},"json");
				}
				
			});
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
		$.getJSON(ctx + '/taxreceipt/showInvoiceGoods', {	
				pageNumber : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				statehc : $("select[name='status-query']").val(),
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
                    	tempHtml +="<td class='excel'>"+isnull(apply.spmc)+"</td>";
//                    	tempHtml +="<td class='excel'>"+isnull(apply.goodsid)+"</td>";
//                    	tempHtml +="<td class='excel'>"+isnull(apply.qyspbm)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.ggxh)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.dw)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnumber(apply.dj)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnumber(apply.slv)+"</td>";
//                    	tempHtml +="<td class='excel'>"+isnull(apply.spbm)+"</td>";
                    	tempHtml +="<td class='excel'>"+isnull(apply.spfl)+"</td>";
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

	//获取商品详细
	function selectDetailed(){
		$.post(ctx + '/taxreceipt/selectDetailed', {	
			goodsName : $("input[name='goodsName']").val()
		},
		function(data){ 
			var contHtml="";   
				contHtml +="<tr>";
				contHtml +="<td class='excel'></td>";
				contHtml +="<td class='excel'>"+isnull(data.spmc)+"</td>";
				contHtml +="<td class='excel'>"+isnull(data.id)+"</td>";
				contHtml +="<td class='excel'>"+isnull(data.spbm)+"</td>";
            	contHtml +="<td class='excel'>"+isnull(data.ggxh)+"</td>";
            	contHtml +="<td class='excel'>"+isnull(data.dw)+"</td>";
            	contHtml +="<td class='excel'>"+isnumber(data.dj)+"</td>";
            	contHtml +="<td class='excel'>"+isnumber(data.slv)+"</td>";
            	contHtml +="<td class='excel'>"+isnull(data.qyspbm)+"</td>";
            	contHtml +="</tr>";
            $("#dataBodyGoods").html("");
            if(data.result == "fail"){
            	$('.table-responsive-one').html('<table id="invoiceGoods" class="table table-bordered check left"><thead id= "thead-test"><tr><th>操作</th><th>商品名称</th><th>商品id</th><th>企业商品编码</th><th>规格型号</th><th>单位</th><th>单价（元）</th><th>税率</th><th>商品编码</th></tr></thead><tbody id="dataBodyGoods"></tbody></table>');
            	$('.table-responsive-one').append('<div id="test-one" class="alert alert-warning no-result text-center" role="alert">'+data.message+'</div>');
            }else{
            	$('#test-one').hide();
            	$('.table-responsive-one').show();
            	$("#dataBodyGoods").append(contHtml);
            }
           
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
				'<th>商品名称</th>'+
				'<th>规格型号</th>'+
				'<th>单位</th>'+
				'<th>单价（元）</th>'+
				'<th>税率</th>'+
				'<th>商品分类</th>'+
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
				filename: "发票商品信息管理"
			});
		});
	
});




