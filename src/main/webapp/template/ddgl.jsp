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
<script type="text/javascript" src="<%=path%>/js/controllers/ddglCtrl.js" ></script>
<div class="glsmcxWrap">
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">订单管理</h3>
			</div>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">

					<div class="form-group">
					
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">订单号：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
									name="orderid-query" placeholder="输入订单号">
							</div>
						</div>
						
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">寄件人：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
									name="sender-query" placeholder="寄件人姓名">
							</div>
						</div>
						
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">收件人：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
									name="receiver-query" placeholder="收件人姓名">
							</div>
						</div>
						
						<!-- 运单状态：分为：1：白条待审核；2：待接单；3：已取消；4：拒收；5：已接单；
							6：信息变更待确定；7：待付款；8：已付款待发货；9：已发货；10：已废除 -->
						
						<div class="col-lg-34 more clearfix">
							<div class="morePart"><span>更多筛选</span>&nbsp;</div>														
							<button type="button" class="searchBtn">搜索</button>
							<button type="button" class="clearBtn">清空</button>							
						</div>
						
					</div>
					

					<div class="form-group distant">
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">订单状态：</label>
							<div class="colPart">
								<select name="state-query">
								<!-- 客户订单状态：分为：1、已下单；2、已取消；3、已接单；4、已拒收；5、提货中；
								 6、已收货；7、已变更；8；已同意；9、待付款；10、已付款；11、已转单； -->
									<option value="">全部</option>
									<option value="1">已下单</option>
									<option value="2">已取消</option>
									<option value="3">已接单</option>
									<option value="4">已拒收</option>
									<option value="5">提货中</option>
									<option value="6">已收货</option>
									<option value="7">已变更</option>
									<option value="8">已同意</option>
									<option value="9">待付款</option>
									<option value="10">已付款</option>
									<option value="11">已转单</option>
								</select>
							</div>
						</div>
						
						<!-- <div class="col-lg-31 clearfix">
							<label class="control-label labelPart">使用白条：</label>
							<div class="colPart">
								<select name="iscreditapply-query">
									<option value="">全部</option>
									<option value="1">是</option>
									<option value="0">否</option>
								</select>
							</div>
						</div> -->
						
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">下单用户：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
									name="username-query" placeholder="下单用户姓名">
							</div>
						</div>
					
						<div class="col-lg-52 time clearfix">
							<label class="control-label labelPart">下单时间：</label>
							<div class="input-daterange input-group">
								<input type="text" class="input input-sm form-control"
									id="date-start" placeholder="起始时间" readonly="readonly" /> <span
									class="input-group-addon">至</span> <input type="text"
									class="input input-sm form-control" id="date-end"
									placeholder="结束时间" readonly="readonly" />
							</div>
						</div>
						
					</div>
					<!-- <div class="form-group distant">
					
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">下单用户：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
									name="username-query" placeholder="下单用户姓名">
							</div>
						</div>
						
					
					</div> --> 
					<ul class="clearfix listwork">
						<!-- <li class="del delete-batch clearfix"><i></i>删除</li> -->
						<li class="print clearfix" onclick="exportExcel();"><i></i>打印</li>
					</ul>
					<div class="table-responsive">
						<table class="table table-bordered gltable check left">
							<thead>
								<tr>
									<!-- <th> 
										<div class="checkbox">
									    	<label>全选<input type="checkbox" class="all" /></label>
									    </div>
								    </th> -->
								    <th>序号</th>
								    <th>订单号</th>
								    <th>下单用户名称</th>
									<th>寄件人</th>
									<th>寄件人电话</th>
									<th>收件人</th>
									<th>收件人电话</th>
									<th>物件名称</th>
									<th>数量</th>
									<th>重量(kg)</th>
									<th>体积(m3)</th> 
									<th>运输方式</th>
									<th>总费用</th>
									<th>受理网点</th>
									<th>是否上门</th>
									<th>上门提货时间</th>
									<th>计费方式</th>
									<th>代收货款</th>
									<th>订单状态</th>
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

