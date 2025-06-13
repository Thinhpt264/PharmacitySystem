package com.example.OnlinePharmacySystem.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.OnlinePharmacySystem.repositories.ViewStatRepository;
import com.example.OnlinePharmacySystem.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
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
	@Cacheable(value = "PRODUCT_CACHE", key = "'allProducts'")
	public List<ProductDTO> findAll() {
		// TODO Auto-generated method stub
		 System.out.println("🔍 Truy vấn DB thật sự!");
		 List<Product> products = productRepository.findAll();
		 return products.stream()
		            .map(product -> mapper.map(product, ProductDTO.class))
		            .collect(Collectors.toList());
	}

	@Override
	@Cacheable(value = "PRODUCT_CACHE", key = "'category_'+#id")
	public List<ProductDTO> findByCategotyId(int id) {
		List<Product> products = productRepository.findByCategory_Id(id);
		return products.stream()
				.map(product -> mapper.map(product, ProductDTO.class))
				.collect(Collectors.toList());
	}
	@CachePut(value = "PRODUCT_CACHE", key = "#result.id")
		public ProductDTO save(ProductDTO product) {
		Product product1 = mapper.map(product, Product.class);
		Product saved = productRepository.save(product1);
		return mapper.map(saved, ProductDTO.class);
	}

	@Override
	@Cacheable(value = "PRODUCT_CACHE", key = "#id")
	public ProductDTO findById(int id) {
        return mapper.map(productRepository.findById(id), ProductDTO.class);
	}

	@Override
	@Cacheable(value = "PRODUCT_CACHE", key = "'topViewed'")
	public List<ProductDTO> findTopProductByView() {
		List<Product> products = viewStatRepository.findTopProductByView();
		return products.stream()
				.map(product -> mapper.map(product, ProductDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	@CachePut(value = "PRODUCT_CACHE", key = "#result.id")
	public ProductDTO update(ProductDTO productDTO) {
		Optional<Product> optionalProduct = productRepository.findById(productDTO.getId());
		if (optionalProduct.isEmpty()) {
			throw new RuntimeException("Không tìm thấy sản phẩm để cập nhật");
		}

		Product existingProduct = optionalProduct.get();

		// Cập nhật thông tin
		existingProduct.setName(productDTO.getName());
		existingProduct.setDescription(productDTO.getDescription());
		existingProduct.setPrice(productDTO.getPrice());
		if (productDTO.getImage() != null && !productDTO.getImage().isBlank()) {
			existingProduct.setImage(productDTO.getImage());
		}

		Product updatedProduct = productRepository.save(existingProduct);
		return mapper.map(updatedProduct, ProductDTO.class);
	}

	@Override
	@CacheEvict(value = "PRODUCT_CACHE", key = "#id")
	public boolean delete(int id) {
		Optional<Product> productOpt = productRepository.findById(id);
		if (productOpt.isEmpty()) {
			return false;
		}
		productRepository.deleteById(id);
		return true;
	}

}
