package com.tl.khadmin.service;

import java.util.List;
import java.util.Map;

import com.tl.khadmin.bean.Staffoperation;
import com.tl.khadmin.bean.Staffrole;
import com.tl.khadmin.bean.Staffroleoperation;
import com.tl.khadmin.bean.Vipoperation;
import com.tl.khadmin.bean.Viprole;
import com.tl.khadmin.bean.Viproleoperation;
import com.tl.khadmin.page.Page;

/**
 * <p>Title: PrivilegeIService</p>
 * <p>Description: </p>
 * <p>Company: </p> 
 * @author yp
 * @date 2017年3月11日 上午9:52:35
 */
public interface PrivilegeIService {
	
	public String gwadd(Viproleoperation bean);
	
	public String gwupdate(Viproleoperation bean);
	
	public String gwdelete(Integer id);
	
	public Page<Viprole> gwviprole(Integer pageNum,Integer pageSize,Map<String, Object> params);
	
	public String gwaddviprole(Viprole viprole);
	
	public Page<Vipoperation> gwvipoperation(Integer pageNum,Integer pageSize,Map<String, Object> params);
	
	public Page<Viproleoperation> gwviproleoperation(Integer pageNum,Integer pageSize,Map<String, Object> params);
	
	public Vipoperation getgwOperationById(Integer id);
	
	public Integer gwdeleteByrolevalue(Integer rolevalue);
	
	////////////
	
	public String htaddrole(Staffrole bean);
	
	public String htadd(Staffroleoperation bean);
	
	public String htbatchAdd(List<Staffroleoperation> addRoleOptlist);
	
	public String htupdate(Staffroleoperation bean);
	
	public String htdelete(Integer id);
	
	public Page<Staffrole> htstaffrole(Integer pageNum,Integer pageSize,Map<String, Object> params);
	
	public Page<Staffoperation> htstaffoperation(Integer pageNum,Integer pageSize,Map<String, Object> params);
	
	public Page<Staffroleoperation> htstaffroleoperation(Integer pageNum,Integer pageSize,Map<String, Object> params);
	
	public Staffoperation gethtOperationById(Integer id);
	
	public Integer htdeleteByrolevalue(Integer rolevalue);
}
