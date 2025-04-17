package com.example.OnlinePharmacySystem.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.OnlinePharmacySystem.entities.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
	
	@Query("from Account where username = :username and password = :password")
	public Account login(@Param("username") String username, @Param("password") String password);
	
	Optional<Account> findByUsername(String username);
}
