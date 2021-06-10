require([  'jquery', 'common', 'validate','timepicker', 'pagination', 'bootstrap', 'dateZh' ], function($, app, common,validate) {

	$('title').text('帐号设置');
	
	 // 手机号码验证
   	$.validator.addMethod("isPhone", function(value, element) {
   	    var length = value.length;
   	    return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));
   	}, "手机号码格式不正确");
    
   	$(function(){
   		showsession();
   	});
   	
   	function showsession(){
   		$.post(ctx+"/staff/showsession",{},
          		 function(data){
   					var staff = data.staff;
          			if(data.result!=null && data.result=="againLogin") {
          				$(".warn").text("登录过期，请重新登录"); 
          				$(".warn").css('visibility','visible');
          				$(".success").css('visibility','hidden');
   						setTimeout("location.href = ctx + '/login.html'",1000);
                    }else if(staff != null){
                    	var status = staff.status;
                     	$("#status").val(status); 
       				}else{ 
       					$("#status").val(-1); 
       				}
   	 		},"json").fail(function (err) {
   	 			$(".warn").css('visibility','visible');
   	 			$(".warn").text("服务器错误！请刷新页面重试或联系管理员！"); 
   	 			$(".success").css('visibility','hidden');
                   log(err); 
               });
   	}
   	
    /**账户信息s**/
    $('#accountForm').validate({
        rules: {
            'realname': {
                required: true,
                minlength: 2
            },
            'username': { 
                required: true,
                minlength: 6
            } 
        }, 
        messages: {
        	'realname': {
     		    required: "姓名不能为空",
     		    minlength: "姓名不能小于{0}个字符"
     		 },
    	 	'username': {
    		    required: "登录帐号不能为空",
    		    minlength: "登录帐号不能小于{0}个字符"
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
		}
    });
    
    $("#saveAccount").on("click",function(){ 
    	saveAccount();
	});
    
    function saveAccount(){
    	 var isValid = $('#accountForm').valid();
       	 if(isValid){
       		 $.post(ctx+"/staff/updateinfo",$('#accountForm').serialize(),function(data){
       			if(data.result!=null && data.result=="againLogin") {
       				$(".warn").text("登录过期，请重新登录"); 
       				$(".warn").css('visibility','visible');
       				$(".success").css('visibility','hidden');
					setTimeout("location.href = ctx + '/login.html'",1000);
               	}else if(data.result == "success"){
               		$(".warn").css('visibility','hidden');
					$(".success").css('visibility','visible');
					$(".success").text("账户信息保存成功！"); 
				}else{ 
					$(".warn").css('visibility','visible');
					$(".warn").text(data.message); 
					$(".success").css('visibility','hidden');
				}
	 		},"json").fail(function (err) {
	 			$(".warn").css('visibility','visible');
	 			$(".warn").text("保存失败，请刷新重试！"); 
	 			$(".success").css('visibility','hidden');
                log(err);
            });
       	 }
    } 
    /**账户信息e**/
	
	 /**修改手机号s**/
    $('#telForm').validate({
        rules: {
            'oldphone': {
                required: true,
                isPhone:true,
                minlength: 11,
                maxlength: 11
            },
            'newphone': { 
            	 required: true,
	             isPhone:true,
	             minlength: 11,
	             maxlength: 11
            } 
        }, 
        messages: {
        	'oldphone': {
     		    required: "原手机号不能为空",
     		    minlength: "原手机号长度应为{0}位",
     		    maxlength: "原手机号长度应为{0}位"
     		 },
    	 	'newphone': {
    		    required: "新手机号不能为空",
    		    minlength: "新手机号长度应为{0}位",
    		    maxlength: "原手机号长度应为{0}位"
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
    
    $("#savePhone").on("click",function(){ 
    	savePhone();
	});
    
    function savePhone(){
    	 var isValid = $('#telForm').valid();
       	 if(isValid){
       		 $.post(ctx+"/staff/updatephone",$("#telForm").serialize(),
       		 function(data){
       			if(data.result!=null && data.result=="againLogin") {
       				$(".warn").text("登录过期，请重新登录"); 
       				$(".warn").css('visibility','visible');
       				$(".success").css('visibility','hidden');
						setTimeout("location.href = ctx + '/login.html'",1000);
                  	}else if(data.result == "success"){
                  		$(".success").text(data.message); 
 						$(".warn").css('visibility','hidden');
 						$(".success").css('visibility','visible');
    				}else{ 
    					$(".success").css('visibility','hidden');
 						$(".warn").css('visibility','visible');
 						$(".warn").text(data.message); 
    				}
	 		},"json").fail(function (err) {
	 			$(".warn").css('visibility','visible');
	 			$(".warn").text("服务器错误！请刷新页面重试或联系管理员！"); 
	 			$(".success").css('visibility','hidden');
                log(err); 
            });
       	 }
    }  
    /**修改手机号e**/
    
    
    /**修改密码s**/
    $('#pwdForm').validate({
        rules: {
            'oldpassword': {
                required: true,
                minlength: 6
            },
            'newpassword': { 
                required: true,
                minlength: 6
            },
            'confirm_newpassword': { 
                required: true,
                equalTo: "#newpassword",
                minlength: 6
            } 
        }, 
        messages: {
        	'oldpassword': {
     		    required: "原密码不能为空",
     		    minlength: "原密码不能小于{0}个字符"
     		 },
    	 	'newpassword': {
    		    required: "新密码不能为空",
    		    minlength: "新密码不能小于{0}个字符"
    		},
    	 	'confirm_newpassword': {
    		    required: "确认密码不能为空",
    		    equalTo: "两次密码输入不一致",
    		    minlength: "确认密码不能小于{0}个字符"
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
    
    $("#savePwd").on("click",function(){ 
    	savePwd();
	});

	function savePwd() {  
		console.log("savePwd/...");
		var key=$("#key").val();
		if(key==null||key==""){
			console.log("key==null||key==");
    		 //location.href=ctx+"/index.html";
		}else {
			var isValid = $('#pwdForm').valid();
			if (isValid) { 
				$.post(ctx + "/staff/updatepwd", {
					oldpassword : MD5(MD5($("#oldpassword").val()) + key),
					newpassword : MD5(MD5($("#newpassword").val()) + key),
					confirm_newpassword : MD5($("#confirm_newpassword").val()),
					key:key
				}, function(data) {
					if(data.result=="againLogin") {
						$(".warn").text("登录过期，请重新登录"); 
           				$(".warn").css('visibility','visible');
           				$(".success").css('visibility','hidden');
 						setTimeout("location.href = ctx + '/login.html'",1000);
           			}else if(data.result=="success"){
           				$(".success").text(data.message + "，将返回登录页面 . . ."); 
 						$(".warn").css('visibility','hidden');
 						$(".success").css('visibility','visible');
 						setTimeout("location.href = ctx + '/login.html'",1500);
 					}else{ 
 						$(".success").css('visibility','hidden');
 						$(".warn").css('visibility','visible');
 						$(".warn").text(data.message); 
 					}
				},"json").fail(function(err) {
					$(".warn").css('visibility','visible');
		 			$(".warn").text("服务器错误！请刷新页面重试或联系管理员！"); 
		 			$(".success").css('visibility','hidden');
	                log(err);
				});
			}
		}
	}  
    /**修改密码e**/
	
	$.post(ctx+"/staff/key",{},function(data){
		$("#key").val(data.key);
	});

});
