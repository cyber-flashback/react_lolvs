package com.react.loltip;

import java.util.List;

public interface LoltipService {
	void inserttip(LoltipVO vo);
	void updatetip(LoltipVO vo);
	void deletetip(LoltipVO vo);
	void updatetipwrite(LoltipVO vo);
	List<LoltipVO> selecttip(LoltipVO vo);
	LoltipVO selectone(LoltipVO vo);
	void suggestion(LoltipVO vo);
	int count(LoltipVO vo);
}
