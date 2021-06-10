package com.tl.khadmin.util;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.context.support.XmlWebApplicationContext;

import com.tl.khadmin.bean.Staff;
import com.tl.khadmin.bean.Staffoperation;
import com.tl.khadmin.service.IndexService;

public class TlkhFilter implements Filter {

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
			throws IOException, ServletException {

		HttpServletResponse response = (HttpServletResponse) resp;
		HttpServletRequest request = (HttpServletRequest) req;
		ServletContext sc = request.getSession().getServletContext();
		XmlWebApplicationContext cxt = (XmlWebApplicationContext) WebApplicationContextUtils
				.getWebApplicationContext(sc);
		IndexService indexService = null;
		if (cxt != null && cxt.getBean(IndexService.class) != null)
			indexService = (IndexService) cxt.getBean(IndexService.class);

			response.setHeader("Cache-Control", "no-cache");
			response.setHeader("Pragma", "no-cache");
			response.setDateHeader("Expires", -1);
			String str = request.getRequestURI();
			if (str.endsWith(".js") || str.endsWith(".css") || str.endsWith(".img") || str.endsWith(".png") || str.endsWith(".jpg")
					|| str.equals("/supplieradmin/") || str.indexOf("/confirmlogin") > 0 || str.indexOf("/loginout") > 0) {
				chain.doFilter(req, resp);
				return;
		}
		Staff staff = (Staff) request.getSession().getAttribute(Constant.USER);

		// 已登录访问页面,需要验权
		if (staff != null) {
			str = str.substring(req.getServletContext().getContextPath().length());
			// 对页面目录（getMenu）和所有页面路径进行放行
			if (str.indexOf("getMenu") > 0 || str.indexOf(".jsp") > 0 || str.indexOf(".html") > 0
					|| str.endsWith(".html")) {
				chain.doFilter(req, resp);
				return;
			}
			Map<String, Object> params = new HashMap<>();
			params.put("uri", str);
			params.put("rolevalue", staff.getRole());
			params.put("value", Staffoperation.intercept_two);//1:拦截，2不拦截
			
//			if (!indexService.checkRolePrivilege(params)) { // 无权限
//				if (request.getHeader("x-requested-with") != null
//						&& request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")) { // 如果是ajax请求响应头会有，x-requested-with
//					resp.getWriter().print("{\"result\":\"noauthority\"}");
//					return;
//				} else {
//					request.getRequestDispatcher("/401.html").forward(request, resp);
//					return;
//				}
//			}
		}
		resp.reset();
		chain.doFilter(req, resp);
		return;
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}
}