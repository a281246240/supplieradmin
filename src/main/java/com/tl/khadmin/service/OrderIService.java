package com.tl.khadmin.service;

import java.util.Map;

import com.tl.khadmin.bean.Order;
import com.tl.khadmin.page.Page;

public interface OrderIService {

	Page<Order> showOrderByPage(int pageNum, int pageSize, Map<String, Object> params);
	
	Order showOrderInfo(Integer id);
}
