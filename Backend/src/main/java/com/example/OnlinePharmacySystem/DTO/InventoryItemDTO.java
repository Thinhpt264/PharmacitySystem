package com.example.OnlinePharmacySystem.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InventoryItemDTO {
    private Integer productId;
    private Integer quantity;
    private LocalDate expiryDate;
}
