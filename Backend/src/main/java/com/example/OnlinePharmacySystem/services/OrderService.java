package com.example.OnlinePharmacySystem.services;

import com.example.OnlinePharmacySystem.DTO.OrderDTO;

public interface OrderService {
    OrderDTO save(OrderDTO orderDTO);

    OrderDTO getOrderById(int id);
    void updateStatusOnly(OrderDTO orderDTO);

}
