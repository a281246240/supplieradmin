package com.tl.khadmin.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tl.khadmin.bean.Order;
import com.tl.khadmin.mapper.OrderMapper;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.OrderIService;

@Service
public class OrderServiceImpl implements OrderIService{

	@Resource
	private OrderMapper orderMapper;
	
	@Override
	public Page<Order> showOrderByPage(int pageNum, int pageSize, Map<String, Object> params) {
		
		Page<Order> page=new Page<Order>(pageNum, pageSize);
        params.put("page", page);   
        List<Order> list= orderMapper.selectOrderByPage(params);  
		page.setResult(list);
		return page;
	}

	@Override
	public Order showOrderInfo(Integer id) {

		return orderMapper.selectByPrimaryKey(id);
	}
}
