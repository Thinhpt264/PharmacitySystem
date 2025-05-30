package com.example.OnlinePharmacySystem.services.impl;

import com.example.OnlinePharmacySystem.DTO.BrandDTO;
import com.example.OnlinePharmacySystem.repositories.BrandRepository;
import com.example.OnlinePharmacySystem.services.BrandService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    @Cacheable(value = "BRAND_CACHE", key = "'allBrands'")
    public List<BrandDTO> findAll() {
        System.out.println("🔍 Truy vấn DB thật sự!");
        return modelMapper.map(brandRepository.findAll(), new TypeToken<List<BrandDTO>>() {}.getType());
    }
}
