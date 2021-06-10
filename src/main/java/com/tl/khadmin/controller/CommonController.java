package com.tl.khadmin.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
 
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tl.khadmin.bean.District;
import com.tl.khadmin.bean.Town;
import com.tl.khadmin.service.CommonIService;
import com.tl.khadmin.util.CommonUtil;


@RequestMapping(value = "/common")
@Controller
public class CommonController{

	@Resource
	private CommonIService commonService;
	
	@RequestMapping(value="/province")
	@ResponseBody
	public Map<String, List<District>> province(){
		return CommonUtil.returnResultCodeJson("province", commonService.province());
	}
	
	@RequestMapping(value="/city")
	@ResponseBody
	public Map<String, List<District>> city(int pid){
		return CommonUtil.returnResultCodeJson("city", commonService.city(pid));
	}
	
	@RequestMapping(value="/district")
	@ResponseBody
	public Map<String, List<District>> district(int cid){
		return CommonUtil.returnResultCodeJson("district", commonService.district(cid));
	}
	
	@RequestMapping(value="/town")
	@ResponseBody
	public Map<String, List<Town>> town(int did){
		return CommonUtil.returnResultCodeJson("town", commonService.town(did));
	}
	

}
