package com.example.OnlinePharmacySystem.service;

import java.util.List;

import com.example.OnlinePharmacySystem.DTO.ProductDTO;
import com.example.OnlinePharmacySystem.entities.Product;

public interface ProductService {
	public List<ProductDTO> findAll();
}
