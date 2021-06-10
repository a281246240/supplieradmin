package com.tl.khadmin.service;

import java.util.Map;

import com.tl.khadmin.bean.Staffoperation;
import com.tl.khadmin.page.Page;

/**
 * 
 * <p>Title: IndexService</p>
 * <p>Description: </p>
 * <p>Company: </p> 
 * @author yp
 * @date 2017年3月17日 下午3:54:37
 */
public interface IndexService {

	public Page<Staffoperation> getMenuByRolevalue(Integer pageNum,Integer pageSize,Map<String, Object> params);
	
	public Boolean checkRolePrivilege(Map<String, Object> params);
	
	public Boolean checkuriPrivilege(Map<String, Object> params);
}
