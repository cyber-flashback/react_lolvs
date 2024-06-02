package com.react.youtube;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface YoutubeDao {
	void insertyoutube(YoutubeVO vo);
	List<YoutubeVO> selectyoutube(YoutubeVO vo);
}
