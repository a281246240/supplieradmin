<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
%>
<%-- <script type="text/javascript" src="<%=path%>/js/controllers/zxzfjlCtrl.js" ></script> --%>
<script type="text/javascript" src="<%=path%>/js/common/jquery.table2excel.js"></script>
<link rel="stylesheet" href="<%=path%>/css/glsmcx.css" type="text/css" />
<div class="glsmcxWrap"> 
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">帮助中心</h3>
			</div>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">

					<div class="form-group">				
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">用户姓名：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" name="vipname-query" placeholder="输入用户姓名">
							</div>
						</div>
						
						<div class="col-lg-31 clearfix">
						<!-- 交易用途：1.会员储值/2.保证金充值/4.VIP会员储值/8.白条还款/16.订单扣费/32.订单结算/64.平台提现/128.VIP承运商储值 -->
							<label class="control-label labelPart">支付用途：</label>
							<div class="colPart">
								<select name="useFor-query">
									<option value="">全部</option>
									<option value="1">会员储值</option>
									<option value="2">保证金充值</option>
									<option value="4">VIP会员储值</option>
									<option value="8">白条还款</option>
									<option value="16">订单扣</option>
									<option value="32">订单结算</option>
									<option value="64">平台提现</option>
									<option value="128">VIP承运商储值</option>
								</select>
							</div>
						</div>
						
						<div class="col-lg-31 clearfix">
						<!-- 交易类别(1.订单结算2.订单扣费8.银行充值4.平台提现 128.银联支付 256.支付宝支付 512.微信支付) -->
							<label class="control-label labelPart">支付方式：</label>
							<div class="colPart">
								<select name="tradeKind-query">
									<option value="">全部</option>
									<option value="1">订单结算</option>
									<option value="2">订单扣费</option>
									<option value="8">银行充值</option>
									<option value="4">平台提现</option>
									<option value="128">银联支付</option>
									<option value="256">支付宝支付</option>
									<option value="512">微信支付</option>
								</select>
							</div>
						</div>
						
						<div class="col-lg-34 more clearfix">
							<div class="morePart">
								<span>更多筛选</span>&nbsp;
							</div>
							<button type="button" class="searchBtn">搜索</button>
							<button type="button" class="clearBtn">清空</button>
						</div>
						
					</div>
					
					<div class="form-group distant">
					
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">公司名称：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" name="companyName-query" placeholder="输入公司名称">
							</div>
						</div>
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">	流水号：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" name="traceNo-query" placeholder="输入流水号">
							</div>
						</div>
						<div class="col-lg-52 time clearfix">
							<label class="control-label labelPart">记录时间：</label>
							<div class="input-daterange input-group">
								<input type="text" class="input input-sm form-control"
									id="date-start" placeholder="起始时间" readonly="readonly" /> <span
									class="input-group-addon">至</span> <input type="text"
									class="input input-sm form-control" id="date-end"
									placeholder="结束时间" readonly="readonly" />
							</div>
						</div>
						
					</div>
					
					<div class="table-responsive">
						<table class="table table-bordered left">
							<thead>
								<tr>
									<th>序号</th>
									<th>用户姓名</th>
									<th>公司名称</th>
									<th>支付用途</th>
									<th>支付金额</th>
									<th>对应积分值</th>
									<th>支付方式</th>
									<th>流水号</th>
									<th>记录时间</th>
									<th>详细信息</th>
								</tr>
							</thead>

							<tbody id="dataBody">
								 
							</tbody>
						</table>
						
						<table class="table2excel table table-bordered hide"> 
						
						</table>
					</div>
				</form>
			</div>
		</div>
		<div class="clearfix pageBottom">		
			<div class="record-wrapper page" role="status" aria-live="polite">
				当前<span class="pageNo"> </span>/<span class="totalPages"> </span>页，每页
				<label class="inline">
					<select name="dataTable_length" 
						class="form-control input-sm setTableLength" aria-controls="dataTable">
						<option selected="selected" value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
						<option value="100">100</option>
						<option value="200">200</option>
						<option value="300">300</option>
						<option value="400">400</option>
						<option value="500">500</option>
						<option value="1000">1000</option>
				</select> 
				</label>&nbsp;条记录,共<span class="record-wrapper totalCount">0</span>条记录
			</div>
			<nav>
				<!-- 这里显示分页 -->
				<div id="Pagination" class="pagination"></div>
			</nav>
		</div>

	</div>
</div>
