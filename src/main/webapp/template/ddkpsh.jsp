<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
%>
<script type="text/javascript" src="<%=path%>/js/controllers/ddkpshCtrl.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/jquery.table2excel.js"></script>
<link rel="stylesheet" href="<%=path%>/css/glsmcx.css" type="text/css" />
<div class="glsmcxWrap">
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">订单开票审核</h3>
			</div>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">

					<div class="form-group">

						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">客户类型：</label>
							<div class="colPart">
								<select name="inviceType-query">
									<!--状态：2：企业；1：个人 -->
									<option value="">全部</option>
									<option value="2">企业</option>
									<option value="1">个人</option>
								</select>
							</div>
						</div>

						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">发票状态：</label>
							<div class="colPart">
								<select name="status-query">
									<!--状态：0：未开发票；1：申请中；2：已开发票；3：申请被拒；4、审核中；5、发票红冲 -->
									<option value="">全部</option>
									<option value="0">未开发票</option>
									<option value="1">申请中</option>
									<option value="2">已开发票</option>
									<option value="3">申请被拒</option>
									<option value="4">审核中</option>
									<option value="5">发票红冲</option>
								</select>
							</div>
						</div>
						
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">订单号：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
									name="order-query" placeholder="订单号">
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
						
						<!-- <div class="col-lg-31 clearfix">
							<label class="control-label labelPart">开户名：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
									name="accountname-query" placeholder="开户名">
							</div>
						</div> -->
					
						<div class="col-lg-52 time clearfix">
							<label class="control-label labelPart">申请时间：</label>
							<div class="input-daterange input-group">
								<input type="text" class="input input-sm form-control"
									id="date-start" placeholder="起始时间" readonly="readonly" /> <span
									class="input-group-addon">至</span> <input type="text"
									class="input input-sm form-control" id="date-end"
									placeholder="结束时间" readonly="readonly" />
							</div>
						</div>
						
						
						
					</div>
					
					<ul class="clearfix listwork">
						<li class="print clearfix" id="exportExcelTab"><i></i>导出</li>
					</ul>
					<div class="table-responsive">
						<table class="table table-bordered check left">
							<thead>
								<tr>
									<th>操作</th>
									<th>序号</th>
									<th>订单号</th>
									<th>订单总额（元）</th>
									<th>实付款（元）</th>
									<th>发票申请时间</th>
									<th>开票对象</th>
									<th>对象名称</th>
									<th>状态</th>
									<th>经办人</th>
									<th>经办时间</th>
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
				<label class="inline"> <select name="dataTable_length"
					class="form-control input-sm setTableLength"
					aria-controls="dataTable">
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

