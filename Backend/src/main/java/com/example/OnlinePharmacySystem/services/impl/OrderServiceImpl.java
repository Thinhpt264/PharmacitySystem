package com.example.OnlinePharmacySystem.services.impl;

import com.example.OnlinePharmacySystem.DTO.OrderDTO;
import com.example.OnlinePharmacySystem.entities.Order;
import com.example.OnlinePharmacySystem.entities.OrderDetail;
import com.example.OnlinePharmacySystem.repositories.OrderDetailRepository;
import com.example.OnlinePharmacySystem.repositories.OrderRepository;
import com.example.OnlinePharmacySystem.services.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final ModelMapper modelMapper;
    
    @Override
    public OrderDTO save(OrderDTO orderDTO) {
        Order order = modelMapper.map(orderDTO, Order.class);

        // Lưu order trước để có ID
        order = orderRepository.save(order);
        Order finalOrder = order;
        List<OrderDetail> details  = orderDTO.getOrderDetails().stream().map(detailDTO ->  {
            OrderDetail detail = new OrderDetail();
            detail.setProductId(detailDTO.getProductId());
            detail.setQuantity(detailDTO.getQuantity());
            detail.setUnitPrice(detailDTO.getUnitPrice());

            detail.setOrder(finalOrder);
            return detail;
        }).collect(Collectors.toList());
        orderDetailRepository.saveAll(details);
        order.setOrderDetails(details);
        return modelMapper.map(order, OrderDTO.class);
    }

    @Override
    public OrderDTO getOrderById(int id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        return modelMapper.map(order, OrderDTO.class);
    }

    @Override
    public void updateStatusOnly(OrderDTO orderDTO) {
        Order order = orderRepository.findById(orderDTO.getId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(orderDTO.getStatus());
        orderRepository.save(order);
    }

    @Override
    public List<OrderDTO> findAll() {
        return modelMapper.map(orderRepository.findAll(), new TypeToken<List<OrderDTO>>() {}.getType());
    }
}
