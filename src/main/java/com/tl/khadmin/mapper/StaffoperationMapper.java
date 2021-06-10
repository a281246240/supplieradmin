package com.tl.khadmin.mapper;

import java.util.List;
import java.util.Map;


import com.tl.khadmin.bean.Staffoperation;

public interface StaffoperationMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Staffoperation record);

    int insertSelective(Staffoperation record);

    Staffoperation selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Staffoperation record);

    int updateByPrimaryKey(Staffoperation record);
    
    List<Staffoperation> getStaffoperationlist(Map<String, Object> params);
 
    List<Staffoperation> getTwoMenuByRolevalue(Map<String, Object> params);
    
    List<Staffoperation> getOneMenuByRolevalue(Map<String, Object> params);
    
    List<Staffoperation> getChoosedOptList(Map<String, Object> params);
    
    List<Staffoperation> selectStaffoperationByPage(Map<String, Object> params);
    
    int selectStaffoperationByName(String name);
    
    int deleteByIds(int[] ids);
    
    int deleteByParentids(int[] parentids);

    int checkuriPrivilege(Map<String, Object> params);
}