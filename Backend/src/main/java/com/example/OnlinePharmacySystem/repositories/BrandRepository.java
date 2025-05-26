package com.example.OnlinePharmacySystem.repositories;

import com.example.OnlinePharmacySystem.entities.Brand;
import com.example.OnlinePharmacySystem.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {
	List<Brand> findBrandById(int brandId);


}
