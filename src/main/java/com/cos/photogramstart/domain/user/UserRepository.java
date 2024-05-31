package com.cos.photogramstart.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

// @없이 JpaRepository 상속하면 Ioc 자동등록
public interface UserRepository extends JpaRepository<User, Integer>{

}
