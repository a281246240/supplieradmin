package com.tl.khadmin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tl.khadmin.bean.ShopOrder;
import com.tl.khadmin.bean.ShopOrderProduct;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.ShopOrderIService;
import com.tl.khadmin.util.CommonUtil;

@Controller
@RequestMapping(value = "/shoporder")
public class ShopOrderController {
	
	@Resource
	private ShopOrderIService shopOrderIService;

	@RequestMapping(value = "/showorderbypage")
	@ResponseBody
	public Map<String, Page<ShopOrder>> showOrderByPage(HttpSession session, int pageNum, int pageSize, String startTime,
			String endTime, String ordersn, String nickName, String receiver,String mobile,Integer state) {
		
		Map<String, Object> params = new HashMap<String, Object>(); 
		params.put("startTime", startTime);
		params.put("endTime", endTime);
		params.put("ordersn", ordersn);
		params.put("nickName", nickName);
		params.put("receiver", receiver);
		params.put("mobile", mobile);
		params.put("state", state);
		
		return CommonUtil.returnResultCodeJson("result", shopOrderIService.showOrderByPage(pageNum, pageSize, params));
	}
	
	@RequestMapping(value = "/showorderproductbypage")
	@ResponseBody
	public Map<String, Object> showOrderProductByPage(HttpSession session,Integer orderid) {
		Map<String,Object> map = new HashMap<String,Object>();
		if(orderid == null){
			map.put("fail", "数据异常");
			return map;
		}
		List<ShopOrderProduct> orderproduct = shopOrderIService.showOrderProductByOrderId(orderid);
		List<ShopOrder> shopOrder = shopOrderIService.selectOrderById(orderid);
		map.put("orderproduct", orderproduct);
		map.put("shoporder", shopOrder.get(0));
		return map;
	}
	
	@RequestMapping(value = "/updateorderstate")
	@ResponseBody
	public String updateOrderState(Integer id,String expresscompany,String expressnumber) {
		if(id == null){
			return CommonUtil.returnMapResultToJson("fail","数据异常，请重试");
		}
		ShopOrder shopOrder = new ShopOrder();
		shopOrder.setId(id);
		shopOrder.setExpresscompany(expresscompany);
		shopOrder.setExpressnumber(expressnumber);
		shopOrder.setState(shopOrder.STATE_WAITDELIVERY);
		Integer ret = shopOrderIService.updateShopOrder(shopOrder);
		return CommonUtil.returnMapResultByRows(ret, "发货成功","发货失败，请重新填写");
	}
	
	@RequestMapping(value = "/selectorderbyid")
	@ResponseBody
	public ShopOrder selectOrderById(Integer id) {
		if(id == null){
			return null;
		}
		return shopOrderIService.selectShopOrderById(id);
	}
}
