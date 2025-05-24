package com.example.OnlinePharmacySystem.services;

import java.util.List;
import java.util.stream.Collectors;

import com.example.OnlinePharmacySystem.entities.Account;
import com.example.OnlinePharmacySystem.repositories.ViewStatRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.OnlinePharmacySystem.DTO.ProductDTO;
import com.example.OnlinePharmacySystem.repositories.ProductRepository;
import com.example.OnlinePharmacySystem.entities.Product;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
	private final ProductRepository productRepository;
	private final ModelMapper mapper;
	private final ViewStatRepository viewStatRepository;

	@Override
	public List<ProductDTO> findAll() {
		// TODO Auto-generated method stub
		 List<Product> products = productRepository.findAll();
		 return products.stream()
		            .map(product -> mapper.map(product, ProductDTO.class))
		            .collect(Collectors.toList());
	}

	@Override
	public List<ProductDTO> findByCategotyId(int id) {
		List<Product> products = productRepository.findByCategory_Id(id);
		return products.stream()
				.map(product -> mapper.map(product, ProductDTO.class))
				.collect(Collectors.toList());
	}

	public ProductDTO save(ProductDTO product) {
		Product product1 = mapper.map(product, Product.class);
		Product saved = productRepository.save(product1);
		return mapper.map(saved, ProductDTO.class);
	}

	@Override
	public ProductDTO findById(int id) {
        return mapper.map(productRepository.findById(id), ProductDTO.class);
	}

	@Override
	public List<ProductDTO> findTopProductByView() {
		List<Product> products = viewStatRepository.findTopProductByView();
		return products.stream()
				.map(product -> mapper.map(product, ProductDTO.class))
				.collect(Collectors.toList());
	}

}
