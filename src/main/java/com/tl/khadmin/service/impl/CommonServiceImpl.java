package com.tl.khadmin.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tl.khadmin.bean.District;
import com.tl.khadmin.bean.Town;
import com.tl.khadmin.mapper.DistrictMapper;
import com.tl.khadmin.mapper.TownMapper;
import com.tl.khadmin.service.CommonIService;

@Service
public class CommonServiceImpl implements CommonIService{
	
	@Resource
	private DistrictMapper districtMapper;
	
	@Resource
	private TownMapper townMapper;

	public List<District> province() {
		// TODO Auto-generated method stub
		return districtMapper.selectAllProvince();
	}

	public List<District> city(int pid) {
		// TODO Auto-generated method stub
		return districtMapper.selectCityByPid(pid);
	}

	public List<District> district(int cid) {
		// TODO Auto-generated method stub
		return districtMapper.selectDistrictByCid(cid);
	}

	public List<Town> town(int did) {
		// TODO Auto-generated method stub
		return townMapper.selectTownByDid(did);
	}
	
	

}
