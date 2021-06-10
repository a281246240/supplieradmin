package com.tl.khadmin.bean;

import java.sql.Timestamp;
import java.util.Date;

import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.springframework.format.annotation.DateTimeFormat;

import com.tl.khadmin.enums.OrderStateEnum;
import com.tl.khadmin.util.CustomDateSerializer;

public class Order {
	
    private Integer id;
    private String orderid;
    private String sender;
    private String senderphone;
    private String sendercompany;
    private Integer sendvipid;
    private String sendvipname;
    private String sendermobile;
    private String senderaddress;
    private String senderremark;
    private String receiver;
    private String receiverphone;
    private String receivercompany;
    private String receivermobile;
    private String receiveraddress;
    private String receiverremark;
    private Integer senderproid;
    private Integer sendercityid;
    private Integer senderdistrictid;
    private Integer sendertownid;
    private String senderpcdt;
    private Integer receiverproid;
    private Integer receivercityid;
    private Integer receiverdistrictid;
    private Integer receivertownid;
    private String receiverpcdt;
    private Integer deliverytype;
    private Date pickupgoodstime;
    private Integer orgid;
    private String orgname;
    private String orgaddress;
    private Integer headid;
    private String headname;
    private Integer destid;
    private String destname;
    private String receiptno;
    private Integer receiptnum;
    private String goodsno;
    private String goodsname;
    private Integer goodsnum;
    private Float weight;
    private Float volume;
    private Integer goodsnummod;
    private Float weightmod;
    private Float volumemod;
    private Float goodsvalue;
    private Float premiumrate;
    private Integer goodsclassifyid;
    private String goodsclassifyname;
    private Integer goodscategoryid;
    private String goodscategoryname;
    private Integer packtype;
    private Float agencyfund;
    private Integer transportway;
    private Integer paytype;
    private Integer ifnotifydispatch;
    private Integer dispatchtype;
    private Integer settletype;
    private Float freightfee;
    private Float pickupfee;
    private Float securefee;
    private Float deliveryfee;
    private Float upstairsfee;
    private Float freightpoundage;
    private Float freightcollectfee;
    private Float sendfee;
    private Float agencyfundrate;
    private Float agencyfundfee;
    private Float freightrate;
    private Integer userid;
    private String username;
    private OrderStateEnum state;
    private String remark;
    private Timestamp createtime;
    private Integer creditmonth;
    private Float labellingfee;
    private String ordersn;
    private Float premiumfee;
    private String orgphone;
    private String picker;
    private String pickerphone;
    private Float orderdeposit;
    private String logisticsnumber;
    private Integer invoice;
    
    /** 发票；0：未开发票；1：申请中；2：已开发票；3：申请被拒 */ 
    /** 发票状态：未开发票 */
    public static final Integer INVOICE_NO = 0;
    /** 发票状态：申请中 */
    public static final Integer INVOICE_APPLYING = 1;
    /** 发票状态：已开发票 */
    public static final Integer INVOICE_OPENED = 2;
    /** 发票状态：申请被拒 */
    public static final Integer INVOICE_REFUSE = 3;
    /** 发票状态：4，审核中 */
    public static final Integer STATE_EXAMINE = 4;
    /** 发票状态：5，已红冲 */
    public static final Integer STATE_FPHC = 5;
    
    public Integer getId() {
        return id;
    }

    public Integer getInvoice() {
		return invoice;
	}

	public void setInvoice(Integer invoice) {
		this.invoice = invoice;
	}

	public Float getFreightpoundage() {
		return freightpoundage;
	}

	public String getLogisticsnumber() {
		return logisticsnumber;
	}

	public void setLogisticsnumber(String logisticsnumber) {
		this.logisticsnumber = logisticsnumber;
	}

	public String getOrdersn() {
		return ordersn;
	}

	public void setOrdersn(String ordersn) {
		this.ordersn = ordersn;
	}

	public void setFreightpoundage(Float freightpoundage) {
		this.freightpoundage = freightpoundage;
	}

	public Float getAgencyfundrate() {
		return agencyfundrate;
	}

	public void setAgencyfundrate(Float agencyfundrate) {
		this.agencyfundrate = agencyfundrate;
	}

	public Float getAgencyfundfee() {
		return agencyfundfee;
	}

