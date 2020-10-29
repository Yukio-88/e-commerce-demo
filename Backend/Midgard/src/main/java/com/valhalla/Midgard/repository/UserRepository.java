package com.valhalla.Midgard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.valhalla.Midgard.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	User findByEmailAndPassword(@Param("email")String email,@Param("password") String password);
	
}
