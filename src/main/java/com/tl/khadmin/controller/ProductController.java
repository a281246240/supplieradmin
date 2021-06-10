package com.tl.khadmin.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.tl.khadmin.bean.ShopProduct;
import com.tl.khadmin.bean.ShopProductImg;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.ProductIService;
import com.tl.khadmin.util.CommonUtil;

@Controller
@RequestMapping(value = "/product")
public class ProductController {
	
	@Resource
	private ProductIService productService;

	@RequestMapping(value = "/showproductbypage")
	public @ResponseBody Map<String, Page<ShopProduct>> showProductByPage(Integer pageNum,Integer pageSize,String code,String name,
			String brandname,Integer state,String startTime, String endTime) {
		
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startTime", startTime);
		params.put("endTime", endTime);
		
		params.put("code", code);
		params.put("name", name);
		params.put("brandname", brandname);
		params.put("state", state);
		
		return CommonUtil.returnResultCodeJson("result", productService.showProductByPage(pageNum, pageSize, params));
	}
	
	@RequestMapping(value="/saveproductpic")  
	@ResponseBody
	public Map<String, String> saveProductPic(HttpSession session, @RequestParam("file") MultipartFile[] files, Integer productId){
		
		String path = session.getServletContext().getRealPath("/upload/productimg");
		return CommonUtil.returnResultCodeJson("result", productService.saveProductPic(path,files,productId)); 
	}
	
	@RequestMapping(value = "/addproduct")
	@ResponseBody
	public void addProduct(HttpSession session,HttpServletRequest request,HttpServletResponse response) {
		
		String root = session.getServletContext().getRealPath("/upload/productimg");
        DiskFileItemFactory factory = new DiskFileItemFactory();    
        ServletFileUpload upload = new ServletFileUpload(factory);  
        try {  
            List items = upload.parseRequest(request);  
            Iterator it = items.iterator();  
            ShopProduct shopProduct = new ShopProduct();
            while (it.hasNext()) {  
                FileItem item = (FileItem) it.next();  
                if (item.isFormField()) { // 处理表单域  
                    if (item.getFieldName().equals("name")) {  
                        String name = item.getString("UTF-8");  
                        shopProduct.setName(name);
                    }else if (item.getFieldName().equals("description")) {  
                        String description = item.getString("UTF-8");  
                        shopProduct.setDescription(description);
                    }else if (item.getFieldName().equals("originalprice")) {  
                    	String oprice = item.getString("UTF-8");
                    	Float originalprice = Float.parseFloat(oprice);
                        shopProduct.setOriginalprice(originalprice);
                    }else if (item.getFieldName().equals("price")) {  
                    	String pri = item.getString("UTF-8");
                    	Float price = Float.parseFloat(pri);
                        shopProduct.setPrice(price);
                    }else if (item.getFieldName().equals("weight")) {  
                    	String wei = item.getString("UTF-8");
                    	Float weight = Float.parseFloat(wei);
                        shopProduct.setWeight(weight);
                    }else if (item.getFieldName().equals("code")) {  
                        String code = item.getString("UTF-8");  
                        shopProduct.setCode(code);
                    }else if (item.getFieldName().equals("stock")) {  
                        String stock = item.getString("UTF-8");  
                        shopProduct.setStock(Integer.parseInt(stock));
                    }else if (item.getFieldName().equals("state")) {  
                        String state = item.getString("UTF-8");  
                        shopProduct.setState(Integer.parseInt(state));
                    }else if (item.getFieldName().equals("brandname")) {  
                        String brandname = item.getString("UTF-8");  
                        shopProduct.setBrandname(brandname);
                    }
                }
                if(item.getFieldName().equals("mainImg")){
                	String mainImg = item.getString("UTF-8"); 
                	if(mainImg==null || mainImg.equals("")){
                		response.setContentType("text/html; charset=UTF-8"); //转码
                	    PrintWriter out = response.getWriter();
                	    out.flush();
                	    out.println("{\"result\":\"fail\",\"message\":\"请先选择主图\"}");
                		return;
                	}
                }
            }  
            Map<String, Object> result = productService.saveProduct(shopProduct);
            if("fail".equals(result.get("result"))) {
            	response.setContentType("text/html; charset=UTF-8"); //转码
        	    PrintWriter out = response.getWriter();
        	    out.flush();
        	    out.println("{\"result\":\"fail\",\"message\":\"添加失败\"}");
        	    return;
            }
            Integer productId = (Integer) result.get("message");
            Iterator fileit = items.iterator();
            while (fileit.hasNext()) {  
                FileItem item = (FileItem) fileit.next();  
                if (!item.isFormField()) { // 处理文件 
                	 if (item.getName() != null && !item.getName().equals("") && item.getFieldName().equals("mainImg")) {  
                     	File file = new File(root);
                     	if(!file.exists()) {
                     		file.mkdirs();          
                     	}
                     	DateFormat df = new SimpleDateFormat("yyyyMMddhhmmssSSS");
                     	String datePath = df.format(new Date());
         				String picurl = datePath + ".jpg";
                        file = new File(root,picurl);  
                        ShopProductImg productImg = new ShopProductImg();
         				productImg.setImgpath("/upload/productimg/" + picurl);
         				productImg.setProductid(productId);
         				productImg.setType(productImg.MAIL_IMG);
         				productService.saveProductImg(productImg);
                        item.write(file);  
                     }else if(item.getName() != null && !item.getName().equals("") && item.getFieldName().equals("fileImg")){
                    	File file = new File(root);
                      	if(!file.exists()) {
                      		file.mkdirs();          
                      	}
                      	DateFormat df = new SimpleDateFormat("yyyyMMddhhmmssSSS");
                      	String datePath = df.format(new Date());
          				String picurl = datePath + ".jpg";
                        file = new File(root,picurl);  
                        ShopProductImg productImg = new ShopProductImg();
          				productImg.setImgpath("/upload/productimg/" + picurl);
          				productImg.setProductid(productId);
          				productImg.setType(productImg.VICE_IMG);
          				productService.saveProductImg(productImg);
                        item.write(file);
                     }  
                }
            }  
			response.setContentType("text/html; charset=UTF-8"); //转码
    	    PrintWriter out = response.getWriter();
    	    out.flush();
    	    out.println("{\"result\":\"success\",\"message\":\"添加成功\"}");
        } catch (Exception e) {  
        	e.printStackTrace();  
        	response.setContentType("text/html; charset=UTF-8"); //转码
     	    PrintWriter out;
			try {
				response.setContentType("text/html; charset=UTF-8"); //转码
        	    out = response.getWriter();
        	    out.flush();
        	    out.println("{\"result\":\"fail\",\"message\":\"添加失败\"}");
			} catch (IOException e1) {
				e1.printStackTrace();
			}
        }
	}
	
