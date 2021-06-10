/**
 * 
 */
require([ 'jquery', 'validate', 'messages', 'bootstrap' ], function($) {

	$("#loginForm").on("load",function(){
		//loginInp();
	});
	$('.password,.username').on('focus', function() {
		$(this).css('border-color', '#ef6d44');
	});
	$('.password,.username').on('blur', function() {
		$(this).css('border-color', '#d0cfcf');
	});
	/*$('.username').on('blur', function() {
		getPwdAndChk();
	});*/
	$(function() {
		
		var id = $("#id").val();
		if(id != "" && id != null && id != undefined && id.length > 0) {
			alert("您已经处于登录状态");
			location.href = ctx + "/index.jsp";
		}
		
		$('#loginForm').validate({
			rules : {
				'loginname' : {
					required : true,
					minlength : 3
				},
				'password' : {
					required : true,
					minlength : 6
				}
			},
			messages : {
				'loginname' : {
					required : "请输入用户名",
					minlength : "用户名不能小于{0}个字符"
				},
				'password' : {
					required : "请输入密码",
					minlength : "密码不能小于{0}个字符"
				}
			},
			errorClass : "error",
			success : 'valid',
			ignore : '.ignore',
			unhighlight : function(element, errorClass, validClass) { // 验证通过
				$(element).tooltip('destroy').removeClass(errorClass);
			},
			// highlight: function (element, errorClass, validClass) { //未通过验证
			// // TODO
			// }
			// ,
			errorPlacement : function(label, element) {
				$(element).tooltip('destroy'); /* 必需 */
				$(element).attr('title', $(label).text()).tooltip('show');
			},
			onclick : true
		});

		$(".loginBtn").on("click", function() {
			login();
		});
		
		$(".username,.password").keypress(
			function(e) {
				var keyCode = e.keyCode ? e.keyCode : e.which ? e.which	: e.charCode;
				if (keyCode == 13) {
					login();
				}
		});

	});
	
	//后台登陆操作
	function login() {
		var isValid = $('#loginForm').valid();
		if (isValid) {
			var loginname=$("#loginname").val();
			var password=($("#password").val().length==32 ? $("#password").val():MD5($("#password").val()).toUpperCase());
			$.post(ctx + "/staff/confirmlogin", {
				loginname : loginname,
				password : password
			}, function(result) {
				if (result == "success") {
					location.href = ctx + "/index.jsp";
				} else {
					$(".warn").css('visibility', 'visible');
				}
			});
		}
	}


	// 登录框焦点事件
	function loginInp() {
		var loginname = getCookieValue('loginname');
		$("#loginname").val(loginname);
		if (loginname != "") {
			$("#password").focus();
		}

		if (typeof ($("#remainpass")) != "undefined") {
			var password = getCookieValue('password');
			$("#password").val(password);
			if (password != "") {
				$("#remainpass").checked = true;
			}
		}
	}

	/**
	 * 用戶名失去焦点时调用
	 */
	function getPwdAndChk() {
		var pwd = getCookieValue('password');
		if (pwd != "") {
			$('#remainpass')[0].checked = true;
			$("#password").val(pwd);
		} else {
			$('#remainpass')[0].checked = false;
			$("#password").val("");
		}
	}

	function setCookie(userName, userValue, hours, path) {
		var name = escape(userName);
		var value = escape(userValue);
		var expires = new Date();
		expires.setTime(expires.getTime() + hours * 3600000);
		path = path == "" ? "" : ";path=" + path;
		_expires = (typeof hours) == "string" ? "" : ";expires="
				+ expires.toUTCString();
		document.cookie = name + "=" + value + _expires + path;
	}
	
	function getCookieValue(userName) {
		var name = escape(userName);
		var allcookies = document.cookie;
		name += "=";
		var pos = allcookies.indexOf(name);
		if (pos != -1) {
			var start = pos + name.length;
			var end = allcookies.indexOf(";", start);
			if (end == -1)
				end = allcookies.length;
			var value = allcookies.substring(start, end);
			return unescape(value);
		} else
			return "";
	}
	function deleteCookie(userName, path) {
		var name = escape(userName);
		var expires = new Date(0);
		path = path == "" ? "" : ";path=" + path;
		document.cookie = name + "=" + ";expires=" + expires.toUTCString()
				+ path;
	}
});