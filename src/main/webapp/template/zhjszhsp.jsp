<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
%>
<link rel="stylesheet" href="<%=path%>/css/glsmcx.css" type="text/css" />
<script type="text/javascript" src="<%=path%>/js/controllers/zhjszhspCtrl.js"></script>
<div class="glsmcxWrap">
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">账号角色转换审批</h3>
			</div>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">

					<div class="form-group">

						<div class="col-lg-21 clearfix">
							<label class="control-label labelPart">申请人：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" name="applyname-auery" placeholder="申请人姓名">
							</div>
						</div>
						<div class="col-lg-21 clearfix">
							<label class="control-label labelPart">审核状态：</label>
							<div class="colPart">
								<select name="status-query">
									<!--状态：（1：待审核；2：审核通过；3.审核不通过 -->
									<option value="">全部</option>
									<option value="1">待审核</option>
									<option value="2">审批通过</option>
									<option value="3">审核不通过</option>
								</select>
							</div>
						</div>						
						<div class="col-lg-52 time clearfix">
							<label class="control-label labelPart">申请时间：</label>
							<div class="input-daterange input-group start ">
								<input type="text" class="input input-sm form-control" id="date-start" name="starttime-query" placeholder="起始时间" readonly="readonly"/> 
								<span class="input-group-addon">至</span> 
								<input type="text" class="input input-sm form-control" id="date-end" name="endtime-query" placeholder="结束时间" readonly="readonly"/>
							</div>
						</div>
						<div class="col-lg-37 more clearfix">
							<button type="button" class="searchBtn">搜索</button>
							<button type="button" class="clearBtn">清空</button>
						</div>
					</div>
	
					<div class="table-responsive">
						<table class="table table-bordered check left">
							<thead>
								<tr>
									<!-- <th>
										<div class="checkbox">
											<label>全选<input type="checkbox" class="all" /></label>
										</div>
									</th> -->
									<th>序号</th>
									<th>申请人</th>
									<th>手机号</th>
									<th>身份证</th>
									<th>邮箱</th>
									<th>当前角色</th>
									<th>申请角色</th>
									<th>申请提交时间</th>
									<th>状态</th>
									<th>审核人</th>
									<th>审核时间</th>
									<th>备注</th>
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
			<input type="hidden" class="currentPageNo" />
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

<div class="modal fade modal-examine" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<h4 id="myModalLabel">填写账号升级审核意见</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" novalidate="novalidate" id="agreeApplyForm">
					<div class="form-group">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">申请人：</label> 
							<div class="col-sm-81">
								<input readonly="readonly" name="applyname" class="form-control input-sm"/> 				
								<input type="hidden" name="id"/>
								<input type="hidden" name="status"/>
							</div>				
						</div>
					</div>
					<div class="form-group">
						<div class="col-lg-123 clearfix">
							<label class="col-sm-41 control-label">审批意见：</label>
							<div class="col-sm-81">
								<textarea class="form-control" name="remark" rows="5" placeholder="输入意见详情"></textarea>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<span class="errorMsg red msg"></span>
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-primary" id="btn-agreeApply">保存</button>
			</div>
		</div>
	</div>
</div>