package com.tl.khadmin.service;

import java.util.List;

import com.tl.khadmin.bean.ShopProductImg;

public interface ProductImgIService {

	List<ShopProductImg> queryProductsByProductId(Integer productid);
	
}
