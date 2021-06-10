package com.tl.khadmin.service;

import java.util.Map;

import com.tl.khadmin.bean.Staffoperation;
import com.tl.khadmin.page.Page;

public interface StaffOperationIService {

	Page<Staffoperation> showStaffOperationByPage(int pageNum, int pageSize, Map<String, Object> params);
	
	String saveStaffoperation(Staffoperation staffoperation);
	
	String queryStaffopernationByName(String name);
	
	Staffoperation queryStaffopernationById(Integer id);
	
	String updateStaffopernation(Staffoperation staffopernation);
	
	String deleteStaffopernationById(Integer id);
	
//	String deleteStaffopernationByIds(String ids);
	
}
