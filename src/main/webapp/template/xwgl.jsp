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
<script type="text/javascript" src="<%=path%>/js/controllers/xwglCtrl.js"></script>

<script type="text/javascript" src="<%=path%>/ueditor/ueditor.config.js"></script>  
<script type="text/javascript" src="<%=path%>/ueditor/ueditor.all.js"></script>

<div class="glsmcxWrap">
	<div class="container-fluid">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">新闻管理</h3>
			</div>
			<input id="queryType" value="ht" style="display:none;"></input>
			<div class="panel-body clearfix">
				<form method="post" action="#" class="form-horizontal" role="form">
					
					
					<!-- 查询开始 -->
					<div class="form-group">
						<div class="col-lg-31 clearfix">							
						<label class="control-label labelPart">新闻标题：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
								id="title" placeholder="新闻标题">
							</div>
						</div>
						<div class="col-lg-31 clearfix">
							<label class="control-label labelPart">创建人：</label>
							<div class="colPart">
								<input type="text" class="input-sm form-control"
								id="creatorname" placeholder="创建人">
							</div>	
						</div>					
						<div class="col-lg-31 clearfix">							
							<label class="control-label labelPart">新闻类型：</label>							
							<div class="colPart">
								<select name="type">
									<option value="">请选择</option>
									<option value="1">集团新闻</option>
									<option value="2">行业新闻</option>
									<option value="3">营销活动</option>
									<option value="4">快运新闻</option>
									<option value="5">会员新闻</option>
									<option value="6">市场新闻</option>
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
						<div class="col-lg-52 time clearfix">
							<label class="control-label labelPart">创建时间：</label>
							<div class="input-daterange input-group start ">
								<input type="text" class="input input-sm form-control"
									id="date-start" placeholder="起始时间" readonly="readonly" /> 
								<span class="input-group-addon">至</span> 
								<input type="text" class="input input-sm form-control" 
									id="date-end" placeholder="结束时间" readonly="readonly" />
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
									<th>新闻标题 </th>
									<th>新闻类型</th>
									<th>是否显示 </th>
									<th>创建人</th>
									<th>创建时间</th>
								    <th>新闻来源</th>
								    <th>最后修改人</th>
								    <th>修改时间</th>
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
			<form class="form-horizontal" action="<%=path%>/news/addnews" method="post" enctype="multipart/form-data" id="addNewsForm">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
					</button>
					<h4 id="myModalLabel">新增新闻</h4>
				</div>
				<div class="modal-body">
					<div class="form-group clearfix">
						<div class="col-lg-161">
							<label class="col-sm-41 control-label">标题：</label>
							<div class="col-sm-127">
								<input type="text" name="title" class="form-control input-sm" placeholder="新闻标题">
							</div>
						</div>
					</div>				
					<div class="form-group clearfix">
						<div class="col-lg-161">
							<label class="col-sm-41 control-label">概要：</label>
							<div class="col-sm-127">
								<input type="text" name="summary" class="form-control input-sm" placeholder="新闻概要">
							</div>
						</div>
					</div>
					<div class="form-group clearfix">					
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">类型：</label>
							<div class="col-sm-81">
								<select name="type">
									<option value="">请选择</option>
									<option value="1">集团新闻</option>
									<option value="2">行业新闻</option>
									<option value="3">营销活动</option>
									<option value="4">快运新闻</option>
									<option value="5">会员新闻</option>
									<option value="6">市场新闻</option>
								</select>
							</div>
						</div>
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">是否显示：</label>
							<div class="col-sm-81">
								<select name="state" >
									<option value="1">是</option>
									<option value="0">否</option>
								</select>
							</div>
						</div>					
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">新闻来源：</label>
							<div class="col-sm-81">
								<input type="text" name="source" class="form-control input-sm" placeholder="新闻来源">
							</div>
						</div>
					</div>					
					<div class="form-group clearfix">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">标题图：</label>
							<div class="col-sm-81">
								<input type="file" name="fileImg" accept="image/jpg,image/jpeg,image/png,image/bmp"/>
							</div>
						</div>
					</div>				
					<div class="form-group">
						<div class="col-lg-161">
							<label class="col-sm-41 control-label">内容：</label>
							<div class="col-sm-128">
								<!-- <form action="save.jsp" method="post"> -->
						        <textarea id="myEditor" name="content" cols="75"></textarea>
						        <script type="text/javascript">  
						            var editor = new UE.ui.Editor({initialFrameHeight:300,initialFrameWidth:878 });  
						            editor.render("myEditor");  
						        </script>							       
						        <!-- </form> -->
							</div>
						</div>
					</div>			
				</div>
				<div class="modal-footer">
					<span  class="errorMsg red"></span>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="submit" class="btn btn-primary">保存</button> <!--  id="btn_addnews" -->
				</div>	
			</form>
		</div>		
				
	</div>
			
