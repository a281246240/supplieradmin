package com.tl.khadmin.service.impl;

import java.util.Date;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import com.alibaba.druid.util.StringUtils;
import com.tl.khadmin.bean.Staff;
import com.tl.khadmin.bean.Staffrole;
import com.tl.khadmin.enums.StaffRoleEnum;
import com.tl.khadmin.mapper.StaffMapper;
import com.tl.khadmin.mapper.StaffroleMapper;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.StaffIService;
import com.tl.khadmin.util.CommonUtil;
import com.tl.khadmin.util.Constant;

@Service
public class StaffServiceImpl implements StaffIService{
	
	@Resource
	private StaffMapper staffMapper;
	
	@Resource
	private StaffroleMapper staffroleMapper;

	@Override
	public Page<Staff> showStaffByPage(int pageNum, int pageSize, Map<String, Object> params) {
		Page<Staff> page=new Page<Staff>(pageNum, pageSize);
        params.put("page", page);   
        List<Staff> list=staffMapper.selectByProperyByPage(params);  
		page.setResult(list);
		return page;
	}
	
	@Override
	public String saveStaff(Staff staff) {
		
		Integer id = staffMapper.queryIdByLoginname(staff.getLoginname());
		if (id != null) {
			return CommonUtil.returnMapResultToJson("fail","登录帐号已经存在，请重新设置");
		}
		staff.setPassword(CommonUtil.sign("666666","UTF-8").toLowerCase());
		staff.setCreatetime(new Date());
		staff.setStatus(1);
		int result = staffMapper.insert(staff);
		return CommonUtil.returnMapResultByRows(result, "添加成功", "添加失败，请重试");
	}
	
	@Override
	public Staff queryById(Integer id) {
		return staffMapper.selectByPrimaryKey(id);
	}
	
	@Override
	public String updateStaff(Staff staff) {

		Staff lastStaff = staffMapper.selectByPrimaryKey(staff.getId());
		lastStaff.setNickname(staff.getNickname());
		lastStaff.setRole(staff.getRole());
		lastStaff.setPhone(staff.getPhone());
		int result = staffMapper.updateByPrimaryKeySelective(lastStaff);
		return CommonUtil.returnMapResultByRows(result, "修改成功","修改失败，请重试");
	}
	
	@Override
	public String updateStaffInfo(HttpSession session,String nickname,String loginname) {
		Staff staff = (Staff) session.getAttribute(Constant.USER);
		List<Staff> list = staffMapper.findStaffByLoginname(loginname,staff.getId());
		if(list!=null && list.size()>0) {
			return CommonUtil.returnMapResultToJson("fail","登录账号已存在，请重新设置");
		}
		Staff lastStaff = staffMapper.selectByPrimaryKey(staff.getId());
		lastStaff.setNickname(nickname);
		lastStaff.setLoginname(loginname);
		int result = staffMapper.updateByPrimaryKeySelective(lastStaff);
		if(result == 1) {
			staff.setNickname(nickname);
			staff.setLoginname(loginname);
		}
		return CommonUtil.returnMapResultByRows(result, "修改成功","修改失败，请重试");
	}
	
	@Override
	public Staff checkStaff(String loginname, String password) {
		if(loginname==null || loginname.equals("") || password==null || password.equals("")){
			return null;
		}
		return staffMapper.checkStaff(loginname, password); 
	}
	
	public String updateState(Integer id,Integer state) {
		int result = staffMapper.updateState(id,state);
		return CommonUtil.result(result);
	}
	
	public String updateDefaultPwd(Staff sessionUser,Integer id,String password) {
		boolean hasAuthority = Constant.ROLE_SUPER_ADMIN==sessionUser.getRole() 
				|| Constant.ROLE_ADMIN==sessionUser.getRole();
		if(!hasAuthority) {
			return CommonUtil.returnMapResultToJson("fail", "您无权重置密码");
		}
		if(password ==null || password.trim()=="" || !CommonUtil.sign(password,"utf-8").toLowerCase().equals(sessionUser.getPassword())) {
			return CommonUtil.returnMapResultToJson("fail", "当前用户密码输入错误");
		}
		int result = staffMapper.updateDefaultPwd(id,CommonUtil.sign("666666","utf-8").toLowerCase());
		if(result == 1){
			return CommonUtil.returnMapResultToJson("success", "设置成功");
		}else{
			return CommonUtil.returnMapResultToJson("fail", "设置失败，请重新操作");
		}
	}
	
	public String updatePhone(Staff staff, String oldphone, String newphone) {
		int result = 0;
		if(oldphone.equals(staff.getPhone())) {
			staff.setPhone(newphone);
			result = staffMapper.updateByPrimaryKeySelective(staff);
			if(result == 1) {
				return CommonUtil.returnMapResultToJson("success", "修改成功");
			}
		}else{
			return CommonUtil.returnMapResultToJson("false", "原手机号不正确");
		}
		return CommonUtil.returnMapResultToJson("false", "修改失败，请重试");
	}
	
	public String updatePwd(Integer id, String oldpassword, String newpassword, 
			String confirm_newpassword, String key, HttpSession session) {
		 
		if(StringUtils.isEmpty(oldpassword) || StringUtils.isEmpty(newpassword) 
				|| StringUtils.isEmpty(confirm_newpassword) ) {
			return CommonUtil.returnMapResultToJson("false", "密码或确认密码不能为空");
		}
		if(!newpassword.equals(CommonUtil.sign(confirm_newpassword+key,"utf-8").toLowerCase())) {
			return CommonUtil.returnMapResultToJson("false", "密码与确认密码不一致");
		} 
		Staff user = staffMapper.selectByPrimaryKey(id);
		if (user != null) {
			if (oldpassword.equals(CommonUtil.sign(user.getPassword()+key,"utf-8").toLowerCase())) {  
				user.setPassword(confirm_newpassword); 
				int num = staffMapper.updateByPrimaryKeySelective(user); 
				if (num == 1) {
					Enumeration<String> em = session.getAttributeNames();
					while (em.hasMoreElements()) {
						session.removeAttribute(em.nextElement().toString());
					}
					session.removeAttribute(Constant.USER);
					session.invalidate();
					return CommonUtil.returnMapResultToJson("success", "修改成功");
				}
			}else{
				return CommonUtil.returnMapResultToJson("false", "原始密码不正确");
			}
		}
		return CommonUtil.returnMapResultToJson("false", "修改失败，请重试");
	}

	@Override
	public List<Staffrole> queryStaffRoleName(Map<String, Object> params) {

		return staffroleMapper.staffrolelist(params);
	}
	
}