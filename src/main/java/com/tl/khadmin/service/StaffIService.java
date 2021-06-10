package com.tl.khadmin.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.tl.khadmin.bean.Staff;
import com.tl.khadmin.bean.Staffrole;
import com.tl.khadmin.page.Page;

public interface StaffIService {

	Page<Staff> showStaffByPage(int pageNum, int pageSize, Map<String, Object> params);

	String saveStaff(Staff staff);

	Staff queryById(Integer id);

	String updateStaff(Staff staff);
	
	Staff checkStaff(String loginname,String password);

	String updateState(Integer id, Integer state);

	String updateDefaultPwd(Staff attribute, Integer id, String password);

	String updatePhone(Staff staff, String oldphone, String newphone);

	String updateStaffInfo(HttpSession session,String nickname,String loginname);

	String updatePwd(Integer id, String oldpassword, String newpassword, String confirm_newpassword, String key,
			HttpSession session);
	
	List<Staffrole> queryStaffRoleName(Map<String, Object> params);
}
