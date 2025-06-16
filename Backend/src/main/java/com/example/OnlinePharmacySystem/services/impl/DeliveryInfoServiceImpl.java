package com.example.OnlinePharmacySystem.services.impl;

import com.example.OnlinePharmacySystem.entities.DeliveryInfo;
import com.example.OnlinePharmacySystem.repositories.DeliveryInfoRepository;
import com.example.OnlinePharmacySystem.services.DeliveryInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DeliveryInfoServiceImpl  implements DeliveryInfoService {
    public final DeliveryInfoRepository deliveryInfoRepository;

    @Override
    public DeliveryInfo save(DeliveryInfo deliveryInfo) {
        return deliveryInfoRepository.save(deliveryInfo);
    }

    @Override
    public List<DeliveryInfo> findAllByAccountId(int accountId) {
        return deliveryInfoRepository.findByAccountId(accountId);
    }

    @Override
    public DeliveryInfo findById(int id) {
        return deliveryInfoRepository.findById(id).orElse(null);
    }
}
