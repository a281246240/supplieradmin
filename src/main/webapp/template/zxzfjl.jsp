<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
%>
<script type="text/javascript" src="<%=path%>/js/controllers/zxzfjlCtrl.js" ></script>
<script type="text/javascript" src="<%=path%>/js/common/jquery.table2excel.js"></script>
<link rel="stylesheet" href="<%=path%>/css/glsmcx.css" type="text/css" />
<div class="glsmcxWrap"> 
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">在线支付记录</h3>
			</div>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">

					<div class="form-group">
					
						<!-- <div class="col-lg-32 clearfix">
							<label class="control-label labelPart">	流水号：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" name="traceNo-query" placeholder="输入流水号">
							</div>
						</div> -->

						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">用户姓名：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" name="vipname-query" placeholder="用户姓名">
							</div>
						</div>
						
						<div class="col-lg-31 clearfix">
						<!-- 支付状态：1.支付已完成；0.尚未支付；-1：无效的交易；2：交易异常； -->
							<label class="control-label labelPart">支付状态：</label>
							<div class="colPart">
								<select name="status-query">
									<option value="">全部</option>
									<option value="1">支付已完成</option>
									<option value="0">尚未支付</option>
									<option value="-1">无效的交易</option>
									<option value="2">交易异常</option>
								</select>
							</div>
						</div>
						
						<div class="col-lg-31 clearfix">
						<!-- 支付类型：1：支付宝；2：微信；3：银联；4：广发虚拟账号 -->
							<label class="control-label labelPart">支付类型：</label>
							<div class="colPart">
								<select name="payType-query">
									<option value="">全部</option>
									<option value="1">支付宝</option>
									<option value="2">微信</option>
									<option value="3">银联</option>
									<option value="4">广发虚拟账号</option>
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
					
						<!-- <div class="col-lg-31 clearfix">
							<label class="control-label labelPart">公司名称：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" name="companyName-query" placeholder="公司名称">
							</div>
						</div> -->
					
						<div class="col-lg-52 time clearfix">
							<label class="control-label labelPart">记录时间：</label>
							<div class="input-daterange input-group start ">
								<input type="text" class="input input-sm form-control"
									id="date-start" placeholder="起始时间" readonly="readonly" /> 
								<span class="input-group-addon">至</span> 
								<input type="text" class="input input-sm form-control" 
									id="date-end" placeholder="结束时间" readonly="readonly" />
							</div>
						</div>
						
					</div>
					
					<ul class="clearfix listwork">
						<li class="print clearfix" onclick="exportExcel();"><i></i>导出</li>
					</ul>
					<div class="table-responsive">
						<table class="table table-bordered">
							<thead>
								<tr>
									<th>序号</th>
									<th>用户姓名</th>
									<th>帐号</th>
									<th>支付状态</th>
									<th>支付类型</th>
									<th>充值金额（元）</th>
									<th>增加积分</th>
									<th>记录时间</th>
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

	
