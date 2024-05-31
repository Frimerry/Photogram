package com.cos.photogramstart.domain.user;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;

import lombok.Builder;
import lombok.Data;

// JPA - Java Persistence API(자바로 데이터를 영구적으로 저장할 수 있는 API 제공)
@Builder
@Data
@Entity	// DB에 테이블 생성
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)	// 번호증가전략은 DB를 따라감
	private int id;	// PK
	private String username;
	private String password;
	
	private String name;
	private String website;
	private String bio;
	private String email;
	private String phone;
	private String gender;
	
	private String profileImageUrl;	// 사진
	private String role;			// 권한
	
	private LocalDateTime createDate;
	
	@PrePersist	// DB에 Insert되기직전에 실행
	public void createDate() {
		this.createDate = LocalDateTime.now();
	}
	
}
