package com.tl.khadmin.service.impl;

import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.multipart.MultipartFile;

import com.tl.khadmin.bean.ShopProduct;
import com.tl.khadmin.bean.ShopProductImg;
import com.tl.khadmin.mapper.ShopProductImgMapper;
import com.tl.khadmin.mapper.ShopProductMapper;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.ProductIService;
import com.tl.khadmin.util.CommonUtil;

@Service
public class ProductServiceImpl implements ProductIService{

	@Resource
	private ShopProductMapper shopProductMapper;
	@Resource
	private ShopProductImgMapper shopProductImgMapper;
	
	@Override
	public Map<String, Object> saveProduct(ShopProduct shopProduct) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		shopProduct.setCreatetime(new Date());
		Integer result = shopProductMapper.insert(shopProduct);
		Integer id = shopProduct.getId();
		if(1 == result) {
			map.put("result", "success");
			map.put("message", id);
			return map;
		}else {
			map.put("result", "fail");
			return map;
		}
	}
	
	@Override
	public String saveProductImg(ShopProductImg productImg) {
		if(productImg.getType() == 1){//插入主图
			Map<String,Object> map = new HashMap<>();
			map.put("productid", productImg.getProductid());
			map.put("type", productImg.getType());
			ShopProductImg oldProductImg = shopProductImgMapper.selectByKey(map);
			if(oldProductImg != null && oldProductImg.getType() == productImg.getType()){//若查询到主图则不能继续插入主图
				return CommonUtil.result(0);
			}
			ShopProduct newProduct = new ShopProduct();
			newProduct.setId(productImg.getProductid());
			newProduct.setImgurl(productImg.getImgpath());
			Integer result = shopProductMapper.updateByPrimaryKeySelective(newProduct);
			if(result!=1){
				return CommonUtil.result(0);
			}
		}
		Integer ret = shopProductImgMapper.insert(productImg);
		return CommonUtil.result(ret);
	}
	
	public String saveProductPic(String basePath, MultipartFile[] files, Integer productId) {

		if(productId==null || files.length==0)
			return "fail";
		try {  
			DateFormat df = new SimpleDateFormat("yyyyMMddhhmmssSSS");
			File imgDir = new File(basePath);
			if (!imgDir.exists())
				imgDir.mkdirs();
			for (int i = 0; i < files.length; i++) {
				String datePath = df.format(new Date());
				String picurl = datePath + ".jpg";
				File toFile = new File(basePath, picurl);
				files[i].transferTo(toFile);
				ShopProductImg productImg = new ShopProductImg();
				productImg.setImgpath("/upload/productimg/" + picurl);
				productImg.setProductid(productId);
				productImg.setType(productImg.VICE_IMG);
				shopProductImgMapper.insert(productImg);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "fail";
		}
		return "success";
	}

	@Override
	public Page<ShopProduct> showProductByPage(Integer pageNum, Integer pageSize, Map<String, Object> params) {
		
		Page<ShopProduct> page=new Page<ShopProduct>(pageNum, pageSize);
        params.put("page", page);   
        List<ShopProduct> list= shopProductMapper.showProductByPage(params);  
		page.setResult(list);
		return page;
	}

	@Override
	public int deleteProductById(HttpSession session,Integer id) {
		List<ShopProductImg> list = shopProductImgMapper.selectByproductId(id);
		Integer ret1 = shopProductImgMapper.selectCountByproductId(id);
		Integer ret2 = shopProductImgMapper.deleteImgByProductId(id);
		if(ret1 == ret2){
			Integer ret3 = shopProductMapper.deleteByPrimaryKey(id);
			if(1 == ret3){
				String path = session.getServletContext().getRealPath("/");
				for(int i=0;i<list.size();i++){
					String root = path + list.get(i).getImgpath();
					File  file = new File(root);  
			        // 路径为文件且不为空则进行删除  
			        if (file.isFile() && file.exists()) {  
			            file.delete();  
			        }
				}
				return 1;
			}
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事物回滚
		}
		return 0;
	}

	@Override
	public String deleteProductByIds(HttpSession session,String _ids) {
		String[] ids = _ids.substring(0,_ids.length()-1).split(",");
		int result = shopProductMapper.deleteProductByids(ids);
		if(result==ids.length){
			List<ShopProductImg> list = shopProductImgMapper.selectByProductIds(ids);
			Integer ret2 = shopProductImgMapper.deleteImgByProductIds(ids);
			if(list != null && list.size() == ret2){
				String path = session.getServletContext().getRealPath("/");
				for(int i=0;i<list.size();i++){
					String root = path + list.get(i).getImgpath();
					File  file = new File(root);  
			        // 路径为文件且不为空则进行删除  
			        if (file.isFile() && file.exists()) {  
			            file.delete();  
			        }
				}
				return CommonUtil.returnMapResultByRows(1, "删除成功","删除失败，请重试");
			}
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事物回滚
		}
		return CommonUtil.returnMapResultByRows(0, "删除成功","删除失败，请重试");
	}

	@Override
	public Map<String, Object> queryProductById(Integer id) {
		
		Map<String, Object> result = new HashMap<>();
		ShopProduct shopProduct = shopProductMapper.selectByPrimaryKey(id);
		List<ShopProductImg> shopProductImgs = shopProductImgMapper.selectByproductId(id);
		result.put("product", shopProduct);
		result.put("imglist", shopProductImgs);
		return result;
	}

	@Override
	public Map<String, Object> updateProduct(HttpSession session,ShopProduct shopProduct,String productImgIds) {
		
		Integer result = shopProductMapper.updateByPrimaryKeySelective(shopProduct);
		Map<String, Object> map = new HashMap<String, Object>();
		if(1 != result) {
			map.put("result", "fail");
			return map;
		}
		if(productImgIds != null && productImgIds.length() > 0){
			String[] ids = productImgIds.substring(0,productImgIds.length()-1).split(",");
			List<ShopProductImg> list = shopProductImgMapper.selectByIds(ids);
			int ret = shopProductImgMapper.deleteImgByIds(ids);
			if(ids.length != ret){
				TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事物回滚
				map.put("result", "fail");
				return map;
			}
			String path = session.getServletContext().getRealPath("/");
			for(int i=0;i<list.size();i++){
				String root = path + list.get(i).getImgpath();
				File  file = new File(root);  
		        // 路径为文件且不为空则进行删除  
		        if (file.isFile() && file.exists()) {  
		            file.delete();  
		        }
			}
		}
		map.put("result", "success");
		return map;
	}

	@Override
	public Integer deleteProductImgByProductId(Integer productid) {
		
		return shopProductImgMapper.deleteImgByProductId(productid);
	}

	@Override
	public int queryCountByProductId(Integer productid) {

		return shopProductImgMapper.selectCountByproductId(productid);
	}

	@Override
	public int updateState(Integer id, Integer state) {
		ShopProduct shopProduct = new ShopProduct();
		shopProduct.setId(id);
		shopProduct.setState(state);
		return shopProductMapper.updateByPrimaryKeySelective(shopProduct);
	}

	@Override
	public int updateProductImg(HttpSession session,ShopProductImg productImg) {
		Map<String,Object> map = new HashMap<>();
		map.put("productid", productImg.getProductid());
		map.put("type", productImg.getType());
		ShopProductImg shopProductImg = shopProductImgMapper.selectByKey(map);
		String path = session.getServletContext().getRealPath("/");
		path = path + shopProductImg.getImgpath();
		File  file = new File(path);  
        // 路径为文件且不为空则进行删除  
        if (file.isFile() && file.exists()) {  
            file.delete();  
        }
        ShopProduct newProduct = new ShopProduct();
		newProduct.setId(productImg.getProductid());
		newProduct.setImgurl(productImg.getImgpath());
		Integer result = shopProductMapper.updateByPrimaryKeySelective(newProduct);
		if(result!=1){
			return result;
		}
		return shopProductImgMapper.updateImgByProductId(productImg);
	}

}
