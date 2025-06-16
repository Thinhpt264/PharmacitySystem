package com.example.OnlinePharmacySystem.services.impl;

import com.example.OnlinePharmacySystem.DTO.OrderDTO;
import com.example.OnlinePharmacySystem.DTO.ProductDTO;
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
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDTO> findByStatusAndAccountId(int status, int userId) {
        List<Order> orders = orderRepository.findOrdersByAccountIdAndStatus(userId, status);
        return orders.stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void updateOrder(OrderDTO orderDTO) {
        Order existingOrder = orderRepository.findById(orderDTO.getId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Update basic order information
        existingOrder.setStatus(orderDTO.getStatus());
        existingOrder.setOrderDate(orderDTO.getOrderDate());

        // Update order details
        List<OrderDetail> updatedDetails = orderDTO.getOrderDetails().stream().map(detailDTO -> {
            OrderDetail detail = new OrderDetail();
            detail.setId(detailDTO.getId());
            detail.setProductId(detailDTO.getProductId());
            detail.setQuantity(detailDTO.getQuantity());
            detail.setUnitPrice(detailDTO.getUnitPrice());
            detail.setOrder(existingOrder);
            return detail;
        }).collect(Collectors.toList());

        // Save updated order and details
        orderDetailRepository.saveAll(updatedDetails);

        // Recalculate total amount
        double totalAmount = updatedDetails.stream()
                .mapToDouble(detail -> detail.getQuantity() * detail.getUnitPrice())
                .sum();

        log.info("Updated total amount: " + totalAmount);

        existingOrder.setOrderDetails(updatedDetails);
        orderRepository.save(existingOrder);
    }

    @Override
    public void deleteOrder(int id) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Delete associated order details first
        orderDetailRepository.deleteAll(existingOrder.getOrderDetails());

        // Delete the main order
        orderRepository.delete(existingOrder);
    }
}
