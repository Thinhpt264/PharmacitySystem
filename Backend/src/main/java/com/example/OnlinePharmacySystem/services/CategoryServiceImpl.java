package com.example.OnlinePharmacySystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.OnlinePharmacySystem.repositories.CategoryRepository;
import com.example.OnlinePharmacySystem.entities.Category;

@Service
public class CategoryServiceImpl implements CategoryService {
	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public List<Category> findAll() {
		// TODO Auto-generated method stub
		return categoryRepository.findAll();
	}

	@Override
	public List<Category> findByIdCategoriesParent(int id) {
		// TODO Auto-generated method stub
		return categoryRepository.findByCategoryParentId(id);
	}

	@Override
	public List<Category> findParentCategories() {
		// TODO Auto-generated method stub
		return categoryRepository.findByCategoryParentIdIsNull();
	}

}
