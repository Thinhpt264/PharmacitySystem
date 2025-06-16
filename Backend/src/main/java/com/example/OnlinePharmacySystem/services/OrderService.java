package com.example.OnlinePharmacySystem.services;

import com.example.OnlinePharmacySystem.DTO.OrderDTO;

import java.util.List;

public interface OrderService {
    OrderDTO save(OrderDTO orderDTO);

    OrderDTO getOrderById(int id);

    void updateStatusOnly(OrderDTO orderDTO);

    List<OrderDTO> findAll();

    List<OrderDTO> findByAccountId(int accountId);

    void updateOrder(OrderDTO orderDTO);

    void deleteOrder(int id);
}
