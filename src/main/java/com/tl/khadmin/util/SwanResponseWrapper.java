package com.tl.khadmin.util;

import java.io.*;

//import javax.servlet.ServletOutputStream;
//import javax.servlet.WriteListener;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

public class SwanResponseWrapper extends HttpServletResponseWrapper {
	private ByteArrayOutputStream buffer = new ByteArrayOutputStream();

	public SwanResponseWrapper(HttpServletResponse response) {
		super(response);
	}

	@Override
//	public ServletOutputStream getOutputStream() throws IOException {
//		return new WapperedOutputStream(buffer);
//	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see javax.servlet.ServletResponseWrapper#getWriter()
	 */
//	@Override
	public PrintWriter getWriter() throws IOException {
		return new PrintWriter(new OutputStreamWriter(buffer, getCharacterEncoding()));
	}

	public InputStream getInputStream() {
		return new ByteArrayInputStream(buffer.toByteArray());
	}

	public byte[] getData() {
		return buffer.toByteArray();
	}

//	private class WapperedOutputStream extends ServletOutputStream {
//		private ByteArrayOutputStream bos = null;
//
//		public WapperedOutputStream(ByteArrayOutputStream stream) throws IOException {
//			bos = stream;
//		}
//
//		@Override
//		public void write(int b) throws IOException {
//			bos.write(b);
//		}
//	}
}
