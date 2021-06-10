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
					
					<!-- <div class="form-group">
						<div class="col-lg-161">
							<label class="col-sm-41 control-label">新闻内容：</label>
							<div class="col-sm-128">
								<form action="save.jsp" method="post">
							        <textarea id="myEditor" name="content" cols="75"></textarea>
								        <script type="text/javascript">  
								            var editor = new UE.ui.Editor({initialFrameHeight:300,initialFrameWidth:878 });  
								            editor.render("myEditor");  
								        </script>							       
						        </form>
							</div>
						</div>
					</div> -->
					
					
		<input type="hidden" id="hfText">
		<textarea id="myEditor" name="content"></textarea>	
		<script type="text/javascript">
			var UM = new UE.ui.Editor({initialFrameHeight:300,initialFrameWidth:878 });  
			UM.render("myEditor");
	 
	        $(document).ready(function () {
	            var value = $("#hfText").val();
	            UM.getEditor('myEditor').setContent(value, false);
	        });
	        var SetValue = function () {
	            var value = UM.getEditor('myEditor').getContent();
	            $("#hfText").val(value);            
	        };
		</script>		
					
					
					
					
					
				
			</div>
				
		</form>
		</div>		
				
		</div>
	

