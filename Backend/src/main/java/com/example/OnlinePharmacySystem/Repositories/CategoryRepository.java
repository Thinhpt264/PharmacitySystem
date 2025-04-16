package com.example.OnlinePharmacySystem.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.OnlinePharmacySystem.entities.Category;
@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
	List<Category> findByCategoryParentId(int id);
	
	List<Category> findByCategoryParentIdIsNull();	
}
