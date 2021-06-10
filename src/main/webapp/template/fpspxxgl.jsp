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
<script type="text/javascript" src="<%=path%>/js/controllers/fpspxxglCtrl.js"></script>
<div class="glsmcxWrap">
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">发票商品信息管理</h3>
			</div>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">

						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">商品名称：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
									name="goodsName" placeholder="商品名称">
							</div>
						</div>
					
						 &nbsp &nbsp  &nbsp &nbsp 
						<div class="col-lg-34 more clearfix">
							<button type="button" class="searchBtn" value="0">查询单个详细</button>
							<button type="button" class="clearBtn">清空</button>
							<!-- <button type="button" class="print insertGoods" style="">新增商品</button> -->
						</div>
						
						<div class="table-responsive-one">
					<table id="invoiceGoods" class="table table-bordered check left">
						<thead id= "thead-test">
							<tr>
								<th>操作</th>
									<th>商品名称</th>
									<th>商品id</th>
									<th>商品编码</th>
									<th>规格型号</th>
									<th>单位</th>
									<th>单价（元）</th>
									<th>税率</th>
									<th>企业商品编码</th>
							</tr>
						</thead>
						<tbody id="dataBodyGoods">

						</tbody>
					</table>
					</div>

					<ul class="clearfix listwork">
						<li data-target=".modal-add" data-toggle="modal" class="add insertGoods"><i></i>增加</li>
						<li class="print clearfix" id="exportExcelTab"><i></i>导出</li>
					</ul>
					
					
					<div class="table-responsive">
						<table class="table table-bordered check left">
							<thead>
								<tr>
									<th>操作</th>
									<th>序号</th>
									<th>商品名称</th>
									<!-- <th>商品id</th>
									<th>企业商品编码</th> -->
									<th>规格型号</th>
									<th>单位</th>
									<th>单价（元）</th>
									<th>税率</th>
									<!-- <th>商品编码</th> -->
									<th>商品分类</th>
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

<!-- <div class="modal fade commonConfirmGoods" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h3 class="text-center"><i></i><span class=" modal-title">新增商品</span></h3>
				</div>
				<div class="modal-body modal-goodsb">
					<span>商品名称:</span>
					<input type="text" name="newGoodsName" class="input-goods " placeholder="商品名称"/><br>
					<span>税 &nbsp &nbsp &nbsp 率:</span>
					<input type="text" name="newGoodsSLV" class="input-goods " placeholder="税率"/><br>
					<span>商品编码:</span>
					<input type="text" name="newGoodsNumber" class="input-goods " placeholder="商品编码"/><br>
				</div>
				<div id="message" style="display:none;color:red;"><span>商品信息不能有空！</span></div>
				<div class="text-center btn-gro">
					<button type="button" id="cancle" class="btn btn-default back" data-dismiss="modal">取消</button>
					<button type="button" id="yes" class="btn btn-default go ">确定</button>
				</div> 
			</div> 
		</div> 
	</div> -->
	
	
<div class="modal fade modal-edit commonConfirmGoods" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<h4 id="myModalLabel">新增商品</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal" novalidate="novalidate" id="updateStaffForm">

					<div class="form-group">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">商品名称:</label>
							<div class="col-sm-81">
								<input type="text" name="newGoodsName" class="form-control input-sm" placeholder="商品名称">
								<input type="hidden" name="id"/>
							</div>
						</div>

						<div class="col-lg-61">
							<label class="col-sm-41 control-label">税 &nbsp &nbsp &nbsp 率:</label>
							<div class="col-sm-81">
								<input type="text" class="form-control input-sm" name="newGoodsSLV" placeholder="税率">
							</div>
						</div>
					</div>
					
					<div class="form-group">	
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">商品编码:</label>
							<div class="col-sm-81">
								<input type="text" class="form-control input-sm" name="newGoodsNumber" placeholder="商品编码">
							</div>
						</div>
					</div>
					
				</form>
			</div>
			<div class="modal-footer">
			<div id="message" class="errorMsg red updateMsg" ><span>商品信息不能有空！</span></div>
				<!-- <span class="errorMsg red updateMsg"></span> -->
				<button type="button" class="btn btn-default" data-dismiss="modal" id="cancle">取消</button>
				<button type="button" class="btn btn-primary" id="yes">保存</button>
			</div>
		</div>
	</div>
</div>

