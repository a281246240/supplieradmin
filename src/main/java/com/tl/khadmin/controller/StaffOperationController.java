package com.tl.khadmin.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tl.khadmin.bean.Staffoperation;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.StaffOperationIService;
import com.tl.khadmin.util.CommonUtil;

@Controller
@RequestMapping(value = "/staffoperation")
public class StaffOperationController {
	
	@Resource
	private StaffOperationIService staffOperationService;

	@RequestMapping(value = "/showstaffoperationbypage")
	public @ResponseBody Map<String, Page<Staffoperation>> showStaffOperationByPage(HttpSession session, int pageNum, int pageSize,
			String name_input,Integer type_input,Integer ispage_input,Integer value_input) {
		
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("name", name_input);
		params.put("type", type_input);
		params.put("ispage", ispage_input);
		params.put("value", value_input);

		return CommonUtil.returnResultCodeJson("result", 
				staffOperationService.showStaffOperationByPage(pageNum, pageSize, params));
		
	}
	
	@RequestMapping(value = "/addstaffoperation")
	@ResponseBody
	public String addStaffOperation(HttpSession session,@Valid Staffoperation staffoperation,BindingResult br) {
		
		//判断模块名是否存在
		if(staffOperationService.queryStaffopernationByName(staffoperation.getName()).equals("yes")){
			return CommonUtil.returnMapResultToJson("result", "name exist");
		}
		
		return staffOperationService.saveStaffoperation(staffoperation);
		
	}
	
	@RequestMapping(value = "/querybyid")
	@ResponseBody
	public Staffoperation queryById(HttpSession session,Integer id) {
		
		return staffOperationService.queryStaffopernationById(id);
		
	}
	
	@RequestMapping(value = "/updatestaffoperation")
	@ResponseBody
	public String updateStaffoperation(HttpSession session,@Valid Staffoperation staffop,BindingResult br) { 
		
//		Staffoperation newStaffop = staffOperationService.queryStaffopernationById(staffop.getId());
//		
//		newStaffop.setName(staffop.getName());
//		newStaffop.setIspage(staffop.getIspage());
//		newStaffop.setUri(staffop.getUri());
//		newStaffop.setParameter(staffop.getParameter());
//		newStaffop.setClassname(staffop.getClassname());
//		newStaffop.setDescription(staffop.getDescription());
//		if(staffop.getType() == 4){//4:操作
//			newStaffop.setValue(staffop.getValue());
//		}
		if(staffop.getId() == null){
			return CommonUtil.returnMapResultToJson("fail", "出入数据异常");
		}
		return staffOperationService.updateStaffopernation(staffop);
	}
	
	@RequestMapping(value = "/deletebyid")
	@ResponseBody
	public String deleteById(Integer id) {
		
		return staffOperationService.deleteStaffopernationById(id);
	}
	
	@RequestMapping(value = "/deletebyids")
	@ResponseBody
	public String deleteByIds(String ids) {
		String result="";
		String[] add = ids.substring(0,ids.length()-1).split(",");
		if(add!=null) {
			for(int i=0;i<add.length;i++){
				Staffoperation st = staffOperationService.queryStaffopernationById(Integer.valueOf(add[i]));
				if(st == null){
					continue;
				}else{
					result = staffOperationService.deleteStaffopernationById(Integer.valueOf(add[i]));
				}
			}
		}
		
		return result;
	}
}
