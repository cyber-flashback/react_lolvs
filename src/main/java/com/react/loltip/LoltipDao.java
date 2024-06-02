package com.react.loltip;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoltipDao {
	void inserttip(LoltipVO vo);
	void updatetip(LoltipVO vo);
	void deletetip(LoltipVO vo);
	void updatetipwrite(LoltipVO vo);
	List<LoltipVO> selecttip(LoltipVO vo);
	LoltipVO selectone(LoltipVO vo);
	void suggestion(LoltipVO vo);
	int count(LoltipVO vo);
}
