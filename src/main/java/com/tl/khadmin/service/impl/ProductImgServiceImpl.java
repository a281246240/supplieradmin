package com.tl.khadmin.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tl.khadmin.bean.ShopProductImg;
import com.tl.khadmin.mapper.ShopProductImgMapper;
import com.tl.khadmin.service.ProductImgIService;

@Service
public class ProductImgServiceImpl implements ProductImgIService{

	@Resource
	private ShopProductImgMapper shopProductImgMapper;
	
	@Override
	public List<ShopProductImg> queryProductsByProductId(Integer productid) {

		return shopProductImgMapper.selectByproductId(productid);
	}
}
