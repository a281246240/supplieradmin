package com.tl.khadmin.controller;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tl.khadmin.bean.Staff;
import com.tl.khadmin.bean.Staffrole;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.StaffIService;
import com.tl.khadmin.util.CommonUtil;
import com.tl.khadmin.util.Constant;

@Controller
@RequestMapping(value = "/staff")
public class StaffController {
	
	@Resource
	private StaffIService staffService;
	
	/**
	 * 展示登录页面
	 * @return
	 */
	@RequestMapping(value = "/login")
	public String loginpage(HttpSession session){
		return "redirect:login.html";
	}
	
	/**
	 * 确认登录
	 * @param loginname
	 * @param password
	 * @return
	 */
	@RequestMapping(value = "/confirmlogin")
	@ResponseBody
	public String confirmlogin(HttpSession session,String loginname,String password){
		Staff staff= staffService.checkStaff(loginname, password);
		if(staff==null){
			return CommonUtil.result(0);
		}
		session.setAttribute(Constant.USER, staff);
		return CommonUtil.result(1);
	}
	
	@RequestMapping(value = "/loginout")
	public String loginOut(HttpSession session) { 
		Enumeration<String> em = session.getAttributeNames();
		while (em.hasMoreElements()) {
			session.removeAttribute(em.nextElement().toString());
		}
		session.removeAttribute(Constant.USER);
		session.invalidate();
		return "redirect:/login.html";
	}
	
	
	@RequestMapping(value = "/showstaffbypage")
	public @ResponseBody Map<String, Page<Staff>> showVipByPage(HttpSession session, int pageNum, int pageSize,
			String startTime, String endTime,String loginname,String nickName,Integer status,Integer role) {
		
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startTime", startTime);
		params.put("endTime", endTime);
		params.put("loginname", loginname);
		params.put("status", status);
		params.put("nickname", nickName);
		params.put("role", role);
		
		return CommonUtil.returnResultCodeJson("result", staffService.showStaffByPage(pageNum, pageSize, params));
	}
	
	@RequestMapping(value = "/savestaff")
	@ResponseBody
	public String saveStaff(HttpSession session, @Valid Staff staff, BindingResult br) {
		return staffService.saveStaff(staff);
	}
	
	@RequestMapping(value = "/querybyid")
	@ResponseBody
	public Staff queryById(Integer id) {
		return staffService.queryById(id);
	}
	
	@RequestMapping(value = "/updatestaff")
	@ResponseBody
	public String updateStaff(Staff staff) { 
		return staffService.updateStaff(staff);
	}	
	
	@RequestMapping(value = "/updatestate")
	public @ResponseBody Map<String, String> updateState(Integer id, Integer state) {
		return CommonUtil.returnResultCodeJson("result", staffService.updateState(id,state));
	}
	
	@RequestMapping(value = "/updatedefaultpwd")
	@ResponseBody
	public String updateDefaultPwd(HttpSession session,Integer id,String password) {
		return staffService.updateDefaultPwd((Staff) session.getAttribute(Constant.USER),id,password);
	}
	
	@RequestMapping(value = "/updatephone")
	@ResponseBody
	public String updatePhone(HttpSession session, String oldphone, String newphone ) {
		Staff staff = (Staff) session.getAttribute(Constant.USER);
		return staffService.updatePhone(staff,oldphone,newphone);
	}
 
	/** 个人修改信息 */
	@RequestMapping(value = "/updateinfo")
	@ResponseBody
	public String updateInfo(HttpSession session, Integer id,String nickname,String loginname) { 
		String result=staffService.updateStaffInfo(session,nickname,loginname);
		return result;
	}
	
	@RequestMapping(value = "/updatepwd")
	@ResponseBody
	public String updatePwd(HttpSession session, String oldpassword, String newpassword,
			String confirm_newpassword,String key) {
		Staff staff = (Staff) session.getAttribute(Constant.USER);
		return staffService.updatePwd(staff.getId(),oldpassword, newpassword,confirm_newpassword,key,session);
	}
	
	@RequestMapping(value="/key")
	public @ResponseBody Map<String, String> key(HttpSession session){
		UUID uuid=UUID.randomUUID();
		session.setAttribute("LOGIN_KEY", uuid.toString().replaceAll("-", ""));
		return CommonUtil.returnResultCodeJson("key", uuid.toString().replaceAll("-", ""));
	}
	
	@RequestMapping(value="/showsession")
	@ResponseBody
	public Map<String,Staff> showsession(HttpSession session){
		Staff staff = (Staff) session.getAttribute(Constant.USER);
		return CommonUtil.returnResultCodeJson("staff", staffService.queryById(staff.getId()));
	}
	
	@RequestMapping(value="/showrolename")
	@ResponseBody
	public Map<String, List<Staffrole>> showRoleName(){
		Map<String, Object> params = new HashMap<String, Object>();
		return CommonUtil.returnResultCodeJson("result", staffService.queryStaffRoleName(params));
	}
}