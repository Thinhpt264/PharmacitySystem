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
    private int id; 
    private Integer productId;
    private Integer quantity;
    private LocalDate expiryDate;
    private int quantityRemaining;
    private int status;
}
