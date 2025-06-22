package com.example.OnlinePharmacySystem.entities;

import com.example.OnlinePharmacySystem.entities.enums.PromotionStatus;
import com.example.OnlinePharmacySystem.entities.enums.PromotionType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PromotionHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int promotionId;

    private String oldPromotionName;

    @Enumerated(EnumType.STRING)
    private PromotionType oldPromotionType;

    @Enumerated(EnumType.STRING)
    private PromotionStatus oldStatus;

    private Double oldDiscountValue;

    private boolean oldIsPercentageDiscount;

    private LocalDate oldStartDate;
    private LocalDate oldEndDate;

    private int oldQuantity;
    private int oldCurrentQuantity;

    private String oldCouponCode;

    private LocalDateTime updatedAt;

}
