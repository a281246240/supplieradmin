package com.tl.khadmin.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.tl.khadmin.bean.Viproleoperation;

public interface ViproleoperationMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Viproleoperation record);

    int insertSelective(Viproleoperation record);

    Viproleoperation selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Viproleoperation record);

    int updateByPrimaryKey(Viproleoperation record);
    
    List<Viproleoperation> getViproleoperationlist(Map<String, Object> params);
    
    Integer checkRolePrivilege(Map<String, Object> params);
    
    Integer gwdeleteByrolevalue(@Param("rolevalue") Integer rolevalue);
}