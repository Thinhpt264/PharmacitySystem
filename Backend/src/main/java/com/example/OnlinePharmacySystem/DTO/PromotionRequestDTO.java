package com.example.OnlinePharmacySystem.DTO;
import com.example.OnlinePharmacySystem.entities.enums.PromotionStatus;
import com.example.OnlinePharmacySystem.entities.enums.PromotionType;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromotionRequestDTO {
    private String promotionName;
    private PromotionType promotionType;
    private PromotionStatus status;

    private Double discountValue;
    private boolean isPercentageDiscount;

    private LocalDate startDate;
    private LocalDate endDate;

    private int quantity;
    private int currentQuantity;

    private Integer productId;

    private String couponCode;

}
