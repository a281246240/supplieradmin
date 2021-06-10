<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()	+ path + "/";
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
%>
<link rel="stylesheet" href="<%=path%>/css/glsmcx.css" type="text/css" />
<script type="text/javascript" src="<%=path%>/js/controllers/qxjsglCtrl.js"></script>

<div class="glsmcxWrap">
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">后台权限管理</h3>
			</div>
			<input id="queryType" value="ht" style="display:none;"></input>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">
					<ul class="clearfix listwork">
						<li data-target=".modal-add" data-toggle="modal" class="add clearfix"><i></i>增加</li>						
					</ul>
					<div class="table-responsive">
						<table class="table table-bordered ">
							<thead>
								<tr>
									<th>角色名称 </th>
									<th>角色值</th>
								    <th>角色描述</th>
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

	
<!-- 添加s -->
<div class="modal fade modal-add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<h4 id="myModalLabel">后台用户角色</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" novalidate="novalidate" id="addRoleForm">

					<div class="form-group">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">角色名称：</label>
							<div class="col-sm-81">
								<input type="text" name="name" class="form-control input-sm" placeholder="角色名称">
							</div>
						</div>

						<div class="col-lg-61">
							<label class="col-sm-41 control-label">角色值：</label>
							<div class="col-sm-81">
								<input type="text" name="value" class="form-control input-sm" placeholder="输入角色值">
							</div>
						</div>
					</div>
					<div class="form-group">	
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">角色描述：</label>
							<div class="col-sm-81">
								<input type="text" name="description" class="form-control input-sm" placeholder="角色描述">
							</div>
						</div>

					</div>
					
				</form>
			</div>
			<div class="modal-footer">
				<span  class="errorMsg red"></span>
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-primary" id="btn_addrole">保存</button>
			</div>
		</div>
	</div>
</div>
<!-- 添加e -->