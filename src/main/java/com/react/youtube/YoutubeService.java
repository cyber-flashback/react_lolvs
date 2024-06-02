package com.react.youtube;

import java.util.List;

public interface YoutubeService {
	void insertyoutube(YoutubeVO vo);
	List<YoutubeVO> selectyoutube(YoutubeVO vo);
}
