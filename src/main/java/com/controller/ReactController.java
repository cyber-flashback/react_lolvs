package com.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.json.simple.parser.JSONParser;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.react.champion.ChampionServiceImpl;
import com.react.champion.ChampionVO;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.ServletContext;

@CrossOrigin("*")
@RestController
public class ReactController {
	
	String path2="";
	
	@Autowired // 서블릿 주입하기
	private ServletContext servletContext;
	
	@PostConstruct 
	public void init() {
		path2 = servletContext.getRealPath("/championimg/");
		System.out.println("path:" + path2);
	}

	@Autowired
	private ChampionServiceImpl Service;
	
	
	@GetMapping("/index")
	String index(){
			return "Hello World";
	}
	
	@GetMapping("/lolchamupdate.do")
  	String apiExplorer(ChampionVO  vo) throws Exception {
		   
	        StringBuilder urlBuilder = new StringBuilder("https://ddragon.leagueoflegends.com/cdn/14.3.1/data/ko_KR/champion.json"); /*URL*/
	        
	        URL url = new URL(urlBuilder.toString());
	        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
	        conn.setRequestMethod("GET");
	        conn.setRequestProperty("Content-type", "application/json");
	        //System.out.println("Response code: " + conn.getResponseCode());
	        
	        BufferedReader rd;
	        
	        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
	            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
	        } else {
	            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
	        }
	        StringBuilder sb = new StringBuilder();
	        String line;
	        while ((line = rd.readLine()) != null) {
	            sb.append(line);
	        }
	        rd.close();
	        conn.disconnect();
	        //System.out.println(sb.toString());
	         
	        	 
	             JSONParser jsonParser = new JSONParser();
	             JSONObject jsonObject = (JSONObject) jsonParser.parse(sb.toString());
	             // items의 배열을 추출
	             JSONObject dataObject = (JSONObject) jsonObject.get("data");
	             System.out.println("* Champions *");

	             // 각 챔피언에 대한 정보 추출 및 처리
	             for (Object championKey : dataObject.keySet()) {
	                 JSONObject championObject = (JSONObject) dataObject.get((String) championKey);
	                 String championName = (String) championObject.get("name");
	                 String championKeyStr = (String) championObject.get("key");
	                 String championId = (String) championObject.get("id");
	  
	                 System.out.println("Champion Name: " + championName);
	                 //System.out.println("Champion Key: " + championKeyStr);
	                 System.out.println("Champion id: " + championId);
	                 
		             // VO에 챔피언 정보 설정
		             vo.setChampion(championName);
		             vo.setIdx((championKeyStr));
	                 vo.setImage(championId); 
	
		             // DB에 챔피언 정보 삽입
		             //    Service.insertcp(vo);
	                 //Service.updatecp(vo);
	                 
	                 
//	                 String fileUrl = "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/"+championId+".png";
//	                 URI    url1     = URI.create(fileUrl);
//
//	                 // 원격 파일 다운로드
//	                 RestTemplate           rt     = new RestTemplate();
//	                 ResponseEntity<byte[]> res    = rt.getForEntity(url1, byte[].class);
//	                 byte[]                 buffer = res.getBody();
					 
	                 
//	                 // 로컬 서버에 저장
//	                 String fileName = championId;                    // 파일명 (랜덤생성)
//	                 String ext      = "." + StringUtils.getFilenameExtension(fileUrl); // 확장자 추출
		
//	                 Path   target   = Paths.get(path2, championId + ext);    // 파일 저장 경로
	                 
	                 

	                 Path   target   = Paths.get("C:\\Users\\Administrator\\Desktop\\react\\lolvs\\src\\champions", championId + ".js");    // 파일 저장 경로
	                 
	                 
	                 try {
	                     //FileCopyUtils.copy(buffer, target.toFile());
	                	 Path newtarget = Files.createFile(target);
	                 } catch (IOException e) {
	                     e.printStackTrace();
	                 }

	             }
	             
	             
				return "redirect:end.html";
	}
	
	
	@GetMapping("/selectcp")
	JSONObject selectcp(ChampionVO vo){
		
			List<ChampionVO> abc1 = Service.selectcp(vo);

	        JSONObject obj = new JSONObject();
	        //System.out.println(abc1.size());
	        obj.put("cham", abc1);
	        //System.out.println(abc1);
			return obj;
	}
	
	
	@GetMapping("/test")
	List<ChampionVO> test(ChampionVO vo){
		return Service.selectcp(vo);
	}
	
	
}