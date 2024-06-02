package com.react.champion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChampionServiceImpl implements ChampionService {

	@Autowired
	private ChampionDao dao;
	
	@Override
	public void insertcp(ChampionVO vo) {
		dao.insertcp(vo);
		
	}

	@Override
	public void updatecp(ChampionVO vo) {
		dao.updatecp(vo);
		
	}

	@Override
	public List<ChampionVO> selectcp(ChampionVO vo) {
		// TODO Auto-generated method stub
		return dao.selectcp(vo);
	}



}
