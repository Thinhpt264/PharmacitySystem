package com.example.OnlinePharmacySystem.mappers;

import com.example.OnlinePharmacySystem.DTO.PromotionRequestDTO;
import com.example.OnlinePharmacySystem.DTO.PromotionResponseDTO;
import com.example.OnlinePharmacySystem.entities.Product;
import com.example.OnlinePharmacySystem.entities.Promotion;

public class PromotionMapper {
    public  static Promotion toEntity(PromotionRequestDTO dto, Product product) {
        return Promotion.builder()
                .promotionName(dto.getPromotionName())
                .promotionType(dto.getPromotionType())
                .status(dto.getStatus())
                .discountValue(dto.getDiscountValue())
                .isPercentageDiscount(dto.isPercentageDiscount())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .quantity(dto.getQuantity())
                .currentQuantity(dto.getCurrentQuantity())
                .couponCode(dto.getCouponCode())
                .product(product)
                .build();

    }
    public static PromotionResponseDTO toDTO(Promotion promotion) {
        return PromotionResponseDTO.builder()
                .id(promotion.getId())
                .promotionName(promotion.getPromotionName())
                .promotionType(promotion.getPromotionType())
                .status(promotion.getStatus())
                .discountValue(promotion.getDiscountValue())
                .isPercentageDiscount(promotion.isPercentageDiscount())
                .startDate(promotion.getStartDate())
                .endDate(promotion.getEndDate())
                .quantity(promotion.getQuantity())
                .currentQuantity(promotion.getCurrentQuantity())
                .couponCode(promotion.getCouponCode())
                .productName(promotion.getProduct() != null ? promotion.getProduct().getName() : null)
                .build();
    }
}
