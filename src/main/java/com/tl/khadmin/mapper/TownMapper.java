package com.tl.khadmin.mapper;

import java.util.List;

import com.tl.khadmin.bean.Town;

public interface TownMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Town record);

    int insertSelective(Town record);

    Town selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Town record);

    int updateByPrimaryKey(Town record);

	List<Town> selectTownByDid(int did);
}