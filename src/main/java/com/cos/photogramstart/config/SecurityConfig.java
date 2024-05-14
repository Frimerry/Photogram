package com.cos.photogramstart.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// super삭제 - 기존 시큐리티가 가지고 있는 기능 비활성화
		http.authorizeRequests()
		.antMatchers("/", "/user/**", "/image/**", "/subscribe/**", "/comment/**").authenticated()	// 인증 필요
		.anyRequest().permitAll()	// 그 외 인증은 허용
		.and()
		.formLogin().loginPage("/auth/signin")
		.defaultSuccessUrl("/");
	}
}
