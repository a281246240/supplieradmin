<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
%>
<link rel="stylesheet" href="<%=path%>/css/msg.css" />
<script type="text/javascript" src="<%=path%>/js/controllers/msgCtrl.js"></script>
<div class="wrap container-fluid">

	<div class="panel panel-default">
		<div class="panel-heading">

			<ul class="clearfix">
				<li class="active">账户信息</li>
				<li>修改手机号</li>
				<li>修改密码</li>
			</ul>

		</div>
		<div class="panel-body">
			<div class="tab-content">
				<form:form method="post" action="#" class="account form-horizontal" id="accountForm">
					<input type="hidden" name="id" id="id" value="${_adminuser.id}"> 
					<form:errors path="userName" cssClass="error" />
					<input type="hidden" name="hid_phone" value="${_adminuser.phone}">
					<input type="hidden" name="tabid">
					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<label class="col-sm-41 control-label">姓名</label>
							<div class="col-sm-81">
								<input type="text" class="form-control" name="nickname" id="nickname"
									value="${_adminuser.nickname}" maxlength="32" />
							</div>
						</div>
					</div>
					
					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<label class="col-sm-41 control-label">登录账号</label>
							<div class="col-sm-81">
								<input type="text" class="form-control" name="loginname" id="loginname"
									value="${_adminuser.loginname}" maxlength="32" />
							</div>
						</div>
					</div>
					
					<!-- <div class="form-group">
						<div class="col-lg-31 clearfix">
							<label class="col-sm-41 control-label">用户类型</label>
							<div class="col-sm-81">
								<input type="text" class="form-control" name="role" id="role"
									value="${_adminuser.role}" maxlength="32"  disabled="disabled" />
							</div>
						</div>
					</div>-->
					
					<!-- 0：超级管理员；1.管理员；2：财务，3：营销，4：客服，5：推广维护 -->
					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<label class="col-sm-41 control-label">用户类型</label>
							<div class="col-sm-81">
								<select disabled="disabled" name="role" id="role" value="" class="form-control">
									<option value="0">超级管理员</option>
									<option value="1">管理员</option>
									<option value="2">财务</option>
									<option value="3">营销</option>
									<option value="4">客服</option>
									<option value="5">推广维护</option>
								</select>
							</div>
						</div>
					</div> 
					
					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<label class="col-sm-41 control-label">用户状态</label>
							<div class="col-sm-81">
								<select disabled="disabled" name="status" id="status" value="" class="form-control">
									<option value="-1">显示错误</option>
									<option value="0">停用</option>
									<option value="1">启用</option>
								</select>
							</div>
						</div>
					</div>

					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<label class="col-sm-41 control-label">手机号码</label>
							<div class="col-sm-81">
								<input type="text" name="phone" value="${_adminuser.phone}" id="phone" class="form-control" disabled="disabled" />
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<label class="col-sm-41 control-label">创建日期</label>
							<div class="col-sm-81">
								<input type="text" readonly
									value="<fmt:formatDate value='${_adminuser.createtime}' pattern="yyyy-MM-dd HH:mm" />"
									class="form-control" disabled="disabled" />
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<div class="col-sm-81">
								<input type="button" value="保存" class="save" id="saveAccount" />
							</div>
						</div>
					</div>
				</form:form>
				
				<form action="#" method="post" class="tel form-horizontal" id="telForm">
					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<label class="col-sm-41 control-label">原手机号</label>
							<div class="col-sm-81">
								<input type="tel" name="oldphone" maxlength="11" class="form-control" />
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<label class="col-sm-41 control-label">新手机号</label>
							<div class="col-sm-81">
								<input type="tel" name="newphone" maxlength="11" id="newphone" class="form-control" />
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<div class="col-sm-81">
								<input type="button" value="保存" class="save" id="savePhone" />
							</div>
						</div>
					</div>
				</form>
				
				<form action="#" method="post" class="pwd form-horizontal" id="pwdForm">
					<input type="hidden" id="key">

					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<label class="col-sm-41 control-label">原密码</label>
							<div class="col-sm-81">
								<input type="password" name="oldpassword" id="oldpassword"
									maxlength="32" class="form-control" />
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<label class="col-sm-41 control-label">新密码</label>
							<div class="col-sm-81">
								<input type="password" name="newpassword" id="newpassword"
									maxlength="32" class="form-control" />
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<label class="col-sm-41 control-label">确认密码</label>
							<div class="col-sm-81">
								<input type="password" name="confirm_newpassword"
									id="confirm_newpassword" maxlength="32" class="form-control" />
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<div class="col-sm-81">
								<input type="button" value="保存" class="save form-control"
									id="savePwd" />
							</div>
						</div>
					</div>
				</form>
			</div>
			<p class="success"></p>
			<p class="warn"></p>
		</div>
	</div>

</div>
<script type="text/javascript" src="<%=path%>/js/libs/require.js"></script>
<script type="text/javascript" src="<%=path%>/js/main.js" ></script>
<script type="text/javascript" src="<%=path%>/js/common/jquery.md5.js" ></script>
<script type="text/javascript">
	$('.wrap  li').on('click',function(){
		$(this).addClass('active').siblings('li').removeClass('active');
		$('.wrap  form').eq($(this).index()).css('display','block').siblings('form').css('display','none');
		$(".warn").css('visibility','hidden');
		$(".success").css('visibility','hidden');
	});
</script>