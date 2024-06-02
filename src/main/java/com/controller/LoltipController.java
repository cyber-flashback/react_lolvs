package com.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.react.loltip.LoltipServiceImpl;
import com.react.loltip.LoltipVO;

@CrossOrigin("*")
@RestController
public class LoltipController {

	@Autowired
	private LoltipServiceImpl service;
	
	@GetMapping("selecttip")
	public List<LoltipVO> selecttip(@RequestParam(defaultValue = "1") int currentpage,
            @RequestParam(defaultValue = "7") int total) {
		 // VO 객체 생성
		LoltipVO vo = new LoltipVO();
		int pagecount = 5;  // 화면에 나타날 페이지 갯수
	    int totalcount = service.count(null);
		int totalpage = (int) Math.ceil((double)totalcount / total); // 총 페이지 갯수
		int pagegroup = (int) Math.ceil((double)currentpage / pagecount); // 현재 페이지 그룹 ( 몇번째 그룹에 속해있는지 알기 위함 )
		int lastnumber = pagegroup * pagecount;
		if (lastnumber > totalpage) {
			lastnumber = totalpage;
		}
		int firstnumber = lastnumber - (pagecount - 1);
		int next = lastnumber + 1;
		int prev = firstnumber - 1;
		int endpage = (((int)Math.ceil((double)currentpage / (double)total)) * total);
		vo.setEnd(currentpage * total);
		vo.setStart(vo.getEnd() - total + 1);

	    List<LoltipVO> result = service.selecttip(vo); // 데이터를 조회하여 리스트에 저장
	    for (LoltipVO item : result) {
	        item.setCurrentpage(String.valueOf(currentpage));
	        item.setTotal(String.valueOf(total));
	        item.setTotalcount(String.valueOf(service.count(vo)));
	        item.setPagecount(String.valueOf(pagecount));
	        item.setLastnumber(String.valueOf(lastnumber));
	        item.setFirstnumber(String.valueOf(firstnumber));
	        item.setTotalpage(String.valueOf(totalpage));
	        item.setPagegroup(String.valueOf(pagegroup));
	        item.setNext(String.valueOf(next));
	        item.setPrev(String.valueOf(prev));
	    }

	    return result; // 조회된 데이터를 반환
	}

	
	@GetMapping("inserttip")
	 void inserttip(LoltipVO vo) {
		service.inserttip(vo);
	}
	
	@GetMapping("selectone")
	LoltipVO selectone(LoltipVO vo){
		service.updatetip(vo);
		return service.selectone(vo);
	}
	
	@GetMapping("updatetipwrite")
	void updatetipwrite(LoltipVO vo){
		service.updatetipwrite(vo);
	}
	
	@GetMapping("deletetip")
	void deletetip(LoltipVO vo){
		service.deletetip(vo);
	}
	
	
	@GetMapping("suggestion")
	void suggestion(LoltipVO vo){
		service.suggestion(vo);
	}
}
