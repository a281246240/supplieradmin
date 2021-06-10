<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
%>
<script type="text/javascript" src="<%=path%>/js/controllers/xnzhlbCtrl.js" ></script>
<script type="text/javascript" src="<%=path%>/js/common/jquery.table2excel.js"></script>
<link rel="stylesheet" href="<%=path%>/css/glsmcx.css" type="text/css" />
<div class="glsmcxWrap"> 
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">虚拟账号列表</h3>
			</div>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">
					<div class="form-group">
						<div class="col-lg-31 clearfix">							
						<label class="control-label labelPart">子账户名：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
								id="subaccountname1_input" placeholder="子账户名">
							</div>
						</div>
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">用户名：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
								id="nickname_input" placeholder="用户名">
							</div>	
						</div>					
						<div class="col-lg-31 clearfix">							
							<label class="control-label labelPart">账号状态：</label>							
							<div class="colPart">
								<!-- 账号状态(0.未开通1.启用2.冻结3.待注销) -->
								<select name="status-select">
									<option value="">请选择</option>
									<option value="0">未开通</option>
									<option value="1">启用</option>
									<option value="2">冻结</option>
									<option value="3">待注销</option>
								</select>
							</div>
															
						</div>
						<div class="col-lg-34 more clearfix">
							<div class="morePart"><span>更多筛选</span>&nbsp;</div>														
							<button type="button" class="searchBtn">查询</button>	
							<button type="button" class="clearBtn">清空</button>					
						</div>
					</div>
					<div class="form-group distant">
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">联系人：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
								id="contactname_input" placeholder="联系人姓名">
							</div>							
						</div>
						
						<div class="col-lg-31 clearfix">							
						<label class="control-label labelPart">联系人电话：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
								id="contactphone_input" placeholder="联系人电话">
							</div>
						</div>
						<div class="col-lg-31 clearfix">							
							<label class="control-label labelPart">开户行：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
								id="bank_input" placeholder="开户行">
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
									<th>用户名</th>
									<th>虚拟子账户</th>
									<th>子账户名</th>
									<th>账号状态</th>
									<th>联系人</th>
									<th>联系人电话</th>
									<th>开户行</th>
									<th>虚拟账号余额</th>	
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



