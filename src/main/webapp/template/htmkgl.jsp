<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()	+ path + "/";
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
%>

<script type="text/javascript">
	var ctx="<%=path%>";
</script>
<link rel="stylesheet" href="<%=path%>/css/glsmcx.css" type="text/css" />
<script type="text/javascript" src="<%=path%>/js/controllers/htmkglCtrl.js"></script>

<div class="glsmcxWrap">
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">后台模块管理</h3>
			</div>
			<input id="queryType" value="ht" style="display:none;"></input>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">

					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">模块名称：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" id="name_input" placeholder="输入模块名称">
							</div>
						</div>
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">模块类型：</label>
							<div class="colPart">
								<select name="type_input">
									<option value="">请选择</option>
									<option value="1">分组</option>
									<option value="2">模块</option>
									<option value="4">操作</option>
								</select>
							</div>
						</div>
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">是否显示：</label>
							<div class="colPart">
								<select name="ispage_input">
									<option value="">请选择</option>
									<option value="1">显示</option>
									<option value="0">不显示</option>
								</select>
							</div>
						</div>
						<!-- <div class="col-lg-31 clearfix">
							<label class="control-label labelPart">是否拦截：</label>
							<div class="colPart">
								<select name="value_input">
									<option value="">请选择</option>
									<option value="1">拦截</option>
									<option value="2">不拦截</option>
								</select>
							</div>
						</div> -->
						
						<div class="col-lg-34 more clearfix">
							<div class="morePart"><span>更多筛选</span>&nbsp;</div>
							<button type="button" class="searchBtn">查询</button>	
							<button type="button" class="clearBtn">清空</button>					
						</div>
					</div>
					<div class="form-group distant">
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">是否拦截：</label>
							<div class="colPart">
								<select name="value_input">
									<option value="">请选择</option>
									<option value="1">拦截</option>
									<option value="2">不拦截</option>
								</select>
							</div>
						</div>
					</div>
					<ul class="clearfix listwork">
						<li data-target=".modal-add" data-toggle="modal" class="add clearfix" id="addgroup"><i></i>增加</li>
						<li class="del delete-batch clearfix" id="deleteMany"><i></i>删除</li>
					</ul>
					
					<div class="table-responsive">
						<table class="table table-bordered gltable check left">
							<thead>
								<tr>
									<th> 
										<div class="checkbox">
									    	<label>全选<input type="checkbox" class="all" /></label>
									    </div>
									</th>
									<th>模块名称 </th>
									<!-- <th>模块权限</th> -->
									<!-- <th>模块上级</th> -->
								    <th>模块类型</th>
									<th>模块是否显示</th>
									<th>uri</th>
									<th>模块参数名</th>
									<th>模块类名</th>
									<th>是否拦截</th>
									<th>模块权限描述</th>
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

	
<!-- 添加分组和模块s -->
<div class="modal fade modal-add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<h4 id="myModalLabel">添加</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" novalidate="novalidate" id="addNewsForm">
					
					<input type="hidden" name="parentid" value="-1" >
					<input type="hidden" name="type" value="1" >

					<div class="form-group">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">模块名称：</label>
							<div class="col-sm-81">
								<input type="text" name="name" class="form-control input-sm" placeholder="">
							</div>
						</div>

						<div class="col-lg-61">
							<label class="col-sm-41 control-label">模块是否显示：</label>
							<div class="col-sm-81">
								<select name="ispage" >
									<option value="1">是</option>
									<option value="0">否</option>
								</select>
							</div>
						</div>
					</div>	
					<div class="form-group">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">uri：</label>
							<div class="col-sm-81">
								<div class="col-sm-81">
									<input type="text" name="uri" class="form-control input-sm" placeholder="">
								</div>
							</div>
						</div>
						
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">参数名：</label>
							<div class="col-sm-81">
								<input type="text" name="parameter" class="form-control input-sm" placeholder="">
							</div>
						</div>
					</div>	
					<div class="form-group">	
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">类名：</label>
							<div class="col-sm-81">
								<input type="text" name="classname" class="form-control input-sm" placeholder="">
							</div>
						</div>
						
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">模块权限描述：</label>
							<div class="col-sm-81">
								<input type="text" name="description" class="form-control input-sm" placeholder="">
							</div>
						</div>
					</div>	
					<div class="form-group">	
						<div id="addDiv" class="col-lg-61">
							 
							 	 
						</div>
					</div>
					
					<input name="reset" type="reset" style="display:none;" />

				</form>
			</div>
			<div class="modal-footer">
				<span  class="errorMsg red"></span>
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-primary" id="btn_addnews">保存</button>
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
				<h4 id="myModalLabel">修改模块</h4>

			</div>
			<div class="modal-body">
				<form class="form-horizontal" novalidate="novalidate" id="updateNewsForm">
				
					<div class="form-group">
						
						<input type="hidden" name="id" value="">
						
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">模块名称：</label>
							<div class="col-sm-81">
								<input type="text" name="name" class="form-control input-sm" placeholder="模块名称">
							</div>
						</div>
						
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">模块是否显示：</label>
							<div class="col-sm-81">
								<select name="ispage" >
									<option value="1">是</option>
									<option value="0">否</option>
								</select>
							</div>
						</div>
					</div>
					<div class="form-group">	
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">uri：</label>
							<div class="col-sm-81">
								<div class="col-sm-81">
									<input type="text" name="uri" class="form-control input-sm" placeholder="模块uri">
								</div>
							</div>
						</div>
						
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">参数名：</label>
							<div class="col-sm-81">
								<input type="text" name="parameter" class="form-control input-sm" placeholder="参数名">
							</div>
						</div>
					</div>
					<div class="form-group">		
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">类名：</label>
							<div class="col-sm-81">
								<input type="text" name="classname" class="form-control input-sm" placeholder="请输入类名">
							</div>
						</div>
						
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">模块权限描述：</label>
							<div class="col-sm-81">
								<input type="text" name="description" class="form-control input-sm" placeholder="模块权限描述">
							</div>
						</div>
					</div>
					<div class="form-group">	
						<div id="updateDiv" class="col-lg-61" >
							 <!-- <label class="col-sm-41 control-label">模块权限：</label>
							 <div class="col-sm-81">
					  			 <select name="value" >
					  			 	 <option value="">是否拦截</option>
						  			 <option value="1">拦截</option>
						  			 <option value="2">不拦截</option>
					  			 </select>
				  			 </div> -->
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<span  class="errorMsg red updateMsg"></span>
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-primary" id="btn_updateNews">保存</button>
			</div>
		</div>
	</div>
</div>
<!-- 修改e -->

