package com.tl.khadmin.interceptor;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.tl.khadmin.bean.Staff;
import com.tl.khadmin.util.CommonUtil;
import com.tl.khadmin.util.Constant;

public class LoginInterceptor extends HandlerInterceptorAdapter{
	
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        boolean flag = false;
		Staff user = (Staff) request.getSession().getAttribute(Constant.USER);
		if (user != null) {
			flag = true;
		}else {
			if (request.getHeader("x-requested-with") != null && 
					request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")){ //如果是ajax请求响应头会有，x-requested-with  
				CommonUtil.printResult(response, "{\"result\":\"againLogin\"}");  
				return false;
	        }else{
	        	response.sendRedirect("/login.html"); 
				return false;
	        } 
		}
		return flag;
    }
 
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        super.postHandle(request, response, handler, modelAndView);
    }
}
