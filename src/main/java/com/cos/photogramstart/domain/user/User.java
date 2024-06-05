package com.cos.photogramstart.domain.user;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// JPA - Java Persistence API(자바로 데이터를 영구적으로 저장할 수 있는 API 제공)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity	// DB에 테이블 생성
public class User {
	
	/** PK */
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)	// 번호증가전략은 DB를 따라감	
	private int id;
	
	/** 사용자Id */
	@Column(length=20, unique=true)
	private String username;
	
	/** 비밀번호 */
	@Column(nullable=false)
	private String password;
	
	/** 이름 */
	@Column(nullable=false)
	private String name;
	
	/** 웹사이트 */
	private String website;
	
	/** 바이오(자기소개) */
	private String bio;
	
	/** 이메일 */
	@Column(nullable=false)
	private String email;
	
	/** 전화번호 */
	private String phone;
	
	/** 성별 */
	private String gender;
	
	/** 사진 url */
	private String profileImageUrl;
	
	/** 역할권한 */
	private String role;
	
	/** 생성일시 */
	private LocalDateTime createDate;
	
	@PrePersist	// DB에 Insert되기직전에 실행
	public void createDate() {
		this.createDate = LocalDateTime.now();
	}
	
}
