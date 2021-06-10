package com.tl.khadmin.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

public class DownExcel {

	public static void downExcel(String srcFilepath,HttpServletResponse response){
		try {
           
            // path是指欲下载的文件的路径。
            File file = new File(srcFilepath);
            // 取得文件名。
            String filename = srcFilepath.substring(srcFilepath.lastIndexOf("/")+1);
            // 取得文件的后缀名。
            //String ext = filename.substring(filename.lastIndexOf(".") + 1).toUpperCase();
            // 以流的形式下载文件。
            InputStream fis = new BufferedInputStream(new FileInputStream(srcFilepath));
            byte[] buffer = new byte[fis.available()];
            fis.read(buffer);
            fis.close();
            // 清空response
            response.reset();
            // 设置response的Header          
            response.addHeader("Content-Disposition", "attachment;filename="+ new String(filename.getBytes("GBK"),"ISO-8859-1"));
            response.addHeader("Content-Length", "" + file.length());
            OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
            response.setContentType("application/octet-stream");
            toClient.write(buffer);
            toClient.flush();
            toClient.close();
        } catch (IOException ex) {
            ex.printStackTrace();
        } 
	}

}
