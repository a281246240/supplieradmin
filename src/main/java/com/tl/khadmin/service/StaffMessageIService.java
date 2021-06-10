package com.tl.khadmin.service;


import com.tl.khadmin.bean.Staff;

public interface StaffMessageIService {

	int updateStaff(Staff staff);
	
	Staff findStaff(Integer id);
	
}
