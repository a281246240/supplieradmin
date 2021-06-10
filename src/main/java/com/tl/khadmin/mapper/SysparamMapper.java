package com.tl.khadmin.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.tl.khadmin.bean.Sysparam;

public interface SysparamMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Sysparam record);

    int insertSelective(Sysparam record);

    Sysparam selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Sysparam record);

    int updateByPrimaryKey(Sysparam record);
    
    List<Sysparam> getListByPage(Map<String, Object> params);
    
    int delete_more(@Param("del_ids") String[] del_ids);
}