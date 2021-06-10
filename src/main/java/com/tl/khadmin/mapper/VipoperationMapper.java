package com.tl.khadmin.mapper;

import java.util.List;
import java.util.Map;

import com.tl.khadmin.bean.Vipoperation;

public interface VipoperationMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Vipoperation record);

    int insertSelective(Vipoperation record);

    Vipoperation selectByPrimaryKey(Integer id);
    
    int updateByPrimaryKeySelective(Vipoperation record);

    int updateByPrimaryKey(Vipoperation record);
    
    List<Vipoperation> getVipoperationlist(Map<String, Object> params);
    
    List<Vipoperation> getMenuByRolevalue(Map<String, Object> params);
    
    List<Vipoperation> getChoosedOptList(Map<String, Object> params);
}