package com.cos.photogramstart.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cos.photogramstart.service.CommentService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class CommentApiController {
	
	private final CommentService commentService;
	
	/* 댓글 작성 */
	@PostMapping("/api/comment")
	public ResponseEntity<?> writeComment(){
		return null;
	}
	
	/* 댓글 삭제*/
	@DeleteMapping("/api/comment/{id}")
	public ResponseEntity<?> deleteComment(@PathVariable int id){
		return null;
	}

}
