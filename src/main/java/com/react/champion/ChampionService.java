package com.react.champion;

import java.util.List;

public interface ChampionService {

	void insertcp(ChampionVO vo);
	void updatecp(ChampionVO vo);
	List<ChampionVO> selectcp(ChampionVO vo);

}
