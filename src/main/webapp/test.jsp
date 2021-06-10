<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<title></title>

<script type="text/javascript" src="<%=path%>/js/libs/jquery-1.12.4.js"></script>
<script type="text/javascript">
	var ctx="<%=path%>";
	$(function() { 
		$('#loginBtn').on('click', function() {
			var un = $("#username").val();
			var pw = $("#password").val();
			$.post(ctx + "/testcontroller/login", {
				username : un,
				password : pw
			}, function(data) {
				alert(data);
			});
		});

	});
</script>
<body>
	<input type="text" id="username" />
	<input type="text" id="password" />
	<input type="button" id="loginBtn" value="登录">
</body>
