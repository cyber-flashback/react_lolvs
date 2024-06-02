package com.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.react.champion.ChampionVO;
import com.react.youtube.YoutubeServiceImpl;
import com.react.youtube.YoutubeVO;

@CrossOrigin("*")
@RestController
public class YoutubeController {

	@Autowired
	private YoutubeServiceImpl service;
	
	@GetMapping("/test2")
	String test2(YoutubeVO vo) throws Exception {
		   
        StringBuilder urlBuilder = new StringBuilder("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q="+vo.getLine()+vo.getChampion()+vo.getVschampion()+"&type=video&key=AIzaSyDJj0K2hF3VUPu9Ppm--iWy37zbK2-ap5E"); /*URL*/
        
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
        System.out.println(sb.toString());
         
        	 
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(sb.toString());
        
        // items의 배열을 추출
        JSONArray items = (JSONArray) jsonObject.get("items");
        int loopCount = Math.min(items.size(), 10); // items.size()와 10 중 작은 값을 선택
	
	        // 각 챔피언에 대한 정보 추출 및 처리
	        for (int i = 0; i < loopCount ; i++) {
	            JSONObject item = (JSONObject) items.get(i);

	            // id 객체 추출
	            JSONObject idObject = (JSONObject) item.get("id");
	            String videoid = (String) idObject.get("videoId");

	            // snippet 객체 추출
	            JSONObject snippet = (JSONObject) item.get("snippet");
	            String publishedAt = (String) snippet.get("publishedAt");
	
	            System.out.println("champion : " + vo.getChampion());
	            System.out.println("videoid : " + videoid);
	            System.out.println("publishedAt : " + publishedAt);
	            System.out.println("vschampion : "+ vo.getVschampion());
	            System.out.println("line : "+ vo.getLine());
	     
	            // VO에 챔피언 정보 설정
	            vo.setChampion(vo.getChampion());
	             vo.setVideoid(videoid);
                vo.setUploaddate(publishedAt);
                vo.setVschampion(vo.getVschampion());
                vo.setLine(vo.getLine());
            
            
                 service.insertyoutube(vo);

            }
             
             
			return null;

	}
	
	@GetMapping("/youtubelist")
	List<YoutubeVO> youtubelist(YoutubeVO vo){
		return service.selectyoutube(vo);
	}

	
}