	public void setAgencyfundfee(Float agencyfundfee) {
		this.agencyfundfee = agencyfundfee;
	}

	public Float getFreightrate() {
		return freightrate;
	}

	public void setFreightrate(Float freightrate) {
		this.freightrate = freightrate;
	}

	public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderid() {
        return orderid;
    }

    public void setOrderid(String orderid) {
        this.orderid = orderid == null ? null : orderid.trim();
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender == null ? null : sender.trim();
    }

    public String getSenderphone() {
        return senderphone;
    }

    public void setSenderphone(String senderphone) {
        this.senderphone = senderphone == null ? null : senderphone.trim();
    }

    public String getSendercompany() {
        return sendercompany;
    }

    public void setSendercompany(String sendercompany) {
        this.sendercompany = sendercompany == null ? null : sendercompany.trim();
    }

    public Integer getSendvipid() {
        return sendvipid;
    }

    public void setSendvipid(Integer sendvipid) {
        this.sendvipid = sendvipid;
    }

    public String getSendvipname() {
        return sendvipname;
    }

    public void setSendvipname(String sendvipname) {
        this.sendvipname = sendvipname == null ? null : sendvipname.trim();
    }

    public String getSendermobile() {
        return sendermobile;
    }

    public void setSendermobile(String sendermobile) {
        this.sendermobile = sendermobile == null ? null : sendermobile.trim();
    }

    public String getSenderaddress() {
        return senderaddress;
    }

    public void setSenderaddress(String senderaddress) {
        this.senderaddress = senderaddress == null ? null : senderaddress.trim();
    }

    public String getSenderremark() {
        return senderremark;
    }

    public void setSenderremark(String senderremark) {
        this.senderremark = senderremark == null ? null : senderremark.trim();
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver == null ? null : receiver.trim();
    }

    public String getReceiverphone() {
        return receiverphone;
    }

    public void setReceiverphone(String receiverphone) {
        this.receiverphone = receiverphone == null ? null : receiverphone.trim();
    }

    public String getReceivercompany() {
        return receivercompany;
    }

    public void setReceivercompany(String receivercompany) {
        this.receivercompany = receivercompany == null ? null : receivercompany.trim();
    }

    public String getReceivermobile() {
        return receivermobile;
    }

    public void setReceivermobile(String receivermobile) {
        this.receivermobile = receivermobile == null ? null : receivermobile.trim();
    }

    public String getReceiveraddress() {
        return receiveraddress;
    }

    public void setReceiveraddress(String receiveraddress) {
        this.receiveraddress = receiveraddress == null ? null : receiveraddress.trim();
    }

    public String getReceiverremark() {
        return receiverremark;
    }

    public void setReceiverremark(String receiverremark) {
        this.receiverremark = receiverremark == null ? null : receiverremark.trim();
    }

    public Integer getSenderproid() {
        return senderproid;
    }

    public void setSenderproid(Integer senderproid) {
        this.senderproid = senderproid;
    }

    public Integer getSendercityid() {
        return sendercityid;
    }

    public void setSendercityid(Integer sendercityid) {
        this.sendercityid = sendercityid;
    }

    public Integer getSenderdistrictid() {
        return senderdistrictid;
    }

    public void setSenderdistrictid(Integer senderdistrictid) {
        this.senderdistrictid = senderdistrictid;
    }

    public Integer getSendertownid() {
        return sendertownid;
    }

    public void setSendertownid(Integer sendertownid) {
        this.sendertownid = sendertownid;
    }

    public String getSenderpcdt() {
        return senderpcdt;
    }

    public void setSenderpcdt(String senderpcdt) {
        this.senderpcdt = senderpcdt == null ? null : senderpcdt.trim();
    }

    public Integer getReceiverproid() {
        return receiverproid;
    }

    public void setReceiverproid(Integer receiverproid) {
        this.receiverproid = receiverproid;
    }

    public Integer getReceivercityid() {
        return receivercityid;
    }

    public void setReceivercityid(Integer receivercityid) {
        this.receivercityid = receivercityid;
    }

    public Integer getReceiverdistrictid() {
        return receiverdistrictid;
    }

    public void setReceiverdistrictid(Integer receiverdistrictid) {
        this.receiverdistrictid = receiverdistrictid;
    }

