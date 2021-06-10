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
<script type="text/javascript" src="<%=path%>/js/controllers/yxjszhCtrl.js" ></script>
<div class="glsmcxWrap">
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">b2b营销角色审批</h3>
			</div>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">
					<input type="hidden" id="adminuserid" value=${_adminuser.id} />
					<input type="hidden" value=${_adminuser.role} id="currentUtype" />
					<div class="form-group">
					
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">用户姓名：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
									name="vipname-nickName" placeholder="用户姓名">
							</div>
						</div>
						
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">状态：</label>
							<div class="colPart">
								<select name="status-query">
									<option value="">全部</option>
									<option value="0">停用</option>
									<option value="1">启用</option>
									<option value="2">待审核</option>
									<option value="3">审核不通过</option>
								</select>
							</div>
						</div>
						
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">登录帐号：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
									name="loginname-query" placeholder="用户登录帐号">
							</div>
						</div>

						<div class="col-lg-34 more clearfix">
							<div class="morePart"><span>更多筛选</span>&nbsp;</div>														
							<button type="button" class="searchBtn">搜索</button>
							<button type="button" class="clearBtn">清空</button>							
						</div>
						
					</div>
					

					<div class="form-group distant">
						<div class="col-lg-52 time clearfix">
							<label class="control-label labelPart">注册时间：</label>
							<div class="input-daterange input-group">
								<input type="text" class="input input-sm form-control"
									id="date-start" placeholder="起始时间" readonly="readonly" /> <span
									class="input-group-addon">至</span> <input type="text"
									class="input input-sm form-control" id="date-end"
									placeholder="结束时间" readonly="readonly" />
							</div>
						</div>

					</div> 
					<div class="table-responsive">
						<table class="table table-bordered">
							<thead>
								<tr>
									<!-- <th> 
										<div class="checkbox">
									    	<label>全选<input type="checkbox" class="all" /></label>
									    </div>
								    </th> -->
								    <th>序号</th>
									<th>用户姓名</th>
									<th>登录名</th>
									<th>会员类型</th>
									<th>手机号</th>
									<th>公司名</th>
									<th>联系人</th>
									<th>详细地址</th>
									<th>营业执照</th>
									<th>公司网站</th>
									<th>注册时间</th>
									<th>状态</th>
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
				<select name="dataTable_length"	class="form-control input-sm setTableLength" aria-controls="dataTable">
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
<div class="modal fade modal-add" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<h4 id="myModalLabel">用户</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" novalidate="novalidate"
					id="addUserForm">

					<div class="form-group">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">姓名：</label>
							<div class="col-sm-81">
								<input type="text" name="realname" class="form-control input-sm"
									placeholder="输入姓名">
							</div>
						</div>

						<div class="col-lg-61">
							<label class="col-sm-41 control-label">联系方式：</label>
							<div class="col-sm-81">
								<input type="text" name="phone" class="form-control input-sm"
									placeholder="联系方式">
							</div>
						</div>

					</div>
					<div class="form-group">

						<div class="col-lg-61">
							<label class="col-sm-41 control-label">用户类型：</label>
							<div class="col-sm-81">
								<select name="utype" >
								 
									<c:if test="${User.utype=='超级管理员'}">
										<option value="管理员">管理员</option>
									</c:if>
									<option value="财务">财务</option>
									<option value="营销">营销</option>
									<option value="客服">客服</option>
									<option value="业务员">业务员</option>
									<option value="司机">司机</option>
								</select>
							</div>
						</div>
					</div>
					
				</form>
			</div>
			<div class="modal-footer">
				<span  class="errorMsg red"></span>
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-primary" id="btn_adduser">保存</button>
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
				<h4 id="myModalLabel">修改用户信息</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" novalidate="novalidate" id="updateUserForm">

					<div class="form-group">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">姓名：</label>
							<div class="col-sm-81">
								<input type="text" name="realname"
									class="form-control input-sm" placeholder="输入姓名">
								<input type="hidden" name="id"/>
							</div>
						</div>

						<div class="col-lg-61">
							<label class="col-sm-41 control-label">联系方式：</label>
							<div class="col-sm-81">
								<input type="text" class="form-control input-sm" name="phone"
									placeholder="联系方式">
							</div>
						</div>

					</div>
					<div class="form-group">

						<div class="col-lg-61">
							<label class="col-sm-41 control-label">用户类型：</label>
							<div class="col-sm-81">
								<select name="utype">
									<option value="超级管理员">超级管理员</option>
									<option value="管理员">管理员</option>
									<option value="财务">财务</option>
									<option value="营销">营销</option>
									<option value="客服">客服</option>
									<option value="业务员">业务员</option>
									<option value="司机">司机</option>
								</select>
							</div>
						</div>
					</div>
					
				</form>
			</div>
			<div class="modal-footer">
				<span  class="errorMsg red updateMsg"></span>
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-primary" id="btn_updateuser">保存</button>
			</div>
		</div>
	</div>
</div>
<!-- 修改e -->

<!-- 查看s -->
<div class="modal fade modal-view" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<h4 id="myModalLabel">用户</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" novalidate="novalidate">

					<div class="form-group">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">姓名：</label>
							<div class="col-sm-81">
								<p class="v_realname"> </p>
							</div>
						</div>

						<div class="col-lg-61">
							<label class="col-sm-41 control-label">联系方式：</label>
							<div class="col-sm-81">
								<p class="v_phone"> </p>
							</div>
						</div>

					</div>
					<div class="form-group">

						<div class="col-lg-61">
							<label class="col-sm-41 control-label">登录帐号：</label>
							<div class="col-sm-81">
								<p class="v_username"> </p>
							</div>
						</div>

						<div class="col-lg-61">
							<label class="col-sm-41 text-red control-label">账户类型：</label>
							<div class="col-sm-81">
								<p class="v_utype"> </p>
							</div>
						</div>

					</div>
					<div class="form-group">

						<div class="col-lg-61">
							<label class="col-sm-41 control-label">用户类型：</label>
							<div class="col-sm-81">
								<p class="v_utype"> </p>
							</div>
						</div>

						<div class="col-lg-61">
							<label class="col-sm-41 control-label">状态：</label>
							<div class="col-sm-81">
								<p class="v_state"> </p>
							</div>
						</div>

					</div>

					<div class="form-group">

						<div class="col-lg-61">
							<label class="col-sm-41 control-label">所属机构：</label>
							<div class="col-sm-81">
								<p class="v_orgname">  </p>
							</div>
						</div>

						<div class="col-lg-61">
							<label class="col-sm-41 control-label">创建时间：</label>
							<div class="col-sm-81">
								<p class="v_createtime"> </p>
							</div>
						</div>

					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>
<!-- 查看e -->

<!-- 重置密码输入当前密码s -->
<div class="modal fade modal-resetpwd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<h4 id="myModalLabel">输入当前用户密码</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" novalidate="novalidate" id="resetpwdForm">

					<div class="form-group">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">当前密码：</label>
							<div class="col-sm-81">
								<input type="password" name="password" onkeyup="clearResetpwdMsg()" class="form-control input-sm" placeholder="请输入密码">
								<input type="hidden" name="id" />
								<input type="hidden" name="realname" />
							</div>
						</div>
					</div>
					
				</form>
			</div>
			<div class="modal-footer">
				<span  class="errorMsg red resetpwdMsg"></span>
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<button type="button" class="btn btn-primary" id="btn_resetpsw">确定</button>
			</div>
		</div>
	</div>
</div>
<!-- 重置密码输入当前密码e -->