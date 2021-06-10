package com.tl.khadmin.service.impl;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tl.khadmin.bean.ShopOrder;
import com.tl.khadmin.bean.ShopOrderProduct;
import com.tl.khadmin.mapper.ShopOrderMapper;
import com.tl.khadmin.mapper.ShopOrderProductMapper;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.ShopOrderIService;

@Service
public class ShopOrderServiceImpl implements ShopOrderIService{

	@Resource
	private ShopOrderMapper shopOrderMapper;
	@Resource
	private ShopOrderProductMapper shopOrderProductMapper;

	@Override
	public Page<ShopOrder> showOrderByPage(int pageNum, int pageSize, Map<String, Object> params) {
		Page<ShopOrder> page = new Page<ShopOrder>(pageNum,pageSize);
		params.put("page", page);
		List<ShopOrder> list = shopOrderMapper.selectOrderByPage(params);
		page.setResult(list);
		return page;
	}

	@Override
	public Page<ShopOrderProduct> showOrderProductByPage(int pageNum, int pageSize, Map<String, Object> params) {
		Page<ShopOrderProduct> page = new Page<ShopOrderProduct>(pageNum,pageSize);
		params.put("page", page);
		List<ShopOrderProduct> list = shopOrderProductMapper.selectOrderProductByPage(params);
		page.setResult(list);
		return page;
	}

	@Override
	public List<ShopOrderProduct> showOrderProductByOrderId(Integer orderid) {

		return shopOrderProductMapper.selectOrderProductByOrderId(orderid);
	}

	@Override
	public List<ShopOrder> selectOrderById(Integer id) {
		
		return shopOrderMapper.selectById(id);
	}

	@Override
	public Integer updateShopOrder(ShopOrder shopOrder) {

		return shopOrderMapper.updateByPrimaryKeySelective(shopOrder);
	}

	@Override
	public ShopOrder selectShopOrderById(Integer id) {

		return shopOrderMapper.selectByPrimaryKey(id);
	}

}