</div>

<!-- 添加e -->

<!-- 修改s -->
<div class="modal fade modal-editNews" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<!-- <form class="form-horizontal" novalidate="novalidate" id="updateNewsForm"> -->
			<form class="form-horizontal" action="<%=path%>/news/updateNews" method="post" enctype="multipart/form-data" id="updateNewsForm">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
					</button>
					<h4 id="myModalLabel">修改新闻</h4>
				</div>
				<div class="modal-body">					
					<input type="hidden" name="id" value='' >					
					<div class="form-group clearfix">
						<div class="col-lg-161">
							<label class="col-sm-41 control-label">标题：</label>
							<div class="col-sm-127">
								<input type="text" name="title" class="form-control input-sm" placeholder="新闻标题">
							</div>
						</div>
					</div>					
					<div class="form-group clearfix">
						<div class="col-lg-161">
							<label class="col-sm-41 control-label">概要：</label>
							<div class="col-sm-127">
								<input type="text" name="summary" class="form-control input-sm" placeholder="新闻标题">
							</div>
						</div>
					</div>					
					<div class="form-group clearfix">				
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">类型：</label>
							<div class="col-sm-81">
								<select name="type">
									<option value="">请选择</option>
									<option value="1">集团新闻</option>
									<option value="2">行业新闻</option>
									<option value="3">营销活动</option>
									<option value="4">快运新闻</option>
									<option value="5">会员新闻</option>
									<option value="6">市场新闻</option>
								</select>
							</div>
						</div>						
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">是否显示：</label>
							<div class="col-sm-81">
								<select name="state" >
									<option value="1">是</option>
									<option value="0">否</option>
								</select>
							</div>
						</div>						
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">新闻来源：</label>
							<div class="col-sm-81">
								<input type="text" name="source" class="form-control input-sm" placeholder="新闻来源">
							</div>
						</div>
					</div>						
					<div class="form-group clearfix">
						<div class="col-lg-61">
							<label class="col-sm-41 control-label">标题图：</label>
							<div class="col-sm-81">
								<input type="file" name="fileImg" class="upfile" onchange="changImg(event)" accept="image/jpg,image/jpeg,image/png,image/bmp"/>
								<img alt="暂无图片" src="" id="myImg" width="100px" height="100px"/>
							</div>
						</div>	
					</div>	
	
					<div class="form-group">
						<div class="col-lg-128">
							<label class="col-sm-41 control-label">内容：</label>
							<div class="col-sm-81">
								<!-- <form action="save.jsp" method="post"> -->
						        <textarea id="myEditor2" name="content" cols="75"></textarea>
						        <script type="text/javascript">  
						            var editor2 = new UE.ui.Editor({initialFrameHeight:300,initialFrameWidth:878 });  
						            editor2.render("myEditor2");
						            
						        </script>								      
							    <!-- </form> -->
							</div>
						</div>
					</div>
					
				</div>
				<div class="modal-footer">
					<span  class="errorMsg red updateMsg"></span>
					<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
					<button type="submit" class="btn btn-primary" >保存</button><!-- id="btn_updateNews" -->
				</div>
			</form>
		</div>
	</div>
</div>
<!-- 修改e -->

