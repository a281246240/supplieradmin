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
	var savePicUrl = '<%=path%>/product/saveproductpic';
	function readAsDataURL(){  
	    var file = document.getElementById("file").files;
	    var result=document.getElementById("result"); 
	    result.innerHTML = "";
	    for(i = 0; i< file.length; i ++) {
	        var reader = new FileReader();    
	        reader.readAsDataURL(file[i]);  
	        reader.onload=function(e){  //多图预览
	            result.innerHTML = result.innerHTML + '<img style="height: 90px" src="' + this.result +'" alt="" />&nbsp;&nbsp;&nbsp;';  
	        }
	    }
	}
	function readupdateDataURL(){  
	    var file = document.getElementById("fileupdate").files;
	    var result=document.getElementById("resultupdate"); 
	    result.innerHTML = "";
	    for(i = 0; i< file.length; i ++) {
	        var reader = new FileReader();    
	        reader.readAsDataURL(file[i]);  
	        reader.onload=function(e){  //多图预览
	            result.innerHTML = result.innerHTML + '<img style="height: 90px" src="' + this.result +'" alt="" />&nbsp;&nbsp;&nbsp;';  
	        }
	    }
	}
	$(".add").click(function() {
		var result=document.getElementById("result"); 
		result.innerHTML = "";
		$("#file").val("");
	})
</script>
<link rel="stylesheet" href="<%=path%>/css/glsmcx.css" type="text/css" />
<link rel="stylesheet" href="<%=path%>/css/upload.css" type="text/css" >
<script type="text/javascript" src="<%=path%>/js/controllers/spglCtrl.js"></script>
<div class="glsmcxWrap">
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">商品管理</h3>
			</div>
			<input id="queryType" value="ht" style="display:none;"></input>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">
					<!-- 查询开始 -->
					<div class="form-group">
						<div class="col-lg-31 clearfix">							
						<label class="control-label labelPart">商品标题：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" id="name" placeholder="商品标题">
							</div>
						</div>
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">商品品牌：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" id="brandname" placeholder="商品品牌">
							</div>	
						</div>					
						<div class="col-lg-31 clearfix">							
							<label class="control-label labelPart">上下架：</label>							
							<div class="colPart">
								<select name="stateone">
									<option value="">请选择</option>
									<option value="1">上架</option>
									<option value="2">下架</option>
								</select>
							</div>
															
						</div>
						<div class="col-lg-34 more clearfix">
							<div class="morePart"><span>更多筛选</span>&nbsp;</div>														
							<button type="button" class="searchBtn">查询</button>	
							<button type="button" class="clearBtn">清空</button>					
						</div>
					</div>
					<div class="form-group distant">
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">商品编号：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control" id="code" placeholder="商品编号">
							</div>	
						</div>
						<div class="col-lg-52 time clearfix">
							<label class="control-label labelPart">创建时间：</label>
							<div class="input-daterange input-group start ">
								<input type="text" class="input input-sm form-control" id="date-start" placeholder="起始时间" readonly="readonly" /> 
								<span class="input-group-addon">至</span> 
								<input type="text" class="input input-sm form-control" id="date-end" placeholder="结束时间" readonly="readonly" />
							</div>
						</div>
					</div>
					<!-- 查询结束 -->
					<ul class="clearfix listwork">
						<li data-target=".modal-addNews" data-toggle="modal" class="add clearfix"><i></i>增加</li>
						<li class="del delete-batch clearfix" id="deleteMany"><i></i>删除</li>
					</ul>
					<div class="table-responsive">
						<table class="table table-bordered check left">
							<thead>
								<tr>
									<th> 
										<div class="checkbox">
									    	<label>全选<input type="checkbox" class="all" /></label>
									    </div>
									</th>
									<th>商品名 </th>
									<th>商品编号</th>
									<th>商品品牌 </th>
									<th>商品原价</th>
									<th>积分价格</th>
								    <th>商品重量</th>
								    <th>上下架</th>
								    <th>库存</th>
								    <th>创建时间</th>
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
<div class="modal fade modal-addNews" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form class="form-horizontal" action="<%=path%>/product/addproduct" enctype="multipart/form-data" method="post" id="addshopForm">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
					</button>
					<h4 id="myModalLabel">新增商品</h4>
				</div>
				<div class="modal-body">
					<div class="form-group clearfix">
						<div class="col-lg-161">
							<label class="col-sm-41 control-label">商品名称：</label>
							<div class="col-sm-127">
								<input type="text" name="name" class="form-control input-sm" placeholder="商品名称">
							</div>
						</div>
					</div>				
					<div class="form-group clearfix">
						<div class="col-lg-161">
							<label class="col-sm-41 control-label">商品描述：</label>
							<div class="col-sm-127">
								<input type="text" name="description" class="form-control input-sm" placeholder="商品描述 ">
							</div>
						</div>
					</div>
							
					<div class="form-group clearfix">	
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">市场价格：</label>
							<div class="col-sm-81">
								<input type="text" name="originalprice" class="form-control input-sm" placeholder="市场参考价，单位：元">
							</div>
						</div>				
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">兑换积分数：</label>
							<div class="col-sm-81">
								<input type="text" name="price" class="form-control input-sm" placeholder="兑换价，单位：积分">
							</div>
						</div>
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">商品重量：</label>
							<div class="col-sm-81">
								<input type="text" name="weight" class="form-control input-sm" placeholder="商品重量">
							</div>
						</div>
					</div>
					<div class="form-group clearfix">	
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">商品编号：</label>
							<div class="col-sm-81">
								<input type="text" name="code" class="form-control input-sm" placeholder="商品编号">
							</div>
						</div>			
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">库存数量：</label>
							<div class="col-sm-81">
								<input type="text" name="stock" class="form-control input-sm" placeholder="商品数量">
							</div>
						</div>
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">上下架：</label>
							<div class="col-sm-81">
								<select name="state">
									<option value="1">上架</option>
									<option value="2">下架</option>
								</select>
							</div>
						</div>
					</div>
					
					<div class="form-group clearfix">	
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">商品品牌：</label>
							<div class="col-sm-81">
								<input type="text" name="brandname" class="form-control input-sm" placeholder="商品品牌">
							</div>
						</div>			
					</div>	
					<div class="form-group clearfix">
						<div class="col-lg-161">
							<label class="col-sm-41 control-label">商品主图：</label>
							<div class="col-sm-127">
								<input type="file" name="mainImg" class="mainImg" accept="image/jpg,image/jpeg,image/png,image/bmp"/>
								<div style="float: left;" class="mainshow"></div> 
							</div>
						</div>
					</div>		
					<div class="form-group clearfix">
						<div class="col-lg-161">
							<label class="col-sm-41 control-label">商品副图：</label>
							<div class="col-sm-127">
								<input type="file" name="fileImg" id="file" multiple="multiple"
									onchange="readAsDataURL()" accept="image/jpg,image/jpeg,image/png,image/bmp"/>
								<div style="float: left;" id="result"></div> 
							</div>
						</div>
					</div>	
				</div>
				<div class="modal-footer">
					<span  class="errorMsg red"></span>
					<!-- <button type="button" class="btn btn-primary" onclick="readAsDataURL()">预览图片</button> -->
					<!-- <button type="submit" class="btn btn-primary" id="btn_addshop">保存</button> -->
					<button type="button" class="btn btn-primary" id="btn_addshop">保存</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
				</div>	
			</form>
		</div>		
				
	</div>
			
