package com.react.youtube;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class YoutubeServiceImpl implements YoutubeService {

	@Autowired
	private YoutubeDao dao;
	
	@Override
	public List<YoutubeVO> selectyoutube(YoutubeVO vo) {
		return dao.selectyoutube(vo);
	}

	@Override
	public void insertyoutube(YoutubeVO vo) {
		dao.insertyoutube(vo);
		
	}

}
