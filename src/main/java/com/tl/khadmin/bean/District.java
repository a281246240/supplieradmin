package com.tl.khadmin.bean;

import org.codehaus.jackson.map.annotate.JsonSerialize;

@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
public class District {
    private Integer id;

    private Integer pid;

    private String name;

    private String mergername;

    private String shortname;

    private String mergershortname;

    private Integer leveltype;

    private String citycode;

    private String zipcode;

    private String pinyin;

    private String jianpin;

    private String firstchar;

    private Float lng;

    private Float lat;

    private String remark;
    
    private String prefixcarno;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getPrefixcarno() {
		return prefixcarno;
	}

	public void setPrefixcarno(String prefixcarno) {
		this.prefixcarno = prefixcarno;
	}

	public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getMergername() {
        return mergername;
    }

    public void setMergername(String mergername) {
        this.mergername = mergername == null ? null : mergername.trim();
    }

    public String getShortname() {
        return shortname;
    }

    public void setShortname(String shortname) {
        this.shortname = shortname == null ? null : shortname.trim();
    }

    public String getMergershortname() {
        return mergershortname;
    }

    public void setMergershortname(String mergershortname) {
        this.mergershortname = mergershortname == null ? null : mergershortname.trim();
    }

    public Integer getLeveltype() {
        return leveltype;
    }

    public void setLeveltype(Integer leveltype) {
        this.leveltype = leveltype;
    }

    public String getCitycode() {
        return citycode;
    }

    public void setCitycode(String citycode) {
        this.citycode = citycode == null ? null : citycode.trim();
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode == null ? null : zipcode.trim();
    }

    public String getPinyin() {
        return pinyin;
    }

    public void setPinyin(String pinyin) {
        this.pinyin = pinyin == null ? null : pinyin.trim();
    }

    public String getJianpin() {
        return jianpin;
    }

    public void setJianpin(String jianpin) {
        this.jianpin = jianpin == null ? null : jianpin.trim();
    }

    public String getFirstchar() {
        return firstchar;
    }

    public void setFirstchar(String firstchar) {
        this.firstchar = firstchar == null ? null : firstchar.trim();
    }

    public Float getLng() {
        return lng;
    }

    public void setLng(Float lng) {
        this.lng = lng;
    }

    public Float getLat() {
        return lat;
    }

    public void setLat(Float lat) {
        this.lat = lat;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }
}