package com.react.kakao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KakaoServiceImpl implements KakaoService {

	@Autowired
	private KakaoDao dao;
	
	@Override
	public KakaoVO selectkakao(KakaoVO vo) {
		return dao.selectkakao(vo);
	}

	@Override
	public void insertkakao(KakaoVO vo) {
		dao.insertkakao(vo);
		
	}

}