</div>
<!-- 添加e -->

<!-- 修改s -->
<div class="modal fade modal-editNews" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<form class="form-horizontal" action="<%=path%>/product/updateproduct" method="post" enctype="multipart/form-data" id="updateProductForm">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
					</button>
					<h4 id="myModalLabel">修改商品</h4>
				</div>
				<div class="modal-body">					
					<input type="hidden" name="id" value='' >					
					<input type="hidden" name="pageno" value='' >					
					<div class="form-group clearfix">
						<div class="col-lg-161">
							<label class="col-sm-41 control-label">商品名称：</label>
							<div class="col-sm-127">
								<input type="text" name="name" class="form-control input-sm" placeholder="商品名称">
							</div>
						</div>
					</div>				
					<div class="form-group clearfix">
						<div class="col-lg-161">
							<label class="col-sm-41 control-label">商品描述：</label>
							<div class="col-sm-127">
								<input type="text" name="description" class="form-control input-sm" placeholder="商品描述 ">
							</div>
						</div>
					</div>
					<div class="form-group clearfix">	
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">市场价格：</label>
							<div class="col-sm-81">
								<input type="text" name="originalprice" class="form-control input-sm" placeholder="商品市场价格">
							</div>
						</div>				
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">积分价格：</label>
							<div class="col-sm-81">
								<input type="text" name="price" class="form-control input-sm" placeholder="积分兑换价格">
							</div>
						</div>
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">商品重量：</label>
							<div class="col-sm-81">
								<input type="text" name="weight" class="form-control input-sm" placeholder="商品重量">
							</div>
						</div>
					</div>
					<div class="form-group clearfix">	
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">商品编号：</label>
							<div class="col-sm-81">
								<input type="text" name="code" class="form-control input-sm" placeholder="商品编号">
							</div>
						</div>			
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">库存数量：</label>
							<div class="col-sm-81">
								<input type="text" name="stock" class="form-control input-sm" placeholder="商品数量">
							</div>
						</div>
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">上下架：</label>
							<div class="col-sm-81">
								<select name="state">
									<option value="1">上架</option>
									<option value="2">下架</option>
								</select>
							</div>
						</div>
					</div>
					<div class="form-group clearfix">	
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">商品品牌：</label>
							<div class="col-sm-81">
								<input type="text" name="brandname" class="form-control input-sm" placeholder="商品品牌">
							</div>
						</div>			
					</div>	
					<div class="form-group clearfix">
						<div class="col-lg-161">
							<label class="col-sm-41 control-label">商品主图：</label>
							<div class="col-sm-127">
								<input type="file" name="mainImg" class="mainImg" accept="image/jpg,image/jpeg,image/png,image/bmp"/>
								<div style="float: left;" class="mainshow"></div> 
							</div>
						</div>
					</div>
					<div class="form-group clearfix">
						<div class="col-lg-161">
							<label class="col-sm-41 control-label">商品副图：</label>
							<div class="col-sm-127">
								<div style="float: left;" id="resultupdate"></div> 
							</div>
						</div>
					</div>
					<input type="hidden" name="productImgIds" id="updateImgIds" />
					<input type="hidden" name="productId" id="productId" />
					
					<div class="modal-footer">
						<span  class="errorMsg red updateMsg"></span>
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-primary" id="btn_updateProduct">保存</button>
					</div>
					
					<div class="form-group clearfix">
						<div class="col-lg-161">
							<label class="col-sm-41 control-label">上传副图：</label>
							<div class="col-sm-127">
								<div id="T_upload"></div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- 修改e -->

