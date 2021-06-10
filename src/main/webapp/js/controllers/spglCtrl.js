require([ 'jquery', 'common', 'validate','timepicker', 'pagination', 'bootstrap', 'dateZh','plupload','T_upload'], function($, common,validate,timepicker,T_upload) {
	
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
	
	var first_load = true;
	var reload = true;
	var getstate = ['','<span style="color:green">上架</span>','<span style="color:red">下架</span>'];
	
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
		
		showProductByPage(1);
		$("#updateImgIds").val('');
	});
	function placeholderSupport() {
		return 'placeholder' in document.createElement('input');
	}
	//placeholder兼容ie end

	//清除按钮
	$('.clearBtn').on('click', function() {
		$('.setTableLength').val(10);
		$("#name").val(''),
		$("#brandname").val(''),
		$("#code").val(''),
		$("select[name='stateone']").val(''),
		$("#date-start").val('');
		$("#date-end").val('');
	});
	
	$(".setTableLength").change(function() {
		reload = true;
		showProductByPage(1);
	});

	$(".searchBtn").click(function() {
		reload = true;
		showProductByPage(1);
	});
	
	/** 列表查询start **/
	function showProductByPage(pageNum) {
		if ($(".all").is(':checked')) {
			$(".all").removeAttr('checked');								
		}	
		if($('.alert-warning').length>0){
    		$('.alert-warning').remove();
    	}
		$.getJSON(ctx + '/product/showproductbypage', {	
				pageNum : pageNum,
				pageSize : $('.setTableLength').val() || 10,
				startTime : $("#date-start").val(),
				endTime : $("#date-end").val(),	
				
				name : $("#name").val(),
				brandname : $("#brandname").val(),
				code : $("#code").val(),
				state : $("select[name='stateone']").val(),
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
                    	var productList = datalist[i];
                    	var no = (pageNum-1)*pageSize+i+1;
                    	
                    	tempHtml +="<tr data-id='"+productList.id+"' data-pageno='" + pageNum + "'>";
                    	tempHtml +="<td><div class='checkbox'><label><input type='checkbox' data-roleid="+productList.id+" name='itemCheck' value="+productList.id+" /></label></div></td>";
                    	tempHtml +="<td>"+isnull(productList.name)+"</td>";
                    	tempHtml +="<td>"+isnull(productList.code)+"</td>";
                    	tempHtml +="<td>"+isnull(productList.brandname)+"</td>";
                    	tempHtml +="<td>"+isnumber(productList.originalprice)+"</td>";
                    	tempHtml +="<td>"+isnull(productList.price)+"</td>";
                    	tempHtml +="<td>"+isnull(productList.weight)+"</td>";
                    	tempHtml +="<td>"+getstate[productList.state]+"</td>";
                    	tempHtml +="<td>"+isnull(productList.stock)+"</td>";
                    	tempHtml +="<td>"+common.getSmpFormatDate(productList.createtime)+"</td>";
                    	
                    	tempHtml +="<td>";
                    		tempHtml +="<button type='button' data-toggle='modal' data-id=" +productList.id+" data-target='.modal-editNews' class='btn btn-warning btn-xs updateproduct'>编辑</button>&nbsp";
                    		tempHtml +="<button type='button' data-id="+productList.id+" class='btn btn-primary btn-xs delete-btn'>删除</button>&nbsp;";
	                    	if(productList.state == 1){
	                    		tempHtml +="<button type='button' data-id="+productList.id+" data-state=2 class='btn btn-danger btn-xs update-btn'>下架</button>";
	                    	}else if(productList.state == 2){
	                    		tempHtml +="<button type='button' data-id="+productList.id+" data-state=1 class='btn btn-success btn-xs update-btn'>上架</button>";
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
		showProductByPage(pageNum);
	}
	/** 列表查询end **/
	
	/** 添加验证start **/
	$('#addshopForm').validate({
        rules: {
            'name': {
                required: true 
            },
            'code': {
                required: true 
            },
            'originalprice': {
                required: true,
                number: true
            },
            'stock': {
                required: true,
                digits: true,
                min:0
            },
            'weight': {
                number: true
            },
            'price': {
                required: true,
                digits: true,
                number: true
            },
	        'mainImg': {
	        	required: true
	        }
        },
        messages: {
        	'name': {
     		    required: "请填写商品名称" 
     		 },
     		'code': {
                required: "请填写商品编号" 
            },
     		'originalprice': {
                required: "请填写商品市场价格",
                number: "请输入有效的数字"
            },
            'stock': {
            	required: "请填写商品库存数量",
            	digits: "请输入有效的整数",
            	min : "不能小于0"
            },
            'weight': {
                number: "请输入有效的数字"
            },
     		'price': {
     		    required: "请填写商品积分价格",
     		    digits: "请输入有效的整数",
     		    number: "请输入有效的数字"
     		 },
     		'mainImg': {
	        	required: "请选择主图"
	        }
        },
        errorClass: "error",
		success: 'valid',
		unhighlight: function(element, errorClass, validClass) { //验证通过
			$(element).tooltip('destroy').removeClass(errorClass);
		}, 
		errorPlacement: function(label, element) {
			$(element).tooltip('destroy'); /*必需*/
			$(element).attr('title', $(label).text()).tooltip('show');
		},
        onclick: true 
    });
	/** 添加验证end **/
	
	/** 添加start **/
	$("#btn_addshop").click(function() {
    	var isValid = $("#addshopForm").valid();
        if (isValid) { 	
        	 var formData = new FormData($("#addshopForm")[0]);
        	 $.ajax({  
     			type : "post",  
     	        async:false,  
     	        url : ctx + "/product/addproduct",  
     	        data : formData,
     	        dataType : "json",//数据类型为json  
     	        processData : false,  //必须false才会避开jQuery对 formdata 的默认处理   
     	        contentType : false,  //必须false才会自动加上正确的Content-Type
     	        success : function(data){ 
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
	   	             	$('.modal-addNews').modal('hide');
	             		$('.mySuccessModal1').modal({show:true,backdrop: 'static', keyboard: false});
	         	        common.mySuccessModal1('添加成功!','如需继续添加，请点击继续添加', 
	         	        		'继续添加','返回商品列表',
	     	        		function () {
	     	        			$('.mySuccessModal1').modal('hide');  
	     	        			$('.modal-addNews').modal('hide');  
	     	        			$('#addshopForm').find("input[name='name']").val('');
	     	        			$('#addshopForm').find("input[name='description']").val('');
	     	        			$('#addshopForm').find("input[name='originalprice']").val('');
	     	        			$('#addshopForm').find("input[name='price']").val('');
	     	        			$('#addshopForm').find("input[name='weight']").val('');
	     	        			$('#addshopForm').find("input[name='code']").val('');
	     	        			$('#addshopForm').find("input[name='stock']").val('');
	     	        			$('#addshopForm').find("select[name='state']").val(1);
	     	        			$('#addshopForm').find("input[name='brandname']").val('');
	     	        			$('#addshopForm').find("input[name='mainImg']").val('');
	     	        			$('#addshopForm').find("div[class='mainshow']").html('');
	     	        			
	     	        			showProductByPage(1);
	     	        		},
	     	        		function () {
	     	        			$('.mySuccessModal1').modal('hide');
	     	        			$('.modal-addNews').modal('show');
	     	        		});
	             	}else if(data.result=='fail'){
	             		$(".errorMsg").html(data.message);
	             	}else{
	             		$(".errorMsg").html("信息提交错误");
	             	}
     	        },  
     	        error:function(){  
     	        	console.log('fail');  
     	        }  
     	    }); 
        }  
	});
	/** 添加end **/
	
	/**删除start */
	$(document).on('click', '.delete-btn', function(){
		var varId = $(this).data("id");
		var parentTr = $(this).parents('tr');
        var pageno = parentTr.data('pageno');
		$('.commonConfirm').modal('show');				
		common.commonConfirm("删除", "确定删除", "",
			function() {
            	 $.post(ctx+"/product/deleteproductbyid", {
    				 id:varId
    			 },function (data) {
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
    	     	        common.mySuccessModal2(data.message);
    	     	        showProductByPage(pageno);
    	         	}else{
    	         		common.alert1(data.message);
    	         	}
    	         },"json"); 
			}
		);
	});
	/** 删除end **/
	
	/**上下架start */
	$(document).on('click', '.update-btn', function(){
		var varid = $(this).data("id");
        var state = $(this).data('state');
        var parentTr = $(this).parents('tr');
        var pageno = parentTr.data('pageno');
        if(state == 1){
        	var str = "上架";
		}else if(state == 2){
			var str = "下架";
		}else{
			var str = "--";
		}
		$('.commonConfirm').modal('show');
		common.commonConfirm("修改", "确定"+str+"该商品吗？", "",
			function() {
            	 $.post(ctx+"/product/updatestate", {
    				 id:varid,state:state
    			 },function (data) {
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
    	     	        common.mySuccessModal2(data.message);
    	     	        showProductByPage(pageno);
    	         	}else{
    	         		common.alert1(data.message);
    	         	}
    	         },"json"); 
			}
		);
	});
	/** 上下架end **/
	
	/**删除多个s*/
	$('#deleteMany').click(function(e) {
		var ids = "";
		var count = 0;
		var checks = document.getElementsByName("itemCheck");
		console.log(checks);
		for(var i=0;i<checks.length;i++){
			if(checks[i].checked){
				count++;
				ids += checks[i].value + ",";
			}
		}
		if(count<1){
			common.alert1("请至少选择一个");
		}else{
			$('.commonConfirm').modal('show');
			common.commonConfirm("删除", "确定删除", "这"+count+"个商品吗",
				function() {
	            	 $.post(ctx+"/product/deleteproductbyids", {ids:ids},
	            		function (data) {
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
	    		         		 $(".commonConfirm").modal('hide');
	    		     	         common.mySuccessModal2(data.message);
	    		     	         showProductByPage(1);
	    		         	}else{
	    		         		$(".updateMsg").html(data.message);
	    		         	}
	    		 },"json"); 
			});
		}
	});
	/**删除多个e*/
	
	/** 修改验证start **/
	$('#updateProductForm').validate({
        rules: {
            'name': {
                required: true 
            },
            'code': {
                required: true 
            },
            'originalprice': {
                required: true,
                number: true
            },
            'stock': {
                required: true,
                digits: true,
                min:0
            },
            'weight': {
                number: true
            },
            'price': {
                required: true,
                number: true
            }
        },
        messages: {
        	'name': {
     		    required: "请填写商品名称" 
     		 },
     		'code': {
                required: "请填写商品编号" 
            },
     		'originalprice': {
                required: "请填写商品市场价格",
                number: "请输入有效的数字"
            },
            'stock': {
            	required: "请填写商品库存数量",
            	digits: "请输入有效的整数",
            	min : "不能小于0"
            },
            'weight': {
                number: "请输入有效的数字"
            },
     		'price': {
     		    required: "请填写商品积分价格",
     		    number: "请输入有效的数字"
     		 }
        },
        errorClass: "error",
		success: 'valid',
		unhighlight: function(element, errorClass, validClass) { //验证通过
			$(element).tooltip('destroy').removeClass(errorClass);
		}, 
		errorPlacement: function(label, element) {
			$(element).tooltip('destroy'); /*必需*/
			$(element).attr('title', $(label).text()).tooltip('show');
		},
        onclick: true 
    });
	/** 修改验证end **/
	
