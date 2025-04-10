package com.example.OnlinePharmacySystem.Repositories;

import com.example.OnlinePharmacySystem.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Account, Integer> {
	

}
