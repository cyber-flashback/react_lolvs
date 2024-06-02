package com.react.kakao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface KakaoDao {
	KakaoVO selectkakao(KakaoVO vo);
	void insertkakao(KakaoVO vo);
}
