package com.example.OnlinePharmacySystem.controllers;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.OnlinePharmacySystem.Ultis.ApiResponse;
import com.example.OnlinePharmacySystem.entities.Image;
import com.example.OnlinePharmacySystem.services.ImageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import com.example.OnlinePharmacySystem.DTO.ProductDTO;
import com.example.OnlinePharmacySystem.services.ProductService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/products")
@Slf4j
public class ProductController {
	@Autowired
	private ProductService productService;
	@Autowired
	private ImageService imageService;

	@Autowired
	private ModelMapper modelMapper ;
	
	 @GetMapping(produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	 public ResponseEntity<List<ProductDTO>> getAll() {
	        return ResponseEntity.ok(productService.findAll());
	}

	@GetMapping(value = "/by-category/{categoryId}",produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> findByCategoryId(@PathVariable int categoryId) {
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
			 log.error(e.getMessage());
			 return  new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		 }

	}
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse<ProductDTO>> save(
			@RequestParam("product") String productJson,
			@RequestParam("file") MultipartFile file) {

		try {
			ObjectMapper objectMapper = new ObjectMapper();
			ProductDTO product = objectMapper.readValue(productJson, ProductDTO.class);

			String uploadDir = "uploads/images/product/";
			Files.createDirectories(Paths.get(uploadDir));

			String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
			Path imagePath = Paths.get(uploadDir, fileName);
			Files.copy(file.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
			if (Files.exists(imagePath)) {
				System.out.println("✅ Ảnh đã được lưu thành công tại: " + imagePath.toAbsolutePath());
			} else {
				System.err.println("❌ Ảnh KHÔNG được lưu!");
			}

			// 3. Gán tên ảnh và lưu
			product.setImage(fileName);
			ProductDTO savedProduct = productService.save(product);
			Image image = new Image("Product", savedProduct.getId(), "images/product/", fileName);
			imageService.saveImage(image);


			return ResponseEntity.ok(new ApiResponse<>(true, "Lưu sản phẩm thành công", product));

		} catch (Exception e) {
			log.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse<>(false, "Lỗi khi lưu sản phẩm", null));
		}
	}

	@GetMapping(value = "/{id}" ,produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse<ProductDTO>> getById(@PathVariable int id) {
		try {
			ProductDTO product = productService.findById(id);
			if (product != null) {
				return ResponseEntity.ok(new ApiResponse<>(true, "Product found", product));
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new ApiResponse<>(false, "Product not found"));
			}

		}catch (Exception e){
			log.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse<>(false, "An error occurred while retrieving the product"));
		}
	}
	@GetMapping(value = "getListTop", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse<List<ProductDTO>>> findTopProductByView() {
		try {
			List<ProductDTO> products = productService.findTopProductByView();
			if(products.isEmpty() ) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>(false, "Product not found"));
			}
			return ResponseEntity.ok(new ApiResponse<>(true, "Top products found", products));

		}catch (Exception e){
			log.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse<>(false, "An error occurred while retrieving the products"));
		}
	}

	@PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse<ProductDTO>> update(
			@PathVariable int id,
			@RequestParam("product") String productJson,
			@RequestParam(value = "file", required = false) MultipartFile file) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			ProductDTO product = objectMapper.readValue(productJson, ProductDTO.class);
			product.setId(id);
			if (file != null && !file.isEmpty()) {
				String uploadDir = "uploads/images/product/";
				Files.createDirectories(Paths.get(uploadDir));

				String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
				Path imagePath = Paths.get(uploadDir, fileName);
				Files.copy(file.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);

				product.setImage(fileName);
				imageService.saveImage(new Image("Product", id, "images/product/", fileName));
			}
			ProductDTO updatedProduct = productService.update(product);
			return ResponseEntity.ok(new ApiResponse<>(true, "Cập nhật thành công", updatedProduct));
		}catch (Exception e){
			log.error("❌ Lỗi cập nhật: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse<>(false, "Lỗi khi cập nhật sản phẩm", null));
		}
	}

	@DeleteMapping(value = "/{id}", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse<Void>> delete(@PathVariable int id) {
		try {
			boolean deleted = productService.delete(id);
			if (deleted) {
				return ResponseEntity.ok(new ApiResponse<>(true, "Xóa sản phẩm thành công"));
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body(new ApiResponse<>(false, "Không tìm thấy sản phẩm để xóa"));
			}
		} catch (Exception e) {
			log.error("❌ Lỗi xóa: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse<>(false, "Lỗi khi xóa sản phẩm"));
		}
	}
}
