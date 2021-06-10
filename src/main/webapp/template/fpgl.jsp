<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
%>
<link rel="stylesheet" href="<%=path%>/css/glsmcx.css" type="text/css" />
<script type="text/javascript" src="<%=path%>/js/common/jquery.table2excel.js"></script>
<script type="text/javascript" src="<%=path%>/js/controllers/fpglCtrl.js"></script>
<div class="glsmcxWrap">
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">发票管理</h3>
			</div>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">

						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">红冲状态：</label>
							<div class="colPart">
								<select name="status-query">
									<!--状态：（1：待红冲；2：已红冲 -->
									<option value="">全部</option>
									<option value="0">待红冲</option>
									<option value="1">已红冲</option>
								</select>
							</div>
						</div>
					
						<div class="col-lg-52 time clearfix">
							<label class="control-label labelPart">查询时间：</label>
							<div class="input-daterange input-group">
								<input type="text" class="input input-sm form-control"
									id="date-start" placeholder="起始时间" readonly="readonly" /> <span
									class="input-group-addon">至</span> <input type="text"
									class="input input-sm form-control" id="date-end"
									placeholder="结束时间" readonly="readonly" />
							</div>
						</div> &nbsp &nbsp  &nbsp &nbsp 
						<div class="col-lg-34 more clearfix">
							<button type="button" class="searchBtn">搜索</button>
							<button type="button" class="clearBtn">清空</button>
						</div>
						
						
					<div class="table-responsive">
					<table id="invoiceCount" class="table table-bordered check left">
						<thead>
							<tr>
								<th>发票总份数（张）</th>
								<th>金额合计（元）</th>
								<th>税额合计（元）</th>
								<th>价税合计（元）</th>
								<th>开票纳税人合计（个）</th>
							</tr>
						</thead>
						<tbody id="dataBodyCount">

						</tbody>
					</table>
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
									<!-- <th>发票订单号</th> -->
									<th>开票人</th>
									<th>发票代码</th>
									<th>发票号码</th>
									<th>购方名称</th>
									<th>购方税号</th>
									<th>发票金额（元）</th>
									<th>发票日期</th>
									<th>开票结果</th>
									<th>红冲标志</th>
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

