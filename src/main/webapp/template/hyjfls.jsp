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
<script type="text/javascript" src="<%=path%>/js/controllers/hyjflsCtrl.js" ></script>

<div class="glsmcxWrap">
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">会员积分流水</h3>
			</div>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">

					<div class="form-group">					
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">会员名称：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
									name="vipname-query" placeholder="会员名称">
							</div>
						</div>						
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">登录名：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
									name="viploginname-query" placeholder="登录名">
							</div>
						</div>
						<div class="col-lg-34 more clearfix">
							<button type="button" class="searchBtn">搜索</button>
							<button type="button" class="clearBtn">清空</button>
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
									<th>会员名称</th>
									<th>登录名</th>
									<th>会员积分</th>
									<th>赠送积分</th>
									<th>可提现积分</th>
									<th>锁定积分</th>
									<th>股权积分</th>
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
		
	<input type="hidden" class="detailVipId" />
	<input type="hidden" class="detailVipName" />
		<!-- 积分详情start -->
		<div class="modal fade modal-details" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 id="myModalLabel">会员积分流水</h4>
					</div>
							
					<ul class="clearfix listwork">
						<li class="print clearfix" onclick="exportExcel2();"><i></i>导出</li>
					</ul>		
					<div class="modal-body">
						<form method="post" action="#" class="form-horizontal" role="form">						
							<div class="table-responsive">
								<table class="table table-bordered">
									<thead>
										<tr>
										    <th>序号</th>
											<th>积分类型</th>
											<th>变动分值</th>
											<th>会员积分结余</th>
											<th>赠送积分结余</th>
											<th>可提现积分结余</th>
											<th>备注</th>
											<th>创建时间</th>
										</tr>
									</thead>
		
									<tbody id="dataBodyDetail">
										 
									</tbody>
								</table>
							</div>
						</form>					
						<div class="clearfix pageBottom">		
							<div class="record-wrapper page" role="status" aria-live="polite">
								当前<span class="pageNoDetail"> </span>/<span class="totalPagesDetail"> </span>页，每页
								<label class="inline">
									<select name="dataTable_length" 
										class="form-control input-sm setTableLengthScoreflow" aria-controls="dataTable">
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
								</label>&nbsp;条记录,共<span class="record-wrapper totalCountDetail">0</span>条记录
							 </div>
							
							<nav>
								<!-- 这里显示分页 -->
								<div id="PaginationDetail" class="pagination"></div>
							</nav>
						</div>									
					</div>	
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					</div>
				</div>
			</div>
		</div>
		<!-- 积分详情end -->
	</div>
</div>

	
