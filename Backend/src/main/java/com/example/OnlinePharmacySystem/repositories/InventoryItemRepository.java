package com.example.OnlinePharmacySystem.repositories;


import com.example.OnlinePharmacySystem.entities.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, Integer> {
    List<InventoryItem> findByProductIdAndQuantityRemainingGreaterThanOrderByImportbatch_ImportDateAsc(int productId, int quantity);

}
