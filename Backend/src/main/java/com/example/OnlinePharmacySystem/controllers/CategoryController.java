package com.example.OnlinePharmacySystem.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.OnlinePharmacySystem.entities.Category;
import com.example.OnlinePharmacySystem.services.CategoryService;

@RestController
@RequestMapping("api/v1/categories")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping(value = "findParentCategories" , produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> findAllParentCategories() {
		try {
			List<Category> categories = categoryService.findParentCategories();
			
			if (categories == null) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Khong có categories");
	        }

	        Map<String, Object> response = new HashMap<>();
	        response.put("message", "Thanh Cong");
	        response.put("categories", categories);

	        return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return  new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	
		@GetMapping(value = "/findByIdParentCategories/{id}" , produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
		public ResponseEntity<Object> findByIdParentCategories(@PathVariable int id) {
			try {
				List<Category> categories = categoryService.findByIdCategoriesParent(id);
				
				if (categories == null) {
		            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Khong có categories");
		        }
	
		        Map<String, Object> response = new HashMap<>();
		        response.put("message", "Thanh Cong");
		        response.put("categories", categories);
	
		        return new ResponseEntity<>(response, HttpStatus.OK);
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
				return  new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
			}
			
		}

	@GetMapping(value = "/findByCategoryId/{id}" , produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> findByCategoryId(@PathVariable int id) {
		try {
			Category category = categoryService.findById(id);

			if (category == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Khong có category");
			}

			Map<String, Object> response = new HashMap<>();
			response.put("message", "Thanh Cong");
			response.put("category", category);

			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return  new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
}
