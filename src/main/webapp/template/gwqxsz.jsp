<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
%>
<link rel="stylesheet" href="<%=path%>/css/htqxgl.css" type="text/css" />
<script type="text/javascript" src="<%=path%>/js/controllers/qxjsglCtrl_detail.js" ></script>
<div class="glsmcxWrap">
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">官网权限设置--<span id="rolename"></span></h3>
				<ul>
					<li class="goback">返回</li>
					<li class="checknow">全选(当前页)</li>
					<li class="nothingnow">全否(当前页)</li>
					<li class="all">全选</li>
					<li class="nothing">全否</li>
					<li class="saveall">保存</li>
				</ul>
			</div>
			<input id="queryType" value="gw" style="display:none;"></input>
			
			<!-- 官网权限 -->
			<ul id="myTab" class="nav nav-tabs">
				<!-- <li class="active">
					<a href="#vip" data-toggle="tab">会员中心</a></li>
				<li><a href="#admin" data-toggle="tab">管理中心</a></li>
				<li><a href="#order" data-toggle="tab">订单中心</a></li> -->
			</ul>
			<div id="myTabContent" class="tab-content">
				<!-- <div class="tab-pane fade in active" id="vip">
					<ul>
						<li>
							<input type="checkbox" />
							<span>我的订单</span>
							<div class="vip_details">
								<ul>
									<li>
										<input type="checkbox" />
							        	<span>我的订单查询</span>
							        </li>
									<li>
										<input type="checkbox" />
							        	<span>我的订单查询</span>
									</li>
								</ul>
							
							</div>
						</li>
						
					</ul>
				</div> -->
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