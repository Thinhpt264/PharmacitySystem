package com.example.OnlinePharmacySystem.services;

import com.example.OnlinePharmacySystem.DTO.ExportProductDTO;

public interface InventoryItemService {
     boolean exportProduct(ExportProductDTO e);
     int getTotalQuantityRemaining(int productId);
     int getExpiredQuantityByProductId(int productId);
     int getExpiringQuantityByProduct(int productId);
}