<!-- Modal -->
<div class="modal fade modal-edityd" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true" >
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">
					<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
				</button>
				<h4 id="myModalLabel">订单详情</h4>
			</div>
			<form class="form-horizontal" novalidate="novalidate" id="orderDetailForm">
				<div class="modal-body"> 
					<div class="form-group">
						<div class="col-lg-31">
							<label class="col-sm-41 red control-label" id="orderid-label">运单号：</label>
							<div class="col-sm-81">
								<input type="hidden" class="form-control input-sm" name="id">
								<input type="text" readonly="readonly" class="form-control input-sm" placeholder="" name="orderid">
							</div>
						</div>

						<div class="col-lg-31">
							<label class="col-sm-41 control-label">发件网点：</label>
							<div class="col-sm-81">
								<input type="hidden" class="input-hidden input-sm" name="orgid">
								<input type="text" readonly="readonly" class="form-control input-sm" placeholder="录单网点" name="orgname"> 
							</div>
						</div>
						
						<div class="col-lg-31">
							<label class="col-sm-41 control-label">运输类型：</label>
							<div class="col-sm-81 dropdown">
								<!-- <input type="hidden" class="input-hidden input-sm form-control" name="transportway" value="">
								<button type="button" class="btn btn-sm btn-default dropdown-toggle transportation" data-toggle="dropdown">
									<span class="option-name">普通汽运</span>
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu transportation-type" id="transportation-type">
									<li><a data-type="1" href="javascript:;">普通汽运</a></li>
									<li><a data-type="2" href="javascript:;">汽运</a></li>
								</ul> -->
								<select disabled="disabled" name="transportway" value="" class="form-control">
									<option value="1">普通汽运</option>
									<option value="2">汽运</option>
								</select>
							</div>
						</div>  
						
						<div class="col-lg-31">
							<label class="col-sm-41 control-label">录单时间：</label>
							<div class="col-sm-81">
								<input type="text" readonly="readonly" class="form-control input-sm  current-time" readonly name="createtime"> 
							</div>
						</div>
					</div>

					<div class="form-group">
						<div class="col-lg-31">
							<label class="col-sm-41 control-label">结算方式：</label>
							<div class="col-sm-81 dropdown">
									<!-- <input type="hidden" class="input-hidden input-sm form-control" name="settletype" value="">
									<button type="button" class="btn btn-sm btn-default dropdown-toggle settlement" data-toggle="dropdown">
										<span class="option-name">按重量</span>
										<span class="caret"></span>
									</button>
									<ul class="dropdown-menu" id="settletype-type">
										计费类型，1：按重量，2：按件数
										<li>
											<a data-type="1" href="javascript:void(0);" >按重量</a>
										</li>
										<li>
											<a data-type="2" href="javascript:void(0);">按件数</a>
										</li> 
									</ul> -->
								<select disabled="disabled" name="settletype" value="" class="form-control">
									<option value="1">按重量</option>
									<option value="2">按方</option>
								</select>
							</div>
						</div>
						<div class="col-lg-31">
							<label class="col-sm-41 control-label">等通知发货：</label>
							<div class="col-sm-81 dropdown"> 
								<!-- <input type="hidden" class="input-hidden input-sm form-control" name="ifnotifydispatch" value="">
								<button type="button" class="btn btn-sm btn-default dropdown-toggle settlement" data-toggle="dropdown">
									<span class="option-name">否</span>
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu" id="ifnotifydispatch-type">
									计费类型，1：按重量，2：按件数
									<li>
										<a data-type="0" href="javascript:void(0);" >否</a>
									</li>
									<li>
										<a data-type="1" href="javascript:void(0);">是</a>
									</li> 
								</ul>  -->
								<select disabled="disabled" name="ifnotifydispatch" value="" class="form-control">
									<option value="0">否</option>
									<option value="1">是</option>
								</select>
							</div>
						</div>
						<div class="col-lg-31">
							<label class="col-sm-41 control-label">付款方式：</label>
							<div class="col-sm-81 dropdown">
								<!-- <input type="hidden" class="input-hidden input-sm form-control" value="" name="paytype">
								<button type="button" class="btn btn-sm btn-default dropdown-toggle payment" data-toggle="dropdown">
									<span class="option-name">现付</span>
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu payment-type" id="payment-type">
									<li><a data-type="1" href="javascript:;">现付</a></li>
									<li><a data-type="2" href="javascript:;">到付</a></li>
									<li><a data-type="3" href="javascript:;">回单付</a></li>
								</ul> -->
								<select disabled="disabled" name="paytype" value="" class="form-control">
									<option value="1">现付</option>
									<option value="2">到付</option>
									<option value="3">回单付</option>
								</select>
							</div>
						</div>
						<div class="col-lg-31">
							<label class="col-sm-41 control-label">配送方式：</label>
							<div class="col-sm-81 dropdown">
								<!-- <input type="hidden" class="input-hidden input-sm form-control" name="dispatchtype">
								<button type="button" class="btn btn-sm btn-default dropdown-toggle  distribution" data-toggle="dropdown">
									<span class="option-name">送货上门</span>
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu  distribution-type" id="distribution-type">
									<li><a data-type="1" href="javascript:;">客户自提</a></li>
									<li><a data-type="2" href="javascript:;">送货上门</a></li>
									<li><a data-type="3" href="javascript:;">送货并上楼</a></li> 
								</ul> -->
								<select disabled="disabled" name="dispatchtype" value="" class="form-control">
									<option value="1">客户自提</option>
									<option value="2">送货上门</option>
									<option value="3">送货并上楼</option>
								</select>
							</div>
						</div>
					</div>

					<div class="form-group">
						<div class="col-lg-31">
							<label class="col-sm-41 control-label">代收货款：</label>
							<div class="col-sm-81">
								<input type="text" readonly="readonly" class="form-control input-sm" placeholder="0.00" name="agencyfund">
							</div>
						</div> 
						
						<div class="col-lg-31">
							<label class="col-sm-41 control-label">回单份数：</label>
							<div class="col-sm-81">
								<input type="number" readonly="readonly" class="form-control input-sm" maxlength="4" name="receiptnum" onkeyup='this.value=this.value.replace(/\D/gi,"")'>
							</div>
						</div>
						
						<div class="col-lg-31">
							<label class="col-sm-41 control-label">回单号：</label>
							<div class="col-sm-81">
								<input type="text" readonly="readonly" class="form-control input-sm" name="receiptno">
							</div>
						</div>
						
					</div>


					<div class="form-group">
						<div class="col-lg-31">
							<label class="col-sm-41 red control-label">收件人：</label>
							<div class="col-sm-81">
								<input type="text" readonly="readonly" class="form-control input-sm" placeholder="请填写收件人姓名" name="receiver">
							</div>
						</div>
						<div class="col-lg-31">
							<label class="col-sm-41 control-label red">联系方式：</label>
							<div class="col-sm-81">
								<input type="text" readonly="readonly" class="form-control input-sm " placeholder="收件人固定电话或手机号码" name="receiverphone"> 
							</div>
						</div>
						<div class="col-lg-31">
							<label class="col-sm-41 control-label red ">寄件人：</label>
							<div class="col-sm-81">
								<input type="text" readonly="readonly" class="form-control input-sm" placeholder="请填写寄件人姓名" name="sender">
							</div>
						</div>

						<div class="col-lg-31">
							<label class="col-sm-41 control-label red ">联系方式：</label>
							<div class="col-sm-81">
								<input type="text" readonly="readonly" class="form-control input-sm " placeholder="寄件人固定电话或手机号码" name="senderphone"> 
							</div>
						</div> 
					</div>

					<div class="form-group">
						<!-- <div class="col-lg-31">
							<label class="col-sm-41 control-label red ">目的地：</label>
							<div class="col-sm-81">
								<input type="text"  disabled="disabled" class="form-control input-sm" placeholder="请输入目的地" name="destname" maxlength="5">
							</div>
						</div> -->
						<div class="col-lg-31">
							<label class="col-sm-41 control-label">收件单位：</label>
							<div class="col-sm-81">
								<input type="text" readonly="readonly" class="form-control input-sm" placeholder="收件人公司或单位名称" name="receivercompany"> 
							</div>
						</div>
						<div class="col-lg-31">
							<label class="col-sm-41 control-label">寄件客戶：</label>
							<div class="col-sm-81">
								<input type="text" readonly="readonly" class="form-control input-sm" placeholder="其它" name="sendvipname">
							</div>
						</div>

						<div class="col-lg-31">
							<label class="col-sm-41 control-label">寄件单位：</label>
							<div class="col-sm-81">
								 <input type="text" readonly="readonly" class="form-control input-sm " placeholder="寄件人公司或单位名称" name="sendercompany">
							</div>
						</div>
					</div>

					<div class="form-group">  
						<div class="col-lg-61" id="receiveraddr1">
							<label class="col-sm-41 control-label red ">收件地址：&nbsp;</label>
							<div class="col-sm-91">
								<div class="colPart6 dropdown">	
									<input type="text" class="input-sm form-control" placeholder="请选择收件的省市区街道" data-name="receiverpcdt" name="receiverpcdt" id="receiverpcdt" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" readonly="readonly">
										<!-- <div class="dropdown-menu dropdown-menu2">
											<ul class="nav nav-tabs" role="tablist">
												<li role="presentation" class="active">
													<a href="#home"  data-toggle="tab" >省份<i></i></a>
												</li>
												<li role="presentation">
													<a href="#profile"  data-toggle="tab" >城市<i></i></a>
												</li>
												<li role="presentation">
													<a href="#messages" data-toggle="tab">区域<i></i></a>
												</li>
												<li role="presentation">
													<a href="#organization" data-toggle="tab" >街道<i></i></a>
												</li>
											</ul>
											
											Tab panes
											<div class="tab-content address-groupData">
												<div role="tabpanel" id="home">
													<ul class="" id="provinceData">
													</ul>
													<input type="hidden" class="input-hidden input-sm" data-name="receiverproid" value="0" name="receiverproid"> 
												</div>
												<div role="tabpanel" id="profile">
													<ul class="" id="cityData">
													</ul>
													<input type="hidden" class="input-hidden input-sm" data-name="receivercityid" value="0" name="receivercityid"> 
												</div>
												<div role="tabpanel" id="messages">
													<ul class="" id="districtData">
													</ul>
													<input type="hidden" class="input-hidden input-sm" data-name="receiverdistrictid" value="0" name="receiverdistrictid">
												</div>
												<div role="tabpanel" id="town">
													<ul class="" id="townData">
													</ul>
													<input type="hidden" class="input-hidden input-sm" data-name="receivertownid" value="0" name="receivertownid"> 
												</div>
											</div>
										</div> -->
									</div>
								<div class="col-lg-41 "> 
									<input type="text" class="input-sm form-control longPart"
										placeholder="请填写详细地址" data-name="receiveraddress" name="receiveraddress" maxlength="64" readonly="readonly">														
								</div>
							</div>	
							<!-- <div class="input-group address-group">
								<div class="input-group-btn" role="group">
									<button type="button" class="btn btn-sm btn-default dropdown-toggle line" data-toggle="dropdown">
										<span class="option-name">选择省份</span> <span class="caret"></span>
									</button>
									<ul class="dropdown-menu" id="receive-province">
										  
									</ul>
								<input type="hidden" class="input-hidden input-sm" value="0" name="receiverproid"> 
								</div>
								<div class="input-group-btn" role="group">
									<button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown">
										<span class="option-name">选择城市</span> <span class="caret"></span>
									</button>
									<ul class="dropdown-menu" id="receive-city">
										 
									</ul>
									<input type="hidden" class="input-hidden input-sm" value="0" name="receivercityid"> 
								</div>
								<div class="input-group-btn" role="group">
									<button type="button" class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown">
										<span class="option-name">选择区域</span> <span class="caret"></span>
									</button>
									<ul class="dropdown-menu" id="receive-district">
										 
									</ul>
									<input type="hidden" class="input-hidden input-sm" value="0" name="receiverdistrictid">  
								</div>
								<div class="input-group-btn" role="group">
									<button type="button"
										class="btn btn-sm btn-default dropdown-toggle"
										data-toggle="dropdown">
										<span class="option-name">选择街道、乡镇</span> <span class="caret"></span>
									</button>
									<ul class="dropdown-menu" id="receive-town">
										 
									</ul>
									<input type="hidden" class="input-hidden input-sm" data-name="receivertownid" value="0" name="receivertownid">  
								</div>
								
								<input type="hidden" class="input-hidden input-sm form-control" placeholder="" name="receiverpcdt" id="receiverpcdt">
								<input type="text" class="input-sm form-control" placeholder="请填写详细地址"  name="receiveraddress" maxlength="64">
							</div>  -->
						
						
						
						</div>
						<!-- <div class="col-lg-61 hide" id="receiveraddr2">
							<label class="col-sm-41 control-label">收件地址：&nbsp;</label>
							<div class="input-group col-sm-91">								
								<input type="text" class="input-sm form-control">
							</div>
						</div> -->
						<div class="col-lg-31" id="sendaddr1">
							<label class="col-sm-41 red control-label">寄件地址：&nbsp;</label>
							<div class="input-group col-sm-81">
								<!-- <input type="hidden" class="input-hidden input-sm" name="senderproid"> 
								<input type="hidden" class="input-hidden input-sm" name="sendercityid">
								<input type="hidden" class="input-hidden input-sm" name="senderdistrictid"> 
								<input type="hidden" class="input-hidden input-sm" name="sendertownid">   -->
								
								<input type="text" class="input-sm form-control" name="senderpcdt" placeholder="省市县" readonly="readonly">
							</div>
						</div> 
						
						<div class="col-lg-31 colRight1">
							<input type="text" class="input-sm form-control" name="senderaddress" placeholder="请填写详细地址" readonly="readonly">									
						</div>
						
						<!-- <div class="col-lg-61 hide" id="sendaddr2">
							<label class="col-sm-41 red control-label">寄件地址：&nbsp;</label>
							<div class="input-group col-sm-91">								
								<input type="text" disabled="disabled" class="input-sm form-control" >
							</div>
						</div> -->
					</div> 

					<div class="form-group">
						<div class="col-lg-31">
							<label class="col-sm-41 control-label red ">货品名称：</label>
							<div class="col-sm-81">
								<input type="text" readonly="readonly" class="form-control input-sm" placeholder="例如：衣服、鞋子" name="goodsname">
							</div>
						</div>

						<div class="col-lg-31">
							<label class="col-sm-41 control-label red ">件数：</label>
							<div class="col-sm-81">
								 <input type="text" readonly="readonly" class="form-control input-sm " placeholder="" name="goodsnum" onkeyup='this.value=this.value.replace(/\D/gi,"")'> 
							</div>
						</div>

						<div class="col-lg-31">
							<label class="col-sm-41 control-label">发货费(积分)：</label>
							<div class="col-sm-81">
								<input type="text"  readonly="readonly" class="form-control input-sm" name="sendfee">
							</div>
						</div>
						<div class="col-lg-31">
							<label class="col-sm-41 control-label payArrive">运费<span class="red">(到付必填)</span>：</label>
							<div class="col-sm-81">
								<input type="text" readonly="readonly" class="form-control input-sm" name="freightcollectfee"> 
							</div>
						</div>
					</div>

					<div class="form-group">
						<div class="col-lg-31">
							<label class="col-sm-41 control-label  red">重量(kg)：</label>
							<div class="col-sm-81">
								<input type="text"  readonly="readonly" class="form-control input-sm" name="weight">
							</div>
						</div>
						<div class="col-lg-31">
							<label class="col-sm-41 control-label red">体积(m³)：</label>
							<div class="col-sm-81">
								<input type="tel"  readonly="readonly" class="form-control input-sm" placeholder="" name="volume">
							</div>

						</div>

						<div class="col-lg-31">
							<label class="col-sm-41 control-label">保价金额(￥)：</label>
							<div class="col-sm-81">
								<input type="text"  readonly="readonly" class="form-control input-sm" placeholder="单位：元（保费利率0.35‰）" name="goodsvalue">
							</div>
						</div>
						<div class="col-lg-31">
							<label class="col-sm-41 control-label">保费：</label>
							<div class="col-sm-81">
								<input type="text"  readonly="readonly" class="form-control input-sm" placeholder="" name="securefee"> 
							</div>
						</div>
					</div>

					<div class="form-group"> 
						<div class="col-lg-31">
							<label class="col-sm-41 control-label">包装：</label>
							<div class="col-sm-81 dropdown"> 
								<!-- <button type="button" class="btn btn-sm btn-default dropdown-toggle packaging" data-toggle="dropdown">
									<span class="option-name">纸箱</span>
									<span class="caret"></span>
								</button>
								<ul class="dropdown-menu packaging-type" id="packaging-type"> 
									<li><a data-type="1" href="javascript:;">纸箱</a></li>
									<li><a data-type="2" href="javascript:;">木箱</a></li>  
									<li><a data-type="3" href="javascript:;">木架</a></li> 
									<li><a data-type="4" href="javascript:;">编织袋</a></li> 
									<li><a data-type="5" href="javascript:;">布袋</a></li>  
								</ul>
								<input type="hidden" class="input-sm" name="packtype" value=""> -->
								<select disabled="disabled" name="packtype" value="" class="form-control">
									<option value="1">纸箱</option>
									<option value="2">木箱</option>
									<option value="3">木架</option>
									<option value="4">编织袋</option>
									<option value="5">布袋</option>
								</select>
							</div>
						</div>

						<div class="col-lg-31">
							<label class="col-sm-41 control-label">备注：</label>
							<div class="col-sm-81">
								<input type="text"  readonly="readonly" class="form-control input-sm" value="" name="remark" maxlength="100">
							</div>
						</div> 
					</div> 
			</div> 
			</form>
			<div class="modal-footer  clearfix">
				<span class="red error1 hide"><i></i>信息提交错误</span> 
				<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				<!-- <button type="button" class="btn btn-primary" id="updateOrder">保存</button> -->
				
			</div>
		</div>
	</div>
</div>