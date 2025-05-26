package com.example.OnlinePharmacySystem.services;

import com.example.OnlinePharmacySystem.DTO.BrandDTO;
import com.example.OnlinePharmacySystem.entities.Brand;

import java.util.List;

public interface BrandService {

    public List<BrandDTO> findAll();
}
