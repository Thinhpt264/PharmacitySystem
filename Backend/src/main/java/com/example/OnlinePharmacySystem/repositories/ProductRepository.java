package com.example.OnlinePharmacySystem.repositories;

import com.example.OnlinePharmacySystem.entities.Product;

import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
	List<Product> findByCategory_Id(int categoryId);

}
