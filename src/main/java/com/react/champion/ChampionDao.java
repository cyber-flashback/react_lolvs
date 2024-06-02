package com.react.champion;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ChampionDao {

	void insertcp(ChampionVO vo);
	void updatecp(ChampionVO vo);
	List<ChampionVO> selectcp(ChampionVO vo);

}
