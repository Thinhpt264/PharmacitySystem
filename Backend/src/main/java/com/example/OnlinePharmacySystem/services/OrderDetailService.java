package com.example.OnlinePharmacySystem.services;

import com.example.OnlinePharmacySystem.DTO.OrderDTO;
import com.example.OnlinePharmacySystem.DTO.OrderDetailDTO;

import java.util.List;

public interface OrderDetailService {

    List<OrderDetailDTO> findByOrderId(int id);
}
