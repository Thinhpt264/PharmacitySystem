package com.example.OnlinePharmacySystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.OnlinePharmacySystem.DTO.ProductDTO;
import com.example.OnlinePharmacySystem.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	 @GetMapping(produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	    public ResponseEntity<List<ProductDTO>> getAll() {
	        return ResponseEntity.ok(productService.findAll());
	}
}
