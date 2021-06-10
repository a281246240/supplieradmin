<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:if test="${empty _adminuser}">
	<script type="text/javascript"> 
		top.location.href="<%=request.getContextPath()%>/login.html";
	</script>
</c:if>  
