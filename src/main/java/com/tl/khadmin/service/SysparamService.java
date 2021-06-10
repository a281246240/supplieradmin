package com.tl.khadmin.service;

import java.util.Map;

import com.tl.khadmin.bean.Sysparam;
import com.tl.khadmin.page.Page;

/**
 * <p>Title: SysparamService</p>
 * <p>Description: </p>
 * <p>Company: </p> 
 * @author yp
 * @date 2017年4月12日 下午2:52:01
 */
public interface SysparamService {

	
	Page<Sysparam> getList(int pageNo,int pageSize,Map<String, Object> params);
	
	Sysparam querybyid(Integer id);
	
	String add(Sysparam sysparam);
	
	String update(Sysparam sysparam);
	
	String delete(String[] del_ids);
}
