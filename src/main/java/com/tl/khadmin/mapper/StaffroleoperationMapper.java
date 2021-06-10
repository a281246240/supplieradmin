package com.tl.khadmin.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.tl.khadmin.bean.Staffroleoperation;

public interface StaffroleoperationMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Staffroleoperation record);
    
    int batchAdd(List<Staffroleoperation> addRoleOptlist);

    int insertSelective(Staffroleoperation record);

    Staffroleoperation selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Staffroleoperation record);

    int updateByPrimaryKey(Staffroleoperation record);
    
    List<Staffroleoperation> getStaffroleoperationlist(Map<String, Object> params);
    
    List<Integer> checkRolePrivilege(Map<String, Object> params);
    
    Integer htdeleteByrolevalue(@Param("rolevalue") Integer rolevalue);
}