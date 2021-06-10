package com.tl.khadmin.service;

import java.util.List;

import com.tl.khadmin.bean.District;
import com.tl.khadmin.bean.Town;


public interface CommonIService {

	List<District> province();

	List<District> city(int pid);

	List<District> district(int cid);

	List<Town> town(int did);

}