    public String getReceiverpcdt() {
        return receiverpcdt;
    }

    public void setReceiverpcdt(String receiverpcdt) {
        this.receiverpcdt = receiverpcdt == null ? null : receiverpcdt.trim();
    }

    public Integer getDeliverytype() {
        return deliverytype;
    }

    public void setDeliverytype(Integer deliverytype) {
        this.deliverytype = deliverytype;
    }

    @JsonSerialize(using = CustomDateSerializer.class)
    public Date getPickupgoodstime() {
        return pickupgoodstime;
    }

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public void setPickupgoodstime(Date pickupgoodstime) {
        this.pickupgoodstime = pickupgoodstime;
    }

    public Integer getOrgid() {
        return orgid;
    }

    public void setOrgid(Integer orgid) {
        this.orgid = orgid;
    }

	public Integer getCreditmonth() {
		return creditmonth;
	}

	public void setCreditmonth(Integer creditmonth) {
		this.creditmonth = creditmonth;
	}

	public String getOrgname() {
        return orgname;
    }

    public void setOrgname(String orgname) {
        this.orgname = orgname == null ? null : orgname.trim();
    }

    public String getOrgaddress() {
        return orgaddress;
    }

    public void setOrgaddress(String orgaddress) {
        this.orgaddress = orgaddress == null ? null : orgaddress.trim();
    }

    public Integer getHeadid() {
        return headid;
    }

    public void setHeadid(Integer headid) {
        this.headid = headid;
    }

    public String getHeadname() {
        return headname;
    }

    public void setHeadname(String headname) {
        this.headname = headname == null ? null : headname.trim();
    }

    public Integer getDestid() {
        return destid;
    }

    public void setDestid(Integer destid) {
        this.destid = destid;
    }

    public String getDestname() {
        return destname;
    }

    public void setDestname(String destname) {
        this.destname = destname == null ? null : destname.trim();
    }

    public String getReceiptno() {
        return receiptno;
    }

    public void setReceiptno(String receiptno) {
        this.receiptno = receiptno == null ? null : receiptno.trim();
    }

    public Integer getGoodsnummod() {
		return goodsnummod;
	}

	public void setGoodsnummod(Integer goodsnummod) {
		this.goodsnummod = goodsnummod;
	}

	public Float getWeightmod() {
		return weightmod;
	}

	public void setWeightmod(Float weightmod) {
		this.weightmod = weightmod;
	}

	public Float getVolumemod() {
		return volumemod;
	}

	public void setVolumemod(Float volumemod) {
		this.volumemod = volumemod;
	}

	public Integer getReceiptnum() {
        return receiptnum;
    }

    public void setReceiptnum(Integer receiptnum) {
        this.receiptnum = receiptnum;
    }

    public String getGoodsno() {
        return goodsno;
    }

    public void setGoodsno(String goodsno) {
        this.goodsno = goodsno == null ? null : goodsno.trim();
    }

    public String getGoodsname() {
        return goodsname;
    }

    public void setGoodsname(String goodsname) {
        this.goodsname = goodsname == null ? null : goodsname.trim();
    }

    public Integer getGoodsnum() {
        return goodsnum;
    }

    public void setGoodsnum(Integer goodsnum) {
        this.goodsnum = goodsnum;
    }

    public Float getWeight() {
        return weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public Float getVolume() {
        return volume;
    }

    public void setVolume(Float volume) {
        this.volume = volume;
    }

    public Float getGoodsvalue() {
        return goodsvalue;
    }

    public void setGoodsvalue(Float goodsvalue) {
        this.goodsvalue = goodsvalue;
    }

    public Float getPremiumrate() {
        return premiumrate;
    }

    public void setPremiumrate(Float premiumrate) {
        this.premiumrate = premiumrate;
    }

    public Integer getGoodsclassifyid() {
        return goodsclassifyid;
    }

    public void setGoodsclassifyid(Integer goodsclassifyid) {
        this.goodsclassifyid = goodsclassifyid;
    }

    public String getGoodsclassifyname() {
        return goodsclassifyname;
    }

    public void setGoodsclassifyname(String goodsclassifyname) {
        this.goodsclassifyname = goodsclassifyname == null ? null : goodsclassifyname.trim();
    }

    public Integer getGoodscategoryid() {
        return goodscategoryid;
    }

    public void setGoodscategoryid(Integer goodscategoryid) {
        this.goodscategoryid = goodscategoryid;
    }

    public String getGoodscategoryname() {
        return goodscategoryname;
    }

    public void setGoodscategoryname(String goodscategoryname) {
        this.goodscategoryname = goodscategoryname == null ? null : goodscategoryname.trim();
    }

    public Integer getPacktype() {
        return packtype;
    }

    public void setPacktype(Integer packtype) {
        this.packtype = packtype;
    }

    public Float getAgencyfund() {
        return agencyfund;
    }

    public void setAgencyfund(Float agencyfund) {
        this.agencyfund = agencyfund;
    }

    public Integer getTransportway() {
        return transportway;
    }

    public void setTransportway(Integer transportway) {
        this.transportway = transportway;
    }

    public Integer getPaytype() {
        return paytype;
    }

    public void setPaytype(Integer paytype) {
        this.paytype = paytype;
    }

    public Integer getIfnotifydispatch() {
        return ifnotifydispatch;
    }

    public void setIfnotifydispatch(Integer ifnotifydispatch) {
        this.ifnotifydispatch = ifnotifydispatch;
    }

    public Integer getDispatchtype() {
        return dispatchtype;
    }

    public void setDispatchtype(Integer dispatchtype) {
        this.dispatchtype = dispatchtype;
    }

    public Integer getSettletype() {
        return settletype;
    }

    public void setSettletype(Integer settletype) {
        this.settletype = settletype;
    }

    public Float getFreightfee() {
        return freightfee;
    }

    public void setFreightfee(Float freightfee) {
        this.freightfee = freightfee;
    }

    public Float getPickupfee() {
        return pickupfee;
    }

    public void setPickupfee(Float pickupfee) {
        this.pickupfee = pickupfee;
    }

    public Float getSecurefee() {
        return securefee;
    }

    public void setSecurefee(Float securefee) {
        this.securefee = securefee;
    }

    public Float getDeliveryfee() {
        return deliveryfee;
    }

    public void setDeliveryfee(Float deliveryfee) {
        this.deliveryfee = deliveryfee;
    }

    public Float getUpstairsfee() {
        return upstairsfee;
    }

    public void setUpstairsfee(Float upstairsfee) {
        this.upstairsfee = upstairsfee;
    }

    public Float getFreightcollectfee() {
        return freightcollectfee;
    }

    public void setFreightcollectfee(Float freightcollectfee) {
        this.freightcollectfee = freightcollectfee;
    }

    public Float getSendfee() {
        return sendfee;
    }

    public void setSendfee(Float sendfee) {
        this.sendfee = sendfee;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public OrderStateEnum getState() {
		return state;
	}

	public void setState(OrderStateEnum state) {
		this.state = state;
	}

	public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    @JsonSerialize(using = CustomDateSerializer.class)
    public Timestamp getCreatetime() {
        return createtime;
    }

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public void setCreatetime(Timestamp createtime) {
        this.createtime = createtime;
    }

	public Integer getReceivertownid() {
		return receivertownid;
	}

	public void setReceivertownid(Integer receivertownid) {
		this.receivertownid = receivertownid;
	}

	public Float getLabellingfee() {
		return labellingfee;
	}

	public void setLabellingfee(Float labellingfee) {
		this.labellingfee = labellingfee;
	}

	public Float getPremiumfee() {
		return premiumfee;
	}

	public void setPremiumfee(Float premiumfee) {
		this.premiumfee = premiumfee;
	}

	public String getOrgphone() {
		return orgphone;
	}

	public void setOrgphone(String orgphone) {
		this.orgphone = orgphone;
	}

	public String getPicker() {
		return picker;
	}

	public void setPicker(String picker) {
		this.picker = picker;
	}

	public String getPickerphone() {
		return pickerphone;
	}

	public void setPickerphone(String pickerphone) {
		this.pickerphone = pickerphone;
	}

	public Float getOrderdeposit() {
		return orderdeposit;
	}

	public void setOrderdeposit(Float orderdeposit) {
		this.orderdeposit = orderdeposit;
	}
    
}