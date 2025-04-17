package com.example.OnlinePharmacySystem.repositories;

import com.example.OnlinePharmacySystem.entities.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
	

}
