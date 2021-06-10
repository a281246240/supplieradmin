package com.tl.khadmin.bean;

public class Operation {
    private Integer id;

    private String name;

    private String key;

    private String param;

    private Integer parentid;

    private String keyon;

    private Integer type;

    private Integer ispage;

    private Integer menuid;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key == null ? null : key.trim();
    }

    public String getParam() {
        return param;
    }

    public void setParam(String param) {
        this.param = param == null ? null : param.trim();
    }

    public Integer getParentid() {
        return parentid;
    }

    public void setParentid(Integer parentid) {
        this.parentid = parentid;
    }

    public String getKeyon() {
        return keyon;
    }

    public void setKeyon(String keyon) {
        this.keyon = keyon == null ? null : keyon.trim();
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getIspage() {
        return ispage;
    }

    public void setIspage(Integer ispage) {
        this.ispage = ispage;
    }

    public Integer getMenuid() {
        return menuid;
    }

    public void setMenuid(Integer menuid) {
        this.menuid = menuid;
    }
}