package com.tl.khadmin.util; 
 
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map; 
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.digest.DigestUtils;

public class CommonUtil {
	
	
	public static <K, V> Map<K, V> returnResultCodeJson(K key,V value){
		Map<K, V> resultCode=new HashMap<K, V>(1);  
		resultCode.put(key, value);
		return resultCode;
	}
	
	
	public static String returnMapResultToJson(String resultValue,String msgValue) {
		StringBuffer buf = new StringBuffer();
		buf.append("{\"result\":\"");
		buf.append(resultValue);
		buf.append("\",\"message\":\"");
		buf.append(msgValue);
		buf.append("\"}");
		return buf.toString();
	}
	
	public static String result(int result){
		if(result==1)
			return "success";
		else if(result>1)
			throw new RuntimeException("exception");
		else
			return "fail";
	}

	
	public static <T> void printResult(HttpServletResponse response, T t)
			throws IOException {
		try {
			response.setContentType("text/html;charset=UTF-8");
			response.getWriter().print(t.toString());
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			response.getWriter().flush();
			response.getWriter().close();
		}
	}
	
	public static String returnMapResultByRows(int resultRows,String successMsg,String failMsg) {
		StringBuffer buf = new StringBuffer();
		String resultValue = "";
		String messageValue = "";
		if(resultRows==1){
			resultValue = "success";
			messageValue = successMsg;
		} else if(resultRows>1) {
			throw new RuntimeException("exception");
		} else {
			resultValue = "fail";
			messageValue = failMsg;
		}
		buf.append("{\"result\":\"");
		buf.append(resultValue);
		buf.append("\",\"message\":\"");
		buf.append(messageValue);
		buf.append("\"}");
		return buf.toString();
	}
	
	public static String sign(String data,String input_charset){
		return (DigestUtils.md5Hex(getContentBytes(data, input_charset))).toUpperCase(); 
	}
	
	private static byte[] getContentBytes(String content, String charset){
	     if ((charset == null) || ("".equals(charset))) {
	       return content.getBytes();
	     }
	     try {
	       return content.getBytes(charset);
	     } catch (UnsupportedEncodingException e) {
	    	 throw new RuntimeException("MD5签名过程中出现错误,指定的编码集不对,您目前指定的编码集是:" + charset);
	     }
    }
	
	/**
	 * 获取MD5后的字符串
	 * @param source 进行加密的字符串
	 * @return
	 */
	public static String MD5(String source) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(source.getBytes());
			byte[] b = md.digest();
			StringBuffer sb = new StringBuffer();
			for (byte c : b) {
				int val = (c) & 0xff;
				if (val < 16)
					sb.append("0");
				sb.append(Integer.toHexString(val));
			}
			return sb.toString().toUpperCase();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return null;
	}
	
}