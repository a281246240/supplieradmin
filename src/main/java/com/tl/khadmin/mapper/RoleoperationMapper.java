package com.tl.khadmin.mapper;

import com.tl.khadmin.bean.Roleoperation;

public interface RoleoperationMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Roleoperation record);

    int insertSelective(Roleoperation record);

    Roleoperation selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Roleoperation record);

    int updateByPrimaryKeyWithBLOBs(Roleoperation record);

    int updateByPrimaryKey(Roleoperation record);
}