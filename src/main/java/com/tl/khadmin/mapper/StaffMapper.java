package com.tl.khadmin.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.tl.khadmin.bean.Staff;

public interface StaffMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Staff record);

    int insertSelective(Staff record);

    Staff selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Staff record);

    int updateByPrimaryKey(Staff record);

	List<Staff> selectByProperyByPage(Map<String, Object> params);

	Integer queryIdByLoginname(@Param("loginname") String loginname);
	
	Staff checkStaff(@Param("loginname") String loginname,@Param("password") String password);

	int updateState(@Param("id")Integer id,@Param("state") Integer state);

	int updateDefaultPwd(@Param("id")Integer id, @Param("password")String password);

	List<Staff> findStaffByLoginname(@Param("loginname")String loginname,@Param("exId")Integer exincludeId);
}