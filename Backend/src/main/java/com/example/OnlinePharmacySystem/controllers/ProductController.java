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

import com.example.OnlinePharmacySystem.DTO.ProductDTO;
import com.example.OnlinePharmacySystem.services.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	 @GetMapping(produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	 public ResponseEntity<List<ProductDTO>> getAll() {
	        return ResponseEntity.ok(productService.findAll());
	}

	@GetMapping(value = "/by-category/{categoryId}",produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> findByCategotyId(@PathVariable int categoryId) {
		 try {
			 List<ProductDTO> products = productService.findByCategotyId(categoryId);
			 if(products.isEmpty() ) {
				 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Category not found");
			 }
			 Map<String, Object> response = new HashMap<>();
			 response.put("message", "Thanh Cong");
			 response.put("products", products);

			 return new ResponseEntity<>(response, HttpStatus.OK);
		 } catch (Exception e) {
			 e.printStackTrace();
			 return  new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		 }

	}
}
