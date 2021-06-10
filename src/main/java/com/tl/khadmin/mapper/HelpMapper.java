package com.tl.khadmin.mapper;

import com.tl.khadmin.bean.Help;

public interface HelpMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Help record);

    int insertSelective(Help record);

    Help selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Help record);

    int updateByPrimaryKeyWithBLOBs(Help record);

    int updateByPrimaryKey(Help record);
}