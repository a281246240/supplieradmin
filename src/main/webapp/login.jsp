<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%> 
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%
		String path = request.getContextPath();
		String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";  
%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>供应商后台</title> 
		<link type="image/x-icon" rel="shortcut icon" href="<%= path%>/img/we-title.ico">
		<link rel="stylesheet" href="<%=path%>/css/login.css" />
		
	</head>
	<body>
		<script type="text/javascript">
			document.createElement('header');
			document.createElement('footer');
			document.createElement('section');
		</script>
		<header>
			<div class="wrap clearfix">
				<h1 class="logo"><a href="#"></a>供应商管理平台</h1>
			</div>
			
		</header>
		<section>
			<div class="content">
				<div class="wrap">
					<div class="box">
						<h2 class="title">供应商管理平台</h2>
						<p class="warn">用户名或密码错误</p>
						<form:form id="loginForm" method="post" action="#">
						 	<h1><form:errors path="*" /></h1><!-- path的值可以为 * ，表示显示所有错误 -->
        				 
							<input type="hidden" id="key">
							<div>
								<label for="username"><i class="user"></i></label>
								<input type="text" id="loginname" name="loginname" class="username" placeholder="请输入用户名" autocomplete="off" maxlength="100"/>	
							</div>
							<div>
								<label for="password"><i class="pwd"></i></label>
								<input type="password" id="password" name="password" class="password"  placeholder="请输入密码" maxlength="100"/>	
							</div> 				
							<input type="button" value="登录" class="loginBtn"/>
						</form:form>
					</div>
				</div>
			</div>
		</section>
		<input type="hidden" name="id" id="id" value="${_adminuser.id}">
		<footer>
			<p>Copyright&copy;供应商|备案号</p>
		</footer>
		
		<script type="text/javascript">
			var ctx="<%=path%>";
		</script>
		<script type="text/javascript" src="<%=path%>/js/libs/require.js"></script>
		<script type="text/javascript" src="<%=path%>/js/main.js" ></script>
		<script type="text/javascript" src="<%=path%>/js/common/jquery.md5.js" ></script>
		<script type="text/javascript" src="<%=path%>/js/views/login.js" ></script>
		
	</body>
</html>