	@RequestMapping(value = "/deleteproductbyid")
	@ResponseBody
	public String deleteProductById(HttpSession session,Integer id) {
		if(id == null){
			return CommonUtil.returnMapResultByRows(0,"删除成功！","传入数据为空！");
		}
		Integer result = productService.deleteProductById(session,id);
		return CommonUtil.returnMapResultByRows(result,"删除成功！","删除失败！");
	}
	
	@RequestMapping(value = "/deleteproductbyids")
	@ResponseBody
	public String deleteProductByIds(HttpSession session,String ids) {
		if(ids==null){
			return CommonUtil.returnMapResultByRows(0, "","未勾选删除商品");
		}
		return productService.deleteProductByIds(session,ids);
	}
	
	@RequestMapping(value = "/queryproductbyid")
	@ResponseBody
	public Map<String, Object> queryProductById(Integer id) {
		if(id==null){
			return null;
		}
		return productService.queryProductById(id);
	}
	
	@RequestMapping(value = "/updateproduct")
	@ResponseBody
	public void updateProduct(HttpSession session,HttpServletRequest request,HttpServletResponse response) {
		
		String root = session.getServletContext().getRealPath("/upload/productimg");
        DiskFileItemFactory factory = new DiskFileItemFactory();    
        ServletFileUpload upload = new ServletFileUpload(factory);  
        try {  
        	List items = upload.parseRequest(request);  
            Iterator ite = items.iterator();  
            ShopProduct shopProduct = new ShopProduct();
            String productImgIds = null;
            while (ite.hasNext()) {  
                FileItem item = (FileItem) ite.next();  
                if (item.isFormField()) { // 处理表单域  
                    if (item.getFieldName().equals("name")) {  
                        String name = item.getString("UTF-8");  
                        shopProduct.setName(name);
                    }else if (item.getFieldName().equals("description")) {  
                        String description = item.getString("UTF-8");  
                        shopProduct.setDescription(description);
                    }else if (item.getFieldName().equals("originalprice")) {  
                    	String oprice = item.getString("UTF-8");
                    	Float originalprice = Float.parseFloat(oprice);
                        shopProduct.setOriginalprice(originalprice);
                    }else if (item.getFieldName().equals("price")) {  
                    	String pri = item.getString("UTF-8");
                    	Float price = Float.parseFloat(pri);
                        shopProduct.setPrice(price);
                    }else if (item.getFieldName().equals("weight")) {  
                    	String wei = item.getString("UTF-8");
                    	Float weight = Float.parseFloat(wei);
                        shopProduct.setWeight(weight);
                    }else if (item.getFieldName().equals("code")) {  
                        String code = item.getString("UTF-8");  
                        shopProduct.setCode(code);
                    }else if (item.getFieldName().equals("stock")) {  
                        String stock = item.getString("UTF-8");  
                        shopProduct.setStock(Integer.parseInt(stock));
                    }else if (item.getFieldName().equals("state")) {  
                        String state = item.getString("UTF-8");  
                        shopProduct.setState(Integer.parseInt(state));
                    }else if (item.getFieldName().equals("brandname")) {  
                        String brandname = item.getString("UTF-8");  
                        shopProduct.setBrandname(brandname);
                    }else if (item.getFieldName().equals("productId")){
                    	String productId = item.getString("UTF-8");  
                    	shopProduct.setId(Integer.parseInt(productId));
                    }else if (item.getFieldName().equals("productImgIds")){
                    	productImgIds = item.getString("UTF-8");  
                    }
                } 
            }  
            Map<String, Object> result = productService.updateProduct(session,shopProduct,productImgIds);
            if("fail".equals(result.get("result"))) {
            	response.setContentType("text/html; charset=UTF-8"); //转码
        	    PrintWriter out = response.getWriter();
        	    out.flush();
        	    out.println("{\"result\":\"fail\",\"message\":\"修改失败\"}");
        	    return;
            }
            Iterator fil = items.iterator();
            while (fil.hasNext()) {  
                FileItem item = (FileItem) fil.next();  
                if (!item.isFormField()) { // 处理文件 
                	 if (item.getName() != null && !item.getName().equals("") && item.getFieldName().equals("mainImg")) {  
                     	File file = new File(root);
                     	if(!file.exists()) {
                     		file.mkdirs();          
                     	}
                     	DateFormat df = new SimpleDateFormat("yyyyMMddhhmmssSSS");
                     	String datePath = df.format(new Date());
         				String picurl = datePath + ".jpg";
                        file = new File(root,picurl);  
                        ShopProductImg productImg = new ShopProductImg();
         				productImg.setImgpath("/upload/productimg/" + picurl);
         				productImg.setProductid(shopProduct.getId());
         				productImg.setType(productImg.MAIL_IMG);
         				productService.updateProductImg(session,productImg);
                        item.write(file);  
                     }  
                }
            }  
			response.setContentType("text/html; charset=UTF-8"); //转码
    	    PrintWriter out = response.getWriter();
    	    out.flush();
    	    out.println("{\"result\":\"success\",\"message\":\"修改成功\"}");
        } catch (Exception e) {  
        	e.printStackTrace();  
        	response.setContentType("text/html; charset=UTF-8"); //转码
     	    PrintWriter out;
			try {
				response.setContentType("text/html; charset=UTF-8"); //转码
        	    out = response.getWriter();
        	    out.flush();
        	    out.println("{\"result\":\"fail\",\"message\":\"修改失败\"}");
			} catch (IOException e1) {
				e1.printStackTrace();
			}
        }
	}
	
	@RequestMapping(value = "/updatestate")
	@ResponseBody
	public String updateState(Integer id,Integer state) {
		
		if(id==null || state==null ){
			return CommonUtil.returnMapResultByRows(0, "","参数错误，请重试");
		}
		int ret = productService.updateState(id,state);
		return CommonUtil.returnMapResultByRows(ret, "修改成功","修改失败");
	}
}
