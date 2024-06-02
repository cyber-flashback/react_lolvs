package com.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.react.kakao.KakaoServiceImpl;
import com.react.kakao.KakaoVO;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpSession;

@CrossOrigin("*")
@RestController
public class KakaoController {

	@Autowired // 서블릿 주입하기
	private ServletContext servletContext;
	
	@Autowired
	private KakaoServiceImpl service;
	
	@RequestMapping("kakaotest")
	public HashMap<String, Object> kakatotest(String code, HttpSession session) {
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");

            // (1) TODO REST_API_KEY 입력
            sb.append("&client_id=f3b5a9de3a9e3f774c76a143ca6cb87a"); 
           
            // (2) TODO 인가코드 받은 redirect_uri 입력
            sb.append("&redirect_uri=http://localhost:3000/logincallback");
          
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            
            JsonElement element = JsonParser.parseString(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        HashMap<String, Object> userInfo = new HashMap<>();
        String userURL = "https://kapi.kakao.com/v2/user/me";
        try {
            URL url = new URL(userURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            
            //    요청에 필요한 Header에 포함될 내용
            conn.setRequestProperty("Authorization", "Bearer " + access_Token);
            
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);
            
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            
            String line = "";
            String result = "";
            
            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);
            

            JsonElement element = JsonParser.parseString(result);
            
            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
            
            String id = element.getAsJsonObject().get("id").getAsString();
            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
            String email = kakao_account.getAsJsonObject().get("email").getAsString();
            String name = kakao_account.getAsJsonObject().get("name").getAsString();
            String phone_number = kakao_account.getAsJsonObject().get("phone_number").getAsString();
            
            userInfo.put("nickname", nickname);
            userInfo.put("email", email);
            userInfo.put("name", name);
            KakaoVO vo = new KakaoVO();
            vo.setId(id);
            if(service.selectkakao(vo) == null) {
            	System.out.println("카카오 회원가입 : "+ name);
            	vo.setName(name);
            	vo.setEmail(email);
            	vo.setNickname(nickname);
            	vo.setPhone_number(phone_number);
            	service.insertkakao(vo);
            }
            session.setAttribute("id", id);
            session.setAttribute("access_Token", access_Token);
	        
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
		return userInfo;
    }
	
		@RequestMapping("logout")
		public void logout(HttpSession session) throws IOException {
				 String access_Token = (String) session.getAttribute("access_Token");
				 String reqURL = "https://kapi.kakao.com/v1/user/logout";
				    try {
				        URL url = new URL(reqURL);
				        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				        conn.setRequestMethod("POST");
				        conn.setRequestProperty("Authorization", "Bearer " + access_Token);
				        
				        int responseCode = conn.getResponseCode();
				        System.out.println("responseCode : " + responseCode);
				        
				        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				        
				        String result = "";
				        String line = "";
				        
				        while ((line = br.readLine()) != null) {
				            result += line;
				        }
				        System.out.println(result);
				        session.invalidate();
				    } catch (IOException e) {
				        e.printStackTrace();
				    }
	}
}
