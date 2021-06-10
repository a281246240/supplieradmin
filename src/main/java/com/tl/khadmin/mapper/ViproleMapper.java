package com.tl.khadmin.mapper;

import java.util.List;
import java.util.Map;

import com.tl.khadmin.bean.Viprole;

public interface ViproleMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Viprole record);

    int insertSelective(Viprole record);

    Viprole selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Viprole record);

    int updateByPrimaryKey(Viprole record);
    
    List<Viprole> viprolelist(Map<String, Object> params);
}