$(document).on('click', '.updateproduct', function (e) { 
		
        var $this = $(this),
        parentTr = $this.parents('tr'),
        id = $this.data('id'),
        pageno = parentTr.data('pageno');
    	$(".updateMsg").html("");
    	$.getJSON(ctx + '/product/queryproductbyid', {
    		id : id
    	}, function(data) {
    		var result = data.result;
			if(result!=null && result=="noauthority") {
				common.alert1('你无此权限!');
				return;
			}
    		if(data==null || data.length <= 0){
    			$(".updateMsg").html("数据异常,请重试");
    		}else{
    			var product = data.product;
    			var imglist = data.imglist;
    			$("#updateProductForm").find("input[name='id']").val(product.id);
    			$('#updateProductForm').find("input[name='name']").val(product.name);
    			$('#updateProductForm').find("input[name='description']").val(product.description);
    			$('#updateProductForm').find("input[name='originalprice']").val(product.originalprice);
    			$('#updateProductForm').find("input[name='price']").val(product.price);
    			$('#updateProductForm').find("input[name='weight']").val(product.weight);
    			$('#updateProductForm').find("input[name='code']").val(product.code);
    			$('#updateProductForm').find("input[name='stock']").val(product.stock);
    			$('#updateProductForm').find("select[name='state']").val(product.state);
    			$('#updateProductForm').find("input[name='brandname']").val(product.brandname);
    			$("#updateProductForm").find("input[name='pageno']").val(pageno);
    			$("#updateProductForm").find("input[name='mainImg']").val('');
    			$("#productId").val(product.id);
    			if(imglist == null || imglist.length <= 0){
    				$('#resultupdate').html('');
    			}else{
    				var imghtml1 = "";
    				var imghtml2 = "";
    				for(var i=0;i<imglist.length;i++){
    					var productimg = imglist[i];
    					if(productimg.type == 1){
    						imghtml1 = '<img id='+productimg.id+' style="height: 90px" src="http://localhost:8080' + ctx + productimg.imgpath +'" />';
    					}else{
    						imghtml2 += '<img id='+productimg.id+' title=双击移除 ondblclick=removeImg('+productimg.id+') style="height: 90px" src="http://localhost:8080' 
    						+ ctx + productimg.imgpath +'" />&nbsp;&nbsp;&nbsp;';
    					}
    				}
    				$('#resultupdate').html(imghtml2);
    				$('#updateProductForm .mainshow').html(imghtml1);
    			}
    			$("#updateImgIds").val('');
    			imgupload();
    		}
    	});
    });

	/** 修改start **/
	$("#btn_updateProduct").click(function() {
    	var isValid = $("#updateProductForm").valid();
        if (isValid) { 	
        	var formData = new FormData($("#updateProductForm")[0]);
       	 	$.ajax({  
    			type : "post",  
    	        async:false,  
    	        url : ctx + "/product/updateproduct",  
    	        data : formData,
    	        dataType : "json",//数据类型为json  
    	        processData : false,  //必须false才会避开jQuery对 formdata 的默认处理   
    	        contentType : false,  //必须false才会自动加上正确的Content-Type
    	        success : function(data){ 
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
  	             		 $("#updateImgIds").val('');
  	             		 $(".modal-editNews").modal('hide');
  	         	         common.mySuccessModal2(data.message);
  	         	         var pageno = $("#updateProductForm").find("input[name='pageno']").val();
  	         	         showProductByPage(pageno);
	             	}else{
	             		$(".updateMsg").html(data.message);
	             	}
	    	    },  
    	        error:function(){  
    	        	console.log('fail');  
    	        }  
	    	 });
        }  
	});
	/** 修改end **/
	
	function imgupload(){
		var productId = $("#productId").val();
		$.Tupload.init({
			url: "product/saveproductpic?productId=" + productId,
			title	  : "宝贝图片大小不能超过500kb,为使避免图片上传出现问题，请尽量选择完毕图片后再上传",
			fileNum: 8, // 上传文件数量
			divId: "T_upload", // div  id
			accept: "image/jpeg,image/x-png", // 上传文件的类型
			fileSize  :51200000,     // 上传文件的大小
			onSuccess: function(data, i) {
				var temp =eval('(' + data.currentTarget.response + ')')
				if(temp.fileName != undefined){
					$("#img_src"+i).attr('value',temp.fileName);
					$("#img_src"+i).attr('name',"upload_img");
				}
			},
			onDelete: function(i) {
				var img_val = $("#img_src"+i).attr("value");
				if(img_val != '' && img_val != undefined){
					var md = "product";
					var img= $.page.getImgUrl(img_val);
					$.ajax({
						type:"POST",
						url: "base/delPic" ,
						data : {img:img,id: pid,md:md},
						success: function(rel){}
					});
				}
			}
		});
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
	
	$("#addshopForm").on('change','.mainImg',function(e){
		for (var i = 0; i < e.target.files.length; i++) {    
	        var file = e.target.files.item(i); 
	        if (!(/^image\/.*$/i.test(file.type))) {    
	            common.alert1("您选择的不是图片，请重新选择");
	            $("#addshopForm .#mainImg").val('');
	            $("#addshopForm .mainshow").html('');
	            return;
	        }    
	        //实例化FileReader API    
	        var freader = new FileReader();    
	        freader.readAsDataURL(file);    
	        freader.onload = function(e) {    
	        	$("#addshopForm .mainshow").html('<img style="height: 90px" src="' + e.target.result +'" alt="" />&nbsp;&nbsp;&nbsp;');
	        }    
	    }
	});
	
	$("#updateProductForm").on('change','.mainImg',function(e){
		for (var i = 0; i < e.target.files.length; i++) {    
	        var file = e.target.files.item(i); 
	        if (!(/^image\/.*$/i.test(file.type))) {    
	            common.alert1("您选择的不是图片，请重新选择");
	            $("#updateProductForm .#mainImg").val('');
	            $("#updateProductForm .mainshow").html('');
	            return;
	        }    
	        //实例化FileReader API    
	        var freader = new FileReader();    
	        freader.readAsDataURL(file);    
	        freader.onload = function(e) {    
	        	$("#updateProductForm .mainshow").html('<img style="height: 90px" src="' + e.target.result +'" alt="" />&nbsp;&nbsp;&nbsp;');
	        }    
	    }
	});
	
});

function removeImg(t) {
	var o=document.getElementById("resultupdate");//获取父节点
	var a=document.getElementById(t);//获取需要删除的子节点
	o.removeChild(a)//从父节点o上面移除子节点a
	var ids = $("#updateImgIds").val() + t+",";
	$("#updateImgIds").val(ids);
} 
/*e*/

