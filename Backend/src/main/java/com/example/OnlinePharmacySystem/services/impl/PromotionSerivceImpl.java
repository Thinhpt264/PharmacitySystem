package com.example.OnlinePharmacySystem.services.impl;

import com.example.OnlinePharmacySystem.DTO.PromotionRequestDTO;
import com.example.OnlinePharmacySystem.DTO.PromotionResponseDTO;
import com.example.OnlinePharmacySystem.entities.Product;
import com.example.OnlinePharmacySystem.entities.Promotion;
import com.example.OnlinePharmacySystem.entities.PromotionHistory;
import com.example.OnlinePharmacySystem.mappers.PromotionMapper;
import com.example.OnlinePharmacySystem.repositories.ProductRepository;
import com.example.OnlinePharmacySystem.repositories.PromotionHistoryRepository;
import com.example.OnlinePharmacySystem.repositories.PromotionRepository;
import com.example.OnlinePharmacySystem.services.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PromotionSerivceImpl  implements PromotionService {

    private final PromotionRepository promotionRepository;
    private final ProductRepository productRepository;
    private final PromotionHistoryRepository promotionHistoryRepository;
    @Override
    public PromotionResponseDTO createPromotion(PromotionRequestDTO dto) {
        Product product = productRepository.findById(dto.getProductId()).orElseThrow(()-> new RuntimeException("Product not found"));
        Promotion promotion = PromotionMapper.toEntity(dto, product);
      Promotion saved =   promotionRepository.save(promotion);
      return  PromotionMapper.toDTO(saved);

    }

    @Override
    public List<PromotionResponseDTO> getAllPromotions() {
        return promotionRepository.findAll().stream().map(PromotionMapper ::toDTO).toList();
    }

    @Override
    public PromotionResponseDTO getPromotionById(int id) {
        Promotion promotion = promotionRepository.findById(id).orElseThrow(()-> new RuntimeException("Product not found"));
        return  PromotionMapper.toDTO(promotion);
    }

    @Override
    public PromotionResponseDTO updatePromotion(int id, PromotionRequestDTO dto) {
        Promotion promotion = promotionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Promotion not found"));
        PromotionHistory history = new PromotionHistory();
        history.setPromotionId(promotion.getId());
        history.setOldPromotionName(promotion.getPromotionName());
        history.setOldPromotionType(promotion.getPromotionType());
        history.setOldStatus(promotion.getStatus());
        history.setOldDiscountValue(promotion.getDiscountValue());
        history.setOldIsPercentageDiscount(promotion.isPercentageDiscount());
        history.setOldStartDate(promotion.getStartDate());
        history.setOldEndDate(promotion.getEndDate());
        history.setOldQuantity(promotion.getQuantity());
        history.setOldCurrentQuantity(promotion.getCurrentQuantity());
        history.setOldCouponCode(promotion.getCouponCode());
        history.setUpdatedAt(LocalDateTime.now());

        promotionHistoryRepository.save(history);

        promotion.setPromotionName(dto.getPromotionName());
        promotion.setPromotionType(dto.getPromotionType());
        promotion.setStatus(dto.getStatus());
        promotion.setDiscountValue(dto.getDiscountValue());
        promotion.setPercentageDiscount(dto.isPercentageDiscount());
        promotion.setStartDate(dto.getStartDate());
        promotion.setEndDate(dto.getEndDate());
        promotion.setQuantity(dto.getQuantity());
        promotion.setCurrentQuantity(dto.getCurrentQuantity());
        promotion.setCouponCode(dto.getCouponCode());

        if (dto.getProductId() != null) {
            Product product = productRepository.findById(dto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            promotion.setProduct(product);
        }

        Promotion updated = promotionRepository.save(promotion);
        return PromotionMapper.toDTO(updated);

    }

    @Override
    public void deletePromotion(int id) {
        if (!promotionRepository.existsById(id)) {
            throw new RuntimeException("Promotion not found");
        }
        promotionRepository.deleteById(id);

    }
}
