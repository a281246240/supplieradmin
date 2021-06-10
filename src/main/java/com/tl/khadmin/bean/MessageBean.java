package com.tl.khadmin.bean;

import com.google.gson.Gson;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="message")
public class MessageBean<T>
{
  private int code;
  private String description;
  private String token;
  private int status;
  private T data;

  public static <T> MessageBean<T> create(int code, String description, Class<T> clazz)
  {
    MessageBean bean = new MessageBean();
    bean.setCode(code);
    bean.setDescription(description);
    return bean;
  }

  @XmlElement(name="code")
  public int getCode()
  {
    return this.code;
  }

  public void setCode(int code)
  {
    this.code = code;
  }

  @XmlElement(name="description")
  public String getDescription()
  {
    return this.description;
  }

  public void setDescription(String description)
  {
    this.description = description;
  }

  @XmlElement(name="data")
  public T getData()
  {
    return this.data;
  }

  public void setData(T data)
  {
    this.data = data;
  }

  public String getToken()
  {
    return this.token;
  }

  public void setToken(String token)
  {
    this.token = token;
  }

  public int getStatus()
  {
    return this.status;
  }

  public void setStatus(int status)
  {
    this.status = status;
  }

  public String toString()
  {
    return "MessageBean [code=" + this.code + ", description=" + this.description + ", token=" + this.token + ", status=" + this.status + 
      ", data=" + this.data + "]";
  }

  public String toJson()
  {
    return new Gson().toJson(this);
  }
}