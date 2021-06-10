package com.tl.khadmin.mapper;

import java.util.List;

import com.tl.khadmin.bean.District;


public interface DistrictMapper {
    int insert(District record); 

	List<District> selectAllProvince();

	List<District> selectCityByPid(int pid);

	List<District> selectDistrictByCid(int cid);

	String queryPrefixcarno(Integer cityId);
	
	String queryCitycode(Integer cityId);

	District queryById(Integer cid);
	
	String queryNameById(Integer id);
	
}