package com.cos.photogramstart.web.dto.comment;

import lombok.Data;

@Data
public class CommentDto {
	
	/* 댓글 내용 */
	private String content;
	
	/* 이미지 id */
	private int imageId;
	
	// toEntity불필요

}
