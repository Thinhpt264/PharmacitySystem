package com.example.OnlinePharmacySystem.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDetailDTO {
    private int productId;
    private int quantity;
    private double unitPrice;
    private String note;
}
