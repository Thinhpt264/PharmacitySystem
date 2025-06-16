package com.example.OnlinePharmacySystem.services;

import com.example.OnlinePharmacySystem.entities.DeliveryInfo;

import java.util.List;
import java.util.Optional;

public interface DeliveryInfoService {
    public DeliveryInfo save(DeliveryInfo deliveryInfo);

    public List<DeliveryInfo> findAllByAccountId(int accountId);

    DeliveryInfo findById(int id);
}
