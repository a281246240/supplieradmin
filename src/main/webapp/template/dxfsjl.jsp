<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
%>
<script type="text/javascript" src="<%=path%>/js/controllers/dxfsjlCtrl.js" ></script>
<script type="text/javascript" src="<%=path%>/js/common/jquery.table2excel.js"></script>
<link rel="stylesheet" href="<%=path%>/css/glsmcx.css" type="text/css" />
<div class="glsmcxWrap"> 
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">短信发送记录</h3>
			</div>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">

					<div class="form-group">

						<div class="col-lg-32 clearfix">
							<label class="control-label labelPart">	接收手机：</label>
							<div class="colPart">
								<input type="text" class="input-sm  form-control" name="mobile_query" placeholder="手机号码">
							</div>
						</div>
						
						<div class="col-lg-52 time clearfix">
							<label class="control-label labelPart">接收时间：</label>
							<div class="input-daterange input-group">
								<input type="text" class="input input-sm form-control"
									id="date-start" placeholder="起始时间" readonly="readonly" /> <span
									class="input-group-addon">至</span> <input type="text"
									class="input input-sm form-control" id="date-end"
									placeholder="结束时间" readonly="readonly" />
							</div>
						</div>
						
						<div class="col-lg-34 more clearfix">
							<button type="button" class="searchBtn">查询</button>
							<button type="button" class="clearBtn">清空</button>						
						</div>
					</div>
					
					
					<div class="table-responsive">
						<table class="table table-bordered">
							<thead>
								<tr>
									<th>序号</th>
									<th>短信编号</th>
									<th>接收手机</th>
									<th>内容</th>
									<th>短信有效条数</th>
									<th>创建时间</th>
									<th>状态</th>
									<th>创建人</th>
									<th>接收时间</th>
									<th>回复内容</th>
									<th>回复时间</th>
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
