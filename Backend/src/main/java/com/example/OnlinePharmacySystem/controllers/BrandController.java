package com.example.OnlinePharmacySystem.controllers;

import com.example.OnlinePharmacySystem.DTO.BrandDTO;
import com.example.OnlinePharmacySystem.entities.Account;
import com.example.OnlinePharmacySystem.entities.Brand;
import com.example.OnlinePharmacySystem.services.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/brands")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping(value = "findAll", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<BrandDTO>> findAll() {
        try {
            return new ResponseEntity<>(brandService.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
