package com.example.OnlinePharmacySystem.repositories;

import com.example.OnlinePharmacySystem.entities.PromotionHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PromotionHistoryRepository  extends JpaRepository<PromotionHistory, Integer> {
    List<PromotionHistory> findByPromotionId(int promotionId);


}
