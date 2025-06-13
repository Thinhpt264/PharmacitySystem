package com.example.OnlinePharmacySystem.services;

import java.util.List;

import com.example.OnlinePharmacySystem.DTO.ProductDTO;

public interface ProductService {
	 List<ProductDTO> findAll();

	 List<ProductDTO> findByCategotyId(int id);

	 ProductDTO save (ProductDTO product);

	ProductDTO findById(int id);

	List<ProductDTO> findTopProductByView();

	ProductDTO update(ProductDTO product);

	boolean delete(int id);
}
