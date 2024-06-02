package com.react.loltip;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoltipServiceImpl implements LoltipService {

	@Autowired
	private LoltipDao dao;
	
	@Override
	public void inserttip(LoltipVO vo) {
		dao.inserttip(vo);
	}

	@Override
	public List<LoltipVO> selecttip(LoltipVO vo) {
		return dao.selecttip(vo);
	}

	@Override
	public LoltipVO selectone(LoltipVO vo) {
		return dao.selectone(vo);
	}

	@Override
	public void updatetip(LoltipVO vo) {
		dao.updatetip(vo);
		
	}

	@Override
	public void deletetip(LoltipVO vo) {
		dao.deletetip(vo);
		
	}

	@Override
	public void updatetipwrite(LoltipVO vo) {
		dao.updatetipwrite(vo);
		
	}

	@Override
	public int count(LoltipVO vo) {
		
		return dao.count(vo);
	}

	@Override
	public void suggestion(LoltipVO vo) {
		dao.suggestion(vo);
		
	}


}
