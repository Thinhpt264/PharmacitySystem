package com.example.OnlinePharmacySystem.services;

import com.example.OnlinePharmacySystem.DTO.OrderDTO;

import java.util.List;

public interface OrderService {
    OrderDTO save(OrderDTO orderDTO);

    OrderDTO getOrderById(int id);

    void updateStatusOnly(OrderDTO orderDTO);

    List<OrderDTO> findAll();

    List<OrderDTO> findByStatusAndAccountId(int status, int userId);

    void updateOrder(OrderDTO orderDTO);

    void deleteOrder(int id);
}
