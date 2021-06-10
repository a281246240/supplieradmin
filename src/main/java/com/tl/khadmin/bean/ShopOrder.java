package com.tl.khadmin.bean;

import java.util.Date;

public class ShopOrder {
	
	/** 待付款 **/
	public static final int STATE_WAITPAY = 1;
	/** 已取消 **/
	public static final int STATE_CANCEL = 2;
	/** 待发货 **/
	public static final int STATE_WAITSEND = 3;
	/** 待收货 **/
	public static final int STATE_WAITDELIVERY = 4;
	/** 待评价 **/
	public static final int STATE_WAITEVALUATE = 5;
	/** 已完成 **/
	public static final int STATE_FINISH = 10;
	
    private Integer id;
    private String ordersn;
    private Integer vipid;
    private Float orderprice;
    private Integer state;
    private Integer proid;
    private Integer cityid;
    private Integer districtid;
    private Integer townid;
    private String districtfullname;
    private String address;
    private String receiver;
    private String mobile;
    private String phone;
    private Date createtime;
    private String expresscompany;
    private String expressnumber;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrdersn() {
        return ordersn;
    }

    public void setOrdersn(String ordersn) {
        this.ordersn = ordersn == null ? null : ordersn.trim();
    }

    public String getExpresscompany() {
		return expresscompany;
	}

	public void setExpresscompany(String expresscompany) {
		this.expresscompany = expresscompany;
	}

	public String getExpressnumber() {
		return expressnumber;
	}

	public void setExpressnumber(String expressnumber) {
		this.expressnumber = expressnumber;
	}

	public Integer getVipid() {
        return vipid;
    }

    public void setVipid(Integer vipid) {
        this.vipid = vipid;
    }

    public Float getOrderprice() {
        return orderprice;
    }

    public void setOrderprice(Float orderprice) {
        this.orderprice = orderprice;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getProid() {
        return proid;
    }

    public void setProid(Integer proid) {
        this.proid = proid;
    }

    public Integer getCityid() {
        return cityid;
    }

    public void setCityid(Integer cityid) {
        this.cityid = cityid;
    }

    public Integer getDistrictid() {
        return districtid;
    }

    public void setDistrictid(Integer districtid) {
        this.districtid = districtid;
    }

    public Integer getTownid() {
        return townid;
    }

    public void setTownid(Integer townid) {
        this.townid = townid;
    }

    public String getDistrictfullname() {
        return districtfullname;
    }

    public void setDistrictfullname(String districtfullname) {
        this.districtfullname = districtfullname == null ? null : districtfullname.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver == null ? null : receiver.trim();
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile == null ? null : mobile.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }
}