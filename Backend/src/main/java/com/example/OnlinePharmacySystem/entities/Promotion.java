package com.example.OnlinePharmacySystem.entities;

import com.example.OnlinePharmacySystem.entities.enums.PromotionStatus;
import com.example.OnlinePharmacySystem.entities.enums.PromotionType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name= "promotions")

public class Promotion {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 255)
    private String promotionName;

    @Enumerated(EnumType.STRING)
    private PromotionType promotionType;

    @Enumerated(EnumType.STRING)
    private PromotionStatus status;


    private Double  discountValue;

    private boolean isPercentageDiscount;

    @Column(nullable = false)
    private LocalDate startDate;
    @Column(nullable = false)
    private LocalDate endDate;
    private int quantity;

    private int currentQuantity;
    @ManyToOne
    @JoinColumn(name="product_id")
    private Product product;
    @Column(length = 50)
    private String couponCode;





}
