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
<script type="text/javascript" src="<%=path%>/js/controllers/hyglCtrl.js" ></script>

<style>
   /*  #licenseurl{
      transform: scale(0.2);transform-origin: left top;
    }
    
    #licenseurl:hover{
        transform:scale(0.6);
        transform-origin: left top;
     } */
</style>

<div class="glsmcxWrap">
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">会员管理</h3>
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
							<label class="control-label labelPart">会员类型：</label>
							<div class="colPart">
								<select name="viprole-query">
									<!-- <option value="">全部</option>
									<option value="8">普通会员</option>
									<option value="1">创业导师会员</option>
									<option value="2">B2B会员</option>
									<option value="4">营销人员</option> -->
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
					
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">状态：</label>
							<div class="colPart">
								<select name="status-query">
								<!-- 账号状态，0：停用；1：启用；2：待审核；3：审核不通过 -->
									<option value="">全部</option>
									<option value="1">启用</option>
									<option value="2">待审核</option>
									<option value="0">停用</option>
									<option value="3">审核不通过</option>
								</select>
							</div>
						</div>
						
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
									<th>操作</th>
								    <th>序号</th>
								    <th>公司名</th>
								    <th>营业执照</th>
									<th>会员姓名</th>
									<th>手机号</th>
									<th>登录帐号</th>
									<th>会员类型</th>
									<th>状态</th>
									<th>地区</th>
									<th>注册时间</th>
									<th>推荐码</th>
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

<!-- 审核vip s -->
<div class="modal fade modal-edit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<h4 id="myModalLabel">审核企业会员信息</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" novalidate="novalidate" id="checkVipForm">
					<div class="form-group">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">公司名称：</label>
							<div class="col-sm-81">
								<input type="text" name=companyname class="form-control input-sm" placeholder="公司名称">
								<input type="hidden" name="id"/>
							</div>
						</div>

						<div class="col-lg-61">
							<label class="col-sm-41 control-label">公司营业执照：</label>
							<div class="col-sm-81">
								<input type="text" name=licenseno class="form-control input-sm" placeholder="营业执照号码">
							</div>
						</div>
					</div>
					
					<div class="form-group">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">会员姓名：</label>
							<div class="col-sm-81">
								<input type="text" name=nickname class="form-control input-sm" placeholder="会员姓名">
							</div>
						</div>
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">手机号：</label>
							<div class="col-sm-81">
								<input type="text" name=mobile class="form-control input-sm" placeholder="手机号">
							</div>
						</div>
					</div>
					
					<div class="form-group">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">注册时间：</label>
							<div class="col-sm-81">
								<input type="text" id=registertime class="form-control input-sm" placeholder="注册时间">
							</div>
						</div>
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">经营范围：</label>
							<div class="col-sm-81">
								<input type="text" name=businessscope class="form-control input-sm" placeholder="经营范围">
							</div>
						</div>
					</div>
					
					<div class="form-group">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">公司地址：</label>
							<div class="col-sm-81 dropdown">
								<input type="text" name=pcdtnameshow readonly="readonly" class="form-control input-sm" placeholder="公司地区">
									<div class="dropdown-menu">
										<ul class="nav nav-tabs " role="tablist">
											<li role="presentation" class="active"><a href="#home" data-toggle="tab">省份</a></li>
											<li role="presentation"><a href="#profile" data-toggle="tab">城市</a></li>
											<li role="presentation"><a href="#messages"	data-toggle="tab">区域</a></li>
											<li role="presentation"><a href="#organization"	data-toggle="tab">街道</a></li>
										</ul>
										<!-- Tab panes -->
										<input data-name="" type="hidden" value=5 name="sendervipaddressid"> 
										<div class="tab-content send-address-group">
											<div role="tabpanel" id="home">
												<ul class="clearfix" id="provinceQuery">

												</ul>
												<input data-name="" type="hidden" class="input-hidden input-sm senderdistrict" name="proid"> 
											</div>
											<div role="tabpanel" id="profile">
												<ul class="clearfix" id="cityQuery">
												
												</ul>
												<input data-name="" type="hidden"  class="input-hidden input-sm senderdistrict" name="cityid"> 
											</div>
											<div role="tabpanel" id="messages">
												<ul class="clearfix" id="districtQuery">
												
												</ul>
												<input data-name="" data-pcdtclass="senderdistrict" type="hidden" class="input-hidden input-sm senderdistrict" name="districtid"> 
											</div>
											<div role="tabpanel" id="sendtownid">
												<ul class="clearfix" id="townQuery">
												
												</ul>
												<input data-name="" data-pcdtclass="senderdistrict" data-showpcdt="pcdtnameshow" type="hidden" class="input-hidden input-sm senderdistrict" name="townid"> 
											</div>
										</div>
									</div>
							</div>
						</div>
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">固定电话：</label>
							<div class="col-sm-81">
								<input type="text" name=tel class="form-control input-sm" placeholder="固定电话">
							</div>
						</div>
						
					</div>
					
					<div class="form-group">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">详细地址：</label>
							<div class="col-sm-81">
								<input type="text" name=address class="form-control input-sm" placeholder="详细地址">
							</div>
						</div>
						
					</div>
					
					<div class="form-group">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">营业执照：</label>
							<div class="col-sm-81">
								<input type="hidden" name='licenseurl' class="form-control input-sm" placeholder="营业执照">	
								<img src="" name = "" id ="licenseurl" style="height:300px;width:480px;">
							</div>
						</div>
					</div>
					<input type="hidden" name="state" />
				</form>
			</div>
			<div class="modal-footer">
				<span  class="errorMsg red updateMsg"></span>
				<button type="button" class="btn btn-warn" id="btn_noCheckPass">审核不通过</button>
				<button type="button" class="btn btn-primary" id="btn_checkPass">保存并审核通过</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
			</div>
		</div>
	</div>
</div>
<!-- 审核vip e -->

<!-- 查看s -->
<div class="modal fade modal-view" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
