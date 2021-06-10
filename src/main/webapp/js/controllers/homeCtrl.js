require( [ 'jquery', 'common'],function($, common) {
	
	$('title').text('首页');
	
	$(document).ready(function() {
		
	});
	
	$(function(){
		showallhomeinformation();
//		showcountwithdrawals();
//		showstoredvalue();
//		showentryform();
//		showcountcredit();
	});
	
	function showallhomeinformation(){
		$.getJSON(ctx + '/statistics/showallinforamation', {	
			txstatus : 1,
			hyoptType : 1,
			hystatus : 1,
			rdstate : 1,
			btstatus : 1,
		},
		function(data){
			var datalist = data.result;
			if(data.result!=null && data.result=="againLogin") {
				common.alert1("登录过期，请重新登录");
					setTimeout("location.href = ctx + '/login.html'",1000);
   			} else if(datalist != null && datalist.length > 0) { //countValue
   					$('#withdrawals').html(isnull(datalist[0].countValue));
   					var cValue = parseFloat(isnumber(datalist[1].countValue)).toFixed(2);
   					$('#balance').html(cValue);
   					$('#rudan').html(isnull(datalist[2].countValue));
   					$('#baitiao').html(isnull(datalist[3].countValue));
   			} else{
   				$('#withdrawals').append('<div class="alert alert-warning no-result text-center" role="alert">没有找到记录 </div>');
				$('#balance').append('<div class="alert alert-warning no-result text-center" role="alert">没有找到记录 </div>');
				$('#rudan').append('<div class="alert alert-warning no-result text-center" role="alert">没有找到记录 </div>');
				$('#baitiao').append('<div class="alert alert-warning no-result text-center" role="alert">没有找到记录 </div>');
			} 
		}).fail(function (err) { 
			common.alert('服务器错误！请刷新页面重试或联系管理员',"确定"); 
        });
	}
	
//	function getStr(datapage){
//		if (datapage == null || datapage == '' || typeof (datapage) == "undefined"){
//			return "暂无记录";
//		}
//	}
	
/*	function showcountwithdrawals(){
		$.getJSON(ctx + '/statistics/showcountwithdrawals', {	
			status : 1,
		},
		function(data){  
			
			if(data.result!=null && data.result=="againLogin") {
				common.alert1("登录过期，请重新登录");
					setTimeout("location.href = ctx + '/login.html'",1000);
   			} else if(data.result.length == 0) { 
				$('#withdrawals').append('<div class="alert alert-warning no-result text-center" role="alert">没有找到记录 </div>');
            } else{
            	
   				var datapage = data.result;
   				if (datapage == null || datapage == '' || typeof (datapage) == "undefined"){
   					$('#withdrawals').html("暂无记录");
   				}else{
   					$('#withdrawals').html(datapage);
   				}
			} 
		}).fail(function (err) { 
			common.alert('服务器错误！请刷新页面重试或联系管理员',"确定"); 
        });
	}
	
	function showstoredvalue(){
		$.getJSON(ctx + '/statistics/showstoredvalue', {	
			optType : 1,
			status : 1,
		},
		function(data){  
			
			if(data.result!=null && data.result=="againLogin") {
				common.alert1("登录过期，请重新登录");
					setTimeout("location.href = ctx + '/login.html'",1000);
   			} else if(data.result.length == 0) { 
				$('#balance').append('<div class="alert alert-warning no-result text-center" role="alert">没有找到记录 </div>');
            } else{
            	
   				var datapage = data.result;
   				if (datapage == null || datapage == '' || typeof (datapage) == "undefined"){
   					$('#balance').html("暂无记录");
   				}else{
   					var s = parseFloat(datapage).toFixed(2);
   					$('#balance').html(s);
   				}
			} 
		}).fail(function (err) { 
			common.alert('服务器错误！请刷新页面重试或联系管理员',"确定"); 
        });
	}
	
	function showentryform(){
		$.getJSON(ctx + '/statistics/showentryform', {	
			state : 1,
		},
		function(data){  
			
			if(data.result!=null && data.result=="againLogin") {
				common.alert1("登录过期，请重新登录");
				setTimeout("location.href = ctx + '/login.html'",1000);
   			} else if(data.result.length == 0) { 
				$('#rudan').append('<div class="alert alert-warning no-result text-center" role="alert">没有找到记录 </div>');
            } else{
   				var datapage = data.result;
   				if (datapage == null || datapage == '' || typeof (datapage) == "undefined"){
   					$('#rudan').html("暂无记录");
   				}else{
   					$('#rudan').html(datapage);
   				}
			} 
		}).fail(function (err) { 
			common.alert('服务器错误！请刷新页面重试或联系管理员',"确定"); 
        });
	}
	
	function showcountcredit(){
		$.getJSON(ctx + '/statistics/showcountcredit', {	
			status : 1,
		},
		function(data){  
			
			if(data.result!=null && data.result=="againLogin") {
				common.alert1("登录过期，请重新登录");
				setTimeout("location.href = ctx + '/login.html'",1000);
   			} else if(data.result.length == 0) { 
				$('#baitiao').append('<div class="alert alert-warning no-result text-center" role="alert">没有找到记录 </div>');
            } else{
   				var datapage = data.result;
   				if (datapage == null || datapage == '' || typeof (datapage) == "undefined"){
   					$('#baitiao').html("暂无记录");
   				}else{
   					$('#baitiao').html(datapage);
   				}
			} 
		}).fail(function (err) { 
			common.alert('服务器错误！请刷新页面重试或联系管理员',"确定"); 
        });
	}*/
	
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