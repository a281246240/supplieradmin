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
<script type="text/javascript" src="<%=path%>/js/controllers/scddCtrl.js"></script>
<div class="glsmcxWrap">
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">商城订单</h3>
			</div>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">
					<div class="form-group">
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">下单人：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" name="nickName" placeholder="下单人姓名">
							</div>
						</div>
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">订单状态：</label>
							<div class="colPart">
								<select name="state"><!-- 订单状态   1、待付款；2、已取消；3、待发货；4、待收货；5、待评价；10、已完成 -->
									<option value="">全部</option>
									<option value="1">待付款</option>
									<option value="2">已取消</option>
									<option value="3">待发货</option>
									<option value="4">待收货</option>
									<option value="5">待评价</option>
									<option value="10">已完成</option>
								</select>
							</div>
						</div>
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">订单号：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" name="ordersn" placeholder="订单号">
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
							<label class="control-label labelPart">收货人名：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" name="receiver" placeholder="收货人名">
							</div>
						</div>
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">收货人手机：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" name="mobile" placeholder="收货人手机">
							</div>
						</div>
						<div class="col-lg-52 time clearfix">
							<label class="control-label labelPart">下单时间：</label>
							<div class="input-daterange input-group start ">
								<input type="text" class="input input-sm form-control" id="date-start" placeholder="起始时间" readonly="readonly" /> 
								<span class="input-group-addon">至</span> 
								<input type="text" class="input input-sm form-control" id="date-end" placeholder="结束时间" readonly="readonly" />
							</div>
						</div>
					</div>
					
					<ul class="clearfix listwork">
						<li class="print clearfix" onclick="exportExcel();"><i></i>打印</li>
					</ul>
					<div class="table-responsive">
						<table class="table table-bordered check">
							<thead>
								<tr>
									<th>序号</th>
									<th>订单号</th>
									<th>下单人</th>
									<th>收货人</th>
									<th>收货人手机号</th>
									<th>收货人固定号</th>
									<th>收货地址</th>
									<th>订单状态</th>
									<th>订单总价</th>
									<th>下单时间</th>
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
				<select name="dataTable_length" class="form-control input-sm setTableLength" aria-controls="dataTable">
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
		<input type="hidden" class="orderid">
		<!-- 订单详情start -->
		<div class="modal fade modal-details" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
								<table class="table table-bordered check">
									<thead>
										<tr>
											<th>订单号</th>
											<th>下单人</th>
											<th>收货人</th>
											<th>收货人手机号</th>
											<th>快递公司</th>
											<th>快递单号</th>
											<th>订单状态</th>
											<th>订单总价</th>
											<th>下单时间</th>
										</tr>
									</thead>
									<tbody id="oneDataBody">
		
									</tbody>
								</table>
								</br>
								<table class="table table-bordered">
									<thead>
										<tr>
										    <th>序号</th>
											<th>商品</th>
											<th>编号</th>
											<th>品牌</th>
											<th>原价</th>
											<th>积分</th>
											<th>数量</th>
										</tr>
									</thead>
		
									<tbody id="dataBodyDetail">
										 
									</tbody>
								</table>
							</div>
						</form>					
					</div>	
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					</div>
				</div>
			</div>
		</div>
		<!-- 订单详情end -->
		
		<!-- 发货strat -->
		<div class="modal fade modal-examine" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
						</button>
						<h4 id="myModalLabel">发货</h4>
					</div>
					<div class="modal-body">
						<form class="form-horizontal" novalidate="novalidate" id="updateStatusForm">
							<input type="hidden" name="id" />
							<div class="form-group">
								<div class="col-lg-61 choice">
									<label class="col-sm-41 control-label">快递公司：</label> 
									<div class="col-sm-81">
										<select name="expresscompany" class="form-control input-sm">
											<option selected="selected" value="">请选择快递公司</option>
											<option value="天联快运  ">天联快运 </option>
											<option value="圆通速递  ">圆通速递 </option>
											<option value="中通快递">中通快递</option>
											<option value="宅急送 ">宅急送</option>	
											<option value="韵达快递 ">韵达快递</option>	
											<option value="天天快递">天天快递</option>	
											<option value="顺丰速运 ">顺丰速运 </option>	
											<option value="申通快递">申通快递</option>	
											<option value="龙邦速递">龙邦速递</option>	
											<option value="EMS">EMS</option>
											<option value="百世物流">百世物流</option>	
											<option value="安能物流 ">安能物流 </option>	
											<option value="德邦快递 ">德邦快递</option>
											<option value="凡宇速递">凡宇速递</option>
											<option value="联昊通">联昊通</option>
											<option value="全峰快递   ">全峰快递</option>
											<option value="全一快递">全一快递</option>	
											<option value="城市100">城市100</option>	
											<option value="速尔">速尔</option>	
											<option value="佳吉快递">佳吉快递</option>	
											<option value="联邦快递">联邦快递</option>	
											<option value="华强物流">华强物流</option>	
											<option value="中铁物流">中铁物流</option>	
											<option value="百世汇通 ">百世汇通 </option>	
											<option value="中铁快运 ">中铁快运</option>	
											<option value="E速宝">E速宝</option>	
											<option value="信丰物流 ">信丰物流 </option>	
											<option value="天地华宇">天地华宇</option>	
											<option value="快捷快递">快捷快递</option>	
											<option value="优速快递">优速快递</option>	
											<option value="国通快递">国通快递</option>	
											<option value="新邦物流">新邦物流</option>	
										</select>			
									</div>	
								</div>
								<div class="col-lg-61 enter dsn">
									<label class="col-sm-41 control-label">快递公司：</label> 
									<div class="col-sm-81">
										<input name="expresscompany" class="form-control input-sm" placeholder="输入快递公司"/> 				
									</div>
								</div>
								<div class="col-lg-61">
									<label class="col-sm-41 control-label">快递单号：</label>
									<div class="col-sm-81">
										 <input name="expressnumber" class="form-control input-sm" placeholder="输入快递单号"/>
									</div>
								</div>
		
							</div>
							<!-- <div class="form-group">
								<div class="col-lg-123 clearfix">
									<label class="col-sm-41 control-label">备注：</label>
									<div class="col-sm-81">
										<textarea class="form-control" name="remark" rows="4" placeholder="输入回复内容"></textarea>
									</div>
								</div>
							</div> -->
						</form>
					</div>
					<div class="modal-footer">
						<span class="errorMsg red msg"></span>
						<button type="button" class="btn btn-danger updateinput">手动填写</button>
						<button type="button" class="btn btn-danger updateselect dsn">选择公司</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-primary" id="btn-updatestatus">保存</button>
					</div>
				</div>
			</div>
		</div>
		<!-- 发货end -->
		
	</div>
</div>


