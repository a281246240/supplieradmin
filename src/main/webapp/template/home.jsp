<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
%>
<script type="text/javascript" src="<%=path%>/js/controllers/homeCtrl.js"></script>
<link rel="stylesheet" href="<%=path%>/css/home.css" type="text/css" />
<div class="homeWrap">
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">统计概况</h3>
			</div>
			<div class="panel-body common">
				<div class="row">
					<div class="col-lg-31 text-center">
						<i class="pick"></i>
						<div>
							<p class="text-center num" id="withdrawals">
								<%-- <fmt:formatNumber type="number" value="${Organization.outbalance}" pattern="0.00" maxFractionDigits="2"/> --%>
							</p>
							<p class="text-center word">总订单数</p>
						</div>
						
					</div>
					<div class="col-lg-31 text-center">
						<i class="recharge"></i>
						<div>
						<p class="text-center num" id="balance">
							<%-- <fmt:formatNumber type="number" value="${Organization.balance}" pattern="0.00" maxFractionDigits="2"/> --%>
						</p>
						<p class="text-center word">总收入金额</p>
						</div>
					</div>
					<div class="col-lg-31 text-center">
						<i class="single "></i>
						<div>
						<p class="text-center num" id="rudan"></p>
						<p class="text-cente word">今日下单数</p>
						</div>
					</div>
					<div class="col-lg-31 text-center">
						<i class="send"></i>
						<div>
						<p class="text-center num" id="baitiao"></p>
						<p class="text-center word">当前总商品数</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-lg-41">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">订单管理</h3>
					</div>
					<div class="panel-body">
						  <table class="table">
								<tr>
									<th>项目</th>
									<th>本日</th>
									<th>本月</th>
								</tr>
								<tr>
									<td>订单总数</td>
									<td class="orange">100</td>
									<td class="orange">1000</td>
								</tr>
								<tr>
									<td>已签收数</td>
									<td class="orange">100</td>
									<td class="orange">1000</td>
								</tr>
						  </table>	
					</div>
				</div>
			</div>
			<div class="col-lg-41">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">结算管理</h3>
					</div>
					<div class="panel-body">
						 <table class="table">
								<tr>
									<th>项目</th>
									<th>今天</th>
									<th>总计</th>									
								</tr>
								<tr>
									<td>结算单总数</td>		
									<td class="orange numme1"> </td>							
									<td class="orange numme2"> </td>
								</tr>
								<tr>
									<td>异常单总数</td>
									<td class="orange numtome1"> </td>
									<td class="orange numtome2"> </td>
								</tr>
						  </table>		
					</div>
				</div>
			</div>
			<div class="col-lg-41">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">商品管理</h3>
					</div>
					<div class="panel-body">
						 <table class="table">
								<tr>
									<th>项目</th>
									<th>总计</th>									
								</tr>
								<tr>
									<td>待审核商品</td>
									<td class="orange">100</td>
								</tr>
								<tr>
									<td>异常商品</td>
									<td class="orange">100</td>
								</tr>
						  </table>		
					</div>
				</div>
			</div>
		</div>
		
</div>
</div>