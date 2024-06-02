package com.react.loltip;

import lombok.Data;

@Data
public class LoltipVO {
	 private String idx;
	 private String views;
	 private String title;
	 private String dates;
	 private String name;
	 private String detail;
	 private String up;
	 
	 private String currentpage; //현재 페이지
	 private String totalcount; //총 데이터 갯수
	 private String pagecount; //화면에 나타낼 페이지 갯수
	 private String total; // 한 페이지 당 나타낼 데이터 갯수
	 private String totalpage; //총 페이지 갯수
	 private String pagegroup; // 현재 페이지 그룹
	 private String firstnumber; // 현재 페이지의 첫번째 숫자
	 private String lastnumber; // 현재 페이지의 마지막 숫자
	 private String next;
	 private String prev;
	 private String endpage;
	 
	 private int start;
	 private int end;
}
