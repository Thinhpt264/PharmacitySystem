package com.example.OnlinePharmacySystem.repositories;


import com.example.OnlinePharmacySystem.entities.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, Integer> {
    List<InventoryItem> findByProductIdAndQuantityRemainingGreaterThanOrderByImportbatch_ImportDateAsc(int productId, int quantity);

    List<InventoryItem> findByProductIdOrderByExpiryDateAsc(int productId);

    @Query("""
        SELECT COALESCE(SUM(i.quantityRemaining), 0)
        FROM InventoryItem i
        WHERE i.productId = :productId
          AND i.expiryDate < :today
    """)
    int sumExpiredQuantityByProduct(
            @Param("productId") int productId,
            @Param("today") LocalDate today
    );
    /**
     * Tính tổng quantityRemaining của các batch sẽ hết hạn trong vòng 14 ngày tới
     * (expiryDate từ today đến today + 14 ngày) cho 1 productId.
     */
    @Query("""
        SELECT COALESCE(SUM(i.quantityRemaining), 0)
        FROM InventoryItem i
        WHERE i.productId    = :productId
          AND i.expiryDate  >= :today
          AND i.expiryDate  <= :threshold
    """)
    int sumExpiringQuantityByProduct(
            @Param("productId") int productId,
            @Param("today") LocalDate today,
            @Param("threshold") LocalDate threshold
    );

}
