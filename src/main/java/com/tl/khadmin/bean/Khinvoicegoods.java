package com.tl.khadmin.bean;

public class Khinvoicegoods {
    private Integer id;

    private String ggxh;

    private String goodsid;

    private String qyspbm;

    private String dw;

    private String spmc;

    private Double dj;

    private String lslbz;

    private Double slv;

    private String spbm;

    private String spfl;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getGgxh() {
        return ggxh;
    }

    public void setGgxh(String ggxh) {
        this.ggxh = ggxh == null ? null : ggxh.trim();
    }

    public String getGoodsid() {
        return goodsid;
    }

    public void setGoodsid(String goodsid) {
        this.goodsid = goodsid == null ? null : goodsid.trim();
    }

    public String getQyspbm() {
        return qyspbm;
    }

    public void setQyspbm(String qyspbm) {
        this.qyspbm = qyspbm == null ? null : qyspbm.trim();
    }

    public String getDw() {
        return dw;
    }

    public void setDw(String dw) {
        this.dw = dw == null ? null : dw.trim();
    }

    public String getSpmc() {
        return spmc;
    }

    public void setSpmc(String spmc) {
        this.spmc = spmc == null ? null : spmc.trim();
    }

    public Double getDj() {
        return dj;
    }

    public void setDj(Double dj) {
        this.dj = dj;
    }

    public String getLslbz() {
        return lslbz;
    }

    public void setLslbz(String lslbz) {
        this.lslbz = lslbz == null ? null : lslbz.trim();
    }

    public Double getSlv() {
        return slv;
    }

    public void setSlv(Double slv) {
        this.slv = slv;
    }

    public String getSpbm() {
        return spbm;
    }

    public void setSpbm(String spbm) {
        this.spbm = spbm == null ? null : spbm.trim();
    }

    public String getSpfl() {
        return spfl;
    }

    public void setSpfl(String spfl) {
        this.spfl = spfl == null ? null : spfl.trim();
    }

	@Override
	public String toString() {
		return "Khinvoicegoods [id=" + id + ", ggxh=" + ggxh + ", goodsid=" + goodsid + ", qyspbm=" + qyspbm + ", dw="
				+ dw + ", spmc=" + spmc + ", dj=" + dj + ", lslbz=" + lslbz + ", slv=" + slv + ", spbm=" + spbm
				+ ", spfl=" + spfl + "]";
	}
    
    
}