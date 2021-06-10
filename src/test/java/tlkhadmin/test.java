package tlkhadmin;

import java.math.BigDecimal;

public class test {
	public static void main(String[] args) {
		Double no1 = 40.421;
		Double no2 = 40.556;
		BigDecimal bd1 = new BigDecimal(no1*10);
		BigDecimal bd2 = new BigDecimal(no2*10);
		
		System.out.println(bd1);
		System.out.println(bd2);
		
		System.out.println(bd1.setScale(0, BigDecimal.ROUND_HALF_UP).intValue());
		System.out.println(bd2.intValue());
	}
}
