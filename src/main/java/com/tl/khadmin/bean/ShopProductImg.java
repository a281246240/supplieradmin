package com.tl.khadmin.bean;

public class ShopProductImg {
    private Integer id;

    private Integer productid;

    private String imgpath;

    private Integer type;
    /*
     * 主图
     */
    public static final Integer MAIL_IMG = 1;
    /*
     * 副图
     */
    public static final Integer VICE_IMG = 2;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getProductid() {
        return productid;
    }

    public void setProductid(Integer productid) {
        this.productid = productid;
    }

    public String getImgpath() {
        return imgpath;
    }

    public void setImgpath(String imgpath) {
        this.imgpath = imgpath == null ? null : imgpath.trim();
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}