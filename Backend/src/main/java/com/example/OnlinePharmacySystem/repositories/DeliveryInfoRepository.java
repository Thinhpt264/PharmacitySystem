package com.example.OnlinePharmacySystem.repositories;

import com.example.OnlinePharmacySystem.entities.DeliveryInfo;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryInfoRepository extends JpaRepository<DeliveryInfo, Integer> {

    List<DeliveryInfo> findByAccountId(int accountId);
}
