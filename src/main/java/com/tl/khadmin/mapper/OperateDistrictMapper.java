package com.tl.khadmin.mapper;

import com.tl.khadmin.bean.OperateDistrict;

public interface OperateDistrictMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(OperateDistrict record);

    int insertSelective(OperateDistrict record);

    OperateDistrict selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(OperateDistrict record);

    int updateByPrimaryKey(OperateDistrict record);
}