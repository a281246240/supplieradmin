package com.tl.khadmin.service;

import java.util.List;
import java.util.Map;

import com.tl.khadmin.bean.ShopOrder;
import com.tl.khadmin.bean.ShopOrderProduct;
import com.tl.khadmin.page.Page;

public interface ShopOrderIService {

	Page<ShopOrder> showOrderByPage(int pageNum, int pageSize, Map<String, Object> params);
	
	Page<ShopOrderProduct> showOrderProductByPage(int pageNum, int pageSize, Map<String, Object> params);
	
	List<ShopOrderProduct> showOrderProductByOrderId(Integer productid);
	
	List<ShopOrder> selectOrderById(Integer id);
	
	Integer updateShopOrder(ShopOrder shopOrder);
	
	ShopOrder selectShopOrderById(Integer id);
}
