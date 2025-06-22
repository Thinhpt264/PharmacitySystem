package com.example.OnlinePharmacySystem.services;


import com.example.OnlinePharmacySystem.DTO.PromotionRequestDTO;
import com.example.OnlinePharmacySystem.DTO.PromotionResponseDTO;


import java.util.List;


public interface PromotionService {


   PromotionResponseDTO createPromotion(PromotionRequestDTO dto);
   List<PromotionResponseDTO> getAllPromotions();
   PromotionResponseDTO getPromotionById(int id);
   PromotionResponseDTO updatePromotion(int id, PromotionRequestDTO dto);
   void deletePromotion(int id);




}
