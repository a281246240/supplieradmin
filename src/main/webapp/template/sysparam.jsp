<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
%>
<script type="text/javascript" src="<%=path%>/js/controllers/sysparamCtrl.js" ></script>
<script type="text/javascript" src="<%=path%>/js/common/jquery.table2excel.js"></script>
<link rel="stylesheet" href="<%=path%>/css/glsmcx.css" type="text/css" />
<div class="glsmcxWrap"> 
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">系统参数管理</h3>
			</div>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">

					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">字段名：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" name="key" placeholder="输入字段名">
							</div>
						</div>
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">参数名：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" name="showname" placeholder="输入参数名">
							</div>
						</div>
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">描述：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" name="description" placeholder="输入描述">
							</div>
						</div>
						<div class="col-lg-37 more clearfix">
							<button type="button" class="searchBtn">查询</button>
							<button type="button" class="clearBtn">清空</button>						
						</div>
					</div>
					
					<ul class="clearfix listwork">
						<li data-target=".modal-add" data-toggle="modal" class="add clearfix"><i></i>增加</li>
						<li class="del delete-batch clearfix"><i></i>删除</li>
						<!-- <li class="print clearfix" onclick="exportExcel();"><i></i>打印</li> -->
					</ul>
					
					<div class="table-responsive">
						<table class="table table-bordered check">
							<thead>
								<tr>
									<th> 
										<div class="checkbox">
									    	<label>全选<input type="checkbox" class="all" /></label>
									    </div>
								    </th>
									<th>序号</th>
									<th>字段名</th>
									<th>值</th>
									<th>参数名</th>
									<th>描述</th>
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
				<h4 id="myModalLabel">系统参数</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" novalidate="novalidate" id="addSysparamForm">

					<div class="form-group">					
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">字段名：</label>
							<div class="col-sm-81">
								<input type="text" name="key" class="form-control input-sm" placeholder="请输入字段名">
							</div>
						</div>
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">值：</label>
							<div class="col-sm-81">
								<input type="text" name="value" class="form-control input-sm" placeholder="请输入登录帐号">
							</div>
						</div>
					</div>
					<div class="form-group">						
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">参数名:</label>
							<div class="col-sm-81">
								<input type="text" name="showname" class="form-control input-sm" placeholder="请输入联系方式">
							</div>
						</div>
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">描述：</label>
							<div class="col-sm-81">
								<input type="text" name="description" class="form-control input-sm" placeholder="请输入联系方式">
							</div>
						</div>						
					</div>					
				</form>
			</div>
			<div class="modal-footer">
				<span  class="errorMsg red"></span>
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-primary" id="btn_addsysparam">保存</button>
			</div>
		</div>
	</div>
</div>
<!-- 添加e -->

<!-- 修改s -->
<div class="modal fade modal-edit" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<h4 id="myModalLabel">修改系统参数</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" novalidate="novalidate" id="updateSysparamForm">
					
					<div class="form-group">					
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">字段名：</label>
							<div class="col-sm-81">
								<input type="text" name="key" class="form-control input-sm" placeholder="请输入字段名">
								<input type="hidden" name="id"/>
							</div>
						</div>
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">值：</label>
							<div class="col-sm-81">
								<input type="text" name="value" class="form-control input-sm" placeholder="登录帐号">
							</div>
						</div>
					</div>
					<div class="form-group">						
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">参数名:</label>
							<div class="col-sm-81">
								<input type="text" name="showname" class="form-control input-sm" placeholder="联系方式">
							</div>
						</div>
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">描述：</label>
							<div class="col-sm-81">
								<input type="text" name="description" class="form-control input-sm" placeholder="输入描述">
							</div>
						</div>						
					</div>
					
				</form>
			</div>
			<div class="modal-footer">
				<span  class="errorMsg red updateMsg"></span>
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-primary" id="btn_updatesysparam">保存</button>
			</div>
		</div>
	</div>
</div>
<!-- 修改e -->