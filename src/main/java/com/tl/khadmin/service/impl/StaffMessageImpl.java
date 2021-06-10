package com.tl.khadmin.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tl.khadmin.bean.Staff;
import com.tl.khadmin.mapper.StaffMapper;
import com.tl.khadmin.service.StaffMessageIService;

@Service
public class StaffMessageImpl implements StaffMessageIService{
	
	@Resource
	private StaffMapper staffMapper;
	
	@Override
	public int updateStaff(Staff staff) {

		Staff lastStaff = staffMapper.selectByPrimaryKey(staff.getId());
		lastStaff.setNickname(staff.getNickname());
		lastStaff.setRole(staff.getRole());
		lastStaff.setPhone(staff.getPhone());
		int result = staffMapper.updateByPrimaryKeySelective(lastStaff);
		return result;
	}

	@Override
	public Staff findStaff(Integer id) {

		return staffMapper.selectByPrimaryKey(id);
	}

}