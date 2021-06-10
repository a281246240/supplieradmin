package com.tl.khadmin.bean;

import java.util.Date;

public class Viproleoperation {
    private Integer id;

    private Integer rolevalue;

    private Integer moduleid;

    private Integer optvalue;

    private Date createtime;

    private Date lastupdatetime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRolevalue() {
        return rolevalue;
    }

    public void setRolevalue(Integer rolevalue) {
        this.rolevalue = rolevalue;
    }

    public Integer getModuleid() {
        return moduleid;
    }

    public void setModuleid(Integer moduleid) {
        this.moduleid = moduleid;
    }

    public Integer getOptvalue() {
        return optvalue;
    }

    public void setOptvalue(Integer optvalue) {
        this.optvalue = optvalue;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getLastupdatetime() {
        return lastupdatetime;
    }

    public void setLastupdatetime(Date lastupdatetime) {
        this.lastupdatetime = lastupdatetime;
    }
}