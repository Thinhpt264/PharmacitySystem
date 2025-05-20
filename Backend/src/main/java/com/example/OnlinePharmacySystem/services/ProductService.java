package com.example.OnlinePharmacySystem.services;

import java.util.List;

import com.example.OnlinePharmacySystem.DTO.ProductDTO;

public interface ProductService {
	public List<ProductDTO> findAll();

	public List<ProductDTO> findByCategotyId(int id);

	public ProductDTO save (ProductDTO product);



}
