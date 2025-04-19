package com.example.OnlinePharmacySystem.controllers;

import com.example.OnlinePharmacySystem.entities.Category;
import com.example.OnlinePharmacySystem.entities.Image;
import com.example.OnlinePharmacySystem.services.CategoryService;
import com.example.OnlinePharmacySystem.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/image")
public class ImageController {
	@Autowired
	private CategoryService categoryService;
	@Autowired
	private ImageService imageService;
	
	@GetMapping(value = "findImageByObject" , produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> findAllParentCategories( @RequestParam("objectId") Integer objectId,
														   @RequestParam("tableName") String tableName) {
		try {
			Image img = imageService.getImageByObjectId(objectId, tableName);
			
			if (img == null) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Khong có image");
	        }

	        Map<String, Object> response = new HashMap<>();
	        response.put("message", "Thanh Cong");
	        response.put("image", img);

	        return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return  new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		
	}
	

	
}
