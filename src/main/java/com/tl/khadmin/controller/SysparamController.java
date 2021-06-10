package com.tl.khadmin.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tl.khadmin.bean.Sysparam;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.SysparamService;
import com.tl.khadmin.util.CommonUtil;

@Controller
@RequestMapping(value = "/sysparam")
public class SysparamController {

	@Resource
	private SysparamService sysparamService;
	
	/**
	 * 获得系统参数列表
	 * @param session
	 * @param key
	 * @param showname
	 * @param description
	 * @return
	 */
	@RequestMapping(value = "/getList")
	@ResponseBody
	public Map<String, Page<Sysparam>> getList(HttpSession session,int pageNo, int pageSize,String key,String showname,String description){
		
		Map<String, Object> params = new HashMap<String ,Object>();
		
		params.put("key", key);
		params.put("showname", showname);
		params.put("description", description);
		
		return CommonUtil.returnResultCodeJson("result", sysparamService.getList(pageNo, pageSize, params));
		
	}
	
	/**
	 * 单条查询
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/querybyid")
	@ResponseBody
	public Sysparam querybyid(Integer id){
		return sysparamService.querybyid(id);
	}
	
	/**
	 * 添加系统参数
	 * @param session
	 * @param sysparam
	 * @return
	 */
	@RequestMapping(value="/add")
	@ResponseBody
	public String add(HttpSession session,@Valid Sysparam sysparam){
		return sysparamService.add(sysparam);
	}
	
	/**
	 * 更新系统参数
	 * @param session
	 * @param sysparam
	 * @return
	 */
	@RequestMapping(value="/update")
	@ResponseBody
	public String update(HttpSession session,@Valid Sysparam sysparam){
		return sysparamService.update(sysparam);
	}
	
	/**
	 * 删除系统参数
	 * @param session
	 * @param ids
	 * @return
	 */
	@RequestMapping(value = "/batchdelete")
	@ResponseBody
	public String batchdelete(HttpSession session,String ids){
		String[] del_ids = ids.split(",");
		return sysparamService.delete(del_ids);
	}
}