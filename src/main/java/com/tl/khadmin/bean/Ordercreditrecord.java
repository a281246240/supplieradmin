package com.tl.khadmin.bean;

import java.util.Date;

import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.springframework.format.annotation.DateTimeFormat;

import com.tl.khadmin.enums.OrderCreditRecordStatusEnum;
import com.tl.khadmin.util.CustomDateSerializer;

public class Ordercreditrecord {
    private Integer id;

    private Integer vipid;

    private String orderid;
    
    private Float orderfee;

    private Integer month;

    private Float total;

    private Date createtime;

    private OrderCreditRecordStatusEnum status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getVipid() {
        return vipid;
    }

    public void setVipid(Integer vipid) {
        this.vipid = vipid;
    }

    public String getOrderid() {
        return orderid;
    }

    public void setOrderid(String orderid) {
        this.orderid = orderid;
    }


	public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Float getTotal() {
		return total;
	}

	public void setTotal(Float total) {
		this.total = total;
	}

    public Float getOrderfee() {
		return orderfee;
	}

	public void setOrderfee(Float orderfee) {
		this.orderfee = orderfee;
	}

    @JsonSerialize(using = CustomDateSerializer.class)
    public Date getCreatetime() {
        return createtime;
    }

    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public OrderCreditRecordStatusEnum getStatus() {
		return status;
	}

	public void setStatus(OrderCreditRecordStatusEnum status) {
		this.status = status;
	}

}