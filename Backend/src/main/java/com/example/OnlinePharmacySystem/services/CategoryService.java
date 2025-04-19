package com.example.OnlinePharmacySystem.services;

import java.util.List;

import com.example.OnlinePharmacySystem.entities.Category;

public interface CategoryService {
	public List<Category> findAll();
	
	public List<Category> findByIdCategoriesParent(int id);	
	
	public List<Category> findParentCategories();

}
