<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
%>
<!DOCTYPE html>
<html> 
<head>
	<meta charset="UTF-8">
	<title ng-bind="title">天联网后台</title>
	<meta name="keywords" content="天联物流云" />
	<meta name="description" content="天联智慧物联平台" /> 
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="Content-Type" content="text/html;"> 
	<meta name="viewport" content=" width=device-width, initial-scale=1.0">
	<!--文件支持一下类型的数据  app  XHTML xml-->
	<meta content="application/xhtml+xml" http-equiv="Content-Type">
	<!--让页面不缓存，每次访问都到服务器获取数据 -->
	<meta content="no-cache,must-revalidate" http-equiv="Cache-Control">
	<!--禁止浏览器从本地客户端缓存中获取数据-->
	<meta content="no-cache" http-equiv="pragma">
	<!--网页的到期时间，是0，页面不缓存-->
	<meta content="0" http-equiv="expires">
	
	
	<link type="image/x-icon" rel="shortcut icon" href="<%=path%>/img/we-title.ico">	
	<link rel="stylesheet" href="<%=path%>/css/bootstrap.css"	/>
	<link rel="stylesheet" href="<%=path%>/css/tlscindex.css" type="text/css" />
	
	<script type="text/javascript" src="<%=path%>/js/libs/jquery-1.12.4.js"></script>
	<script type="text/javascript">
		var ctx="<%=path%>";
	</script>
	
	<script type="text/javascript">
				
				
				</script>
</head> 
<script>
	var tabItems = ['首页'];
</script>
<body> 

	<script type="text/javascript" src="<%=path%>/js/libs/require.js"></script>
	<script type="text/javascript" src="<%=path%>/js/main.js" ></script>
	<script type="text/javascript" src="<%=path%>/js/common/jquery.md5.js" ></script>
	<script type="text/javascript" src="<%=path%>/js/views/index.js"></script>
	
	<div class="header1">
		<div class="logo"></div>
		<div class="admin">
			<span class="ico"></span>${_adminuser.nickname}<span class="rec"></span>
			<ul class="forAdmin">
				<li class="set"><a href="#!/message"><i></i>账号设置</a></li>
				<li class="exit"><a href="<%=path%>/staff/loginout"><i></i>退出系统</a></li>
			</ul>
		</div>
		<div class="msg1">
			<a href="#!/wtjcx">信息提示<span class="tonum">0</span></a>
		</div> 
	</div>

	<div class="content clearfix">
	    
	    <div class="main">
			<div class="navtab">
				<div class="l-tab-links-left"></div>
				<div class="l-tab-links-right"></div>
				<ul class="clearfix">
					<li class="active homepage"><a href="#!/home">首页</a></li>					
				</ul>								
			</div>
			<div class="main-content">
				<div ng-view ></div>
			</div>
		</div>

		<div class="sidebar1" id="sidebar">
		
			<h3 class="home">
				<a href="#!/home"><span class="ico"></span>首页</a>
			</h3>
			<div class="accordion" id="subsidebar">
				
				<!-- <h3 class="order">
					<span class="ico"></span><i class="re"></i>订单管理
				</h3>
				<div>
					<ul>
						<li><a href="#!/ddgl">订单管理</a></li>
						<li><a href="#!/ddzz">订单追踪</a></li>
						<li><a href="#!/jgxlcx">价格，线路查询</a></li>
					</ul>
				</div> -->
				
				
				
				
			</div>
			
		</div>
	</div>
	
	<div class="footer">
		<p>Copyright&copy;天联网|粤ICP备16010206号-1</p>
	</div>
</body>
</html>