package com.example.OnlinePharmacySystem.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.OnlinePharmacySystem.DTO.ProductDTO;
import com.example.OnlinePharmacySystem.Repositories.ProductRepository;
import com.example.OnlinePharmacySystem.entities.Product;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private ModelMapper mapper;

	@Override
	public List<ProductDTO> findAll() {
		// TODO Auto-generated method stub
		 List<Product> products = productRepository.findAll();
		 return products.stream()
		            .map(product -> mapper.map(product, ProductDTO.class))
		            .collect(Collectors.toList());
	}

}
