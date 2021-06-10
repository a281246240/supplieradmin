package com.tl.khadmin.service;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.web.multipart.MultipartFile;

import com.tl.khadmin.bean.ShopProduct;
import com.tl.khadmin.bean.ShopProductImg;
import com.tl.khadmin.page.Page;

public interface ProductIService {

	Map<String, Object> saveProduct(ShopProduct shopProduct);
	
	Page<ShopProduct> showProductByPage(Integer pageNum,Integer pageSize, Map<String,Object> params);
	
	int deleteProductById(HttpSession session,Integer id);
	
	String deleteProductByIds(HttpSession session,String _ids);
	
	Map<String, Object> queryProductById(Integer id);
	
	Map<String, Object> updateProduct(HttpSession session,ShopProduct shopProduct,String productImgIds);

	String saveProductPic(String path, MultipartFile[] files, Integer productId);

	String saveProductImg(ShopProductImg productImg);
	
	int updateProductImg(HttpSession session,ShopProductImg productImg);
	
	int queryCountByProductId(Integer productid);
	
	Integer deleteProductImgByProductId(Integer productid);
	
	int updateState(Integer id,Integer state);
}
