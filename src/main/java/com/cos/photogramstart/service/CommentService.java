package com.cos.photogramstart.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cos.photogramstart.domain.comment.Comment;
import com.cos.photogramstart.domain.comment.CommentRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CommentService {
	
	private final CommentRepository commentRepository;
	
	/* 댓글 작성 */
	@Transactional
	public Comment writeComment(){
		return null;
	}
	
	/* 댓글 삭제 */
	@Transactional
	public void deleteComment() {
		
	}

}
