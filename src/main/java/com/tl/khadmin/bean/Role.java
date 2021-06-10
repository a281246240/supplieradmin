package com.tl.khadmin.bean;

public class Role {
    private Integer id;

    private String enumkey;

    private String enumvalue;

    private String name;

    private String description;

    private Integer type;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEnumkey() {
        return enumkey;
    }

    public void setEnumkey(String enumkey) {
        this.enumkey = enumkey == null ? null : enumkey.trim();
    }

    public String getEnumvalue() {
        return enumvalue;
    }

    public void setEnumvalue(String enumvalue) {
        this.enumvalue = enumvalue == null ? null : enumvalue.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
}