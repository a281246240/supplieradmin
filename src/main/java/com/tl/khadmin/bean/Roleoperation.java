package com.tl.khadmin.bean;

public class Roleoperation {
    private Integer id;

    private Integer roleoptid;

    private Integer operationid;

    private String param;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getRoleoptid() {
        return roleoptid;
    }

    public void setRoleoptid(Integer roleoptid) {
        this.roleoptid = roleoptid;
    }

    public Integer getOperationid() {
        return operationid;
    }

    public void setOperationid(Integer operationid) {
        this.operationid = operationid;
    }

    public String getParam() {
        return param;
    }

    public void setParam(String param) {
        this.param = param == null ? null : param.trim();
    }
}