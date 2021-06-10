<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
%>
<script type="text/javascript" src="<%=path%>/js/controllers/hyjfhzCtrl.js" ></script>
<link rel="stylesheet" href="<%=path%>/css/glsmcx.css" type="text/css" />
<div class="glsmcxWrap"> 
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">会员积分汇总</h3>
			</div>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">

					<div class="form-group">

						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">会员名称：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
								id="orgname_input" placeholder="会员名称">
							</div>							
						</div>
						<div class="col-lg-31 clearfix">							
							<label class="control-label labelPart">资料类型：</label>
							
						 	<div class="colPart dropdown">
						 		<input type="hidden" class="input-hidden input-sm" value="" name="proidQuery">	
								<input type="text" class="input-sm form-control" value="" name="proidQuery" data-toggle="dropdown" >	
								<ul class="dropdown-menu" id="provinceQuery">
									<li><a href="javascript:;">11111</a></li>
								</ul>
															
							</div>								
						</div>
						<div class="col-lg-31 clearfix">							
							<label class="control-label labelPart">提现账号：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
								id="orgname_input" placeholder="提现账号">
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
						<label class="control-label labelPart">登录名：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
								id="orgname_input" placeholder="会员名称">
							</div>
						</div>
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">推荐人：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
								id="orgname_input" placeholder="推荐人姓名">
							</div>							
						</div>
						
						<div class="col-lg-31 clearfix">							
						<label class="control-label labelPart">推荐码：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
								id="orgname_input" placeholder="输入推荐码">
							</div>
						</div>
						<div class="col-lg-38 clearfix">							
							<label class="control-label labelPart3">广发虚拟账号：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
								id="orgname_input" placeholder="广发虚拟账号">
							</div>							
						</div>
						
					</div>				
					<div class="table-responsive">
						<table class="table table-bordered">
							<thead>
								<tr>
									<th>会员名称</th>
									<th>登录名</th>
									<th>B2B平台名称</th>
									<th>平台网址</th>
									<th>推荐码</th>
									<th>提现账号</th>
									<th>广发虚拟账号</th>
									<th>操作</th>	
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
