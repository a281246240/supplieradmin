package com.tl.khadmin.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tl.khadmin.bean.Staff;
import com.tl.khadmin.bean.Staffoperation;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.IndexService;
import com.tl.khadmin.util.CommonUtil;
import com.tl.khadmin.util.Constant;

@Controller
@RequestMapping(value = "/index")
public class IndexController {

	@Autowired
	private IndexService indexService;
	
	/**
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/page")
	private String getpage(HttpSession session){
		return "redirect:/index.jsp"; 
	}
	
	/**
	 * @param session
	 * @return
	 */
	@RequestMapping(value = "/home")
	private String gethome(HttpSession session){
		return "/template/home"; 
	}
	
	/**
	 * 加载侧边栏菜单
	 * @param session
	 * @param pageNum
	 * @param pageSize
	 * @param name
	 * @param value
	 * @param parentid
	 * @param type
	 * @param ispage
	 * @param uri
	 * @param parameter
	 * @param classname
	 * @param description
	 * @return
	 */
	@RequestMapping(value = "/getMenu")
	@ResponseBody
	public Map<String, Page<Staffoperation>> getMenu(HttpSession session,Integer pageNum,Integer pageSize,String name,Integer value,Integer parentid,Integer type,
							Integer ispage,String uri,String parameter,String classname,String description){
		
		Staff staff = (Staff)session.getAttribute(Constant.USER);
		
		Map<String, Object> params = new HashMap<String,Object>();
		params.put("rolevalue", staff.getRole());
//		params.put("optvalue", 1);
		
		return CommonUtil.returnResultCodeJson("result", indexService.getMenuByRolevalue(pageNum,pageSize,params));
	}
	
}