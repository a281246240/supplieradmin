package com.tl.khadmin.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.tl.khadmin.bean.Order;

public interface OrderMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Order record);

    int insertSelective(Order record);

    Order selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);

	List<Order> selectOrderByPage(Map<String, Object> params);

	int updateOrderCredit( @Param("id")Integer orderid, @Param("creditstatus") Integer creditstatus,
			@Param("orderstatus") Integer orderstatus);
	
	int selectStoredValue(Map<String, Object> params);
}