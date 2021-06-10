package com.tl.khadmin.mapper;

import java.util.List;
import java.util.Map;

import com.tl.khadmin.bean.Staffrole;

public interface StaffroleMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Staffrole record);

    int insertSelective(Staffrole record);

    Staffrole selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Staffrole record);

    int updateByPrimaryKey(Staffrole record);
    
    List<Staffrole> staffrolelist(Map<String, Object> params);
}