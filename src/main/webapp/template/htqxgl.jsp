<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()+ path + "/";
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
%>
<link rel="stylesheet" href="<%=path%>/css/htqxgl.css" type="text/css" />
<script type="text/javascript" src="<%=path%>/js/controllers/qxjsglCtrl_detail.js" ></script>

<div class="glsmcxWrap">
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">后台权限管理--<span id="rolename"></span></h3>
				<ul>
					<li class="goback">返回</li>
					<li class="checknow">全选(当前页)</li>
					<li class="nothingnow">全否(当前页)</li>
					<li class="all">全选</li>
					<li class="nothing">全否</li>
					<li class="saveall">保存</li>
				</ul>
			</div>
			<input id="queryType" value="ht" style="display:none;"></input>
			
			<!-- 后台权限模块列表 -->
			<ul id="myTab" class="nav nav-tabs">
				
			</ul>
			
			<!-- 权限模块详情 -->
			<div id="myTabContent" class="tab-content">
				
			</div>
	</div>
</div>
<script>
$(function () {
	$('#myTab li:eq(1) a').tab('show');
});
$('.panel-heading li').on('click',function(){
	$(this).siblings().css({'border':'none','color':'#428bca'})
	$(this).css({'border-left':'1px solid #ccc','border-right':'1px solid #ccc','color':'#333333'})
	
})
</script>