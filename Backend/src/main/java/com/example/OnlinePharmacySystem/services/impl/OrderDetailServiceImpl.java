package com.example.OnlinePharmacySystem.services.impl;

import com.example.OnlinePharmacySystem.DTO.OrderDTO;
import com.example.OnlinePharmacySystem.DTO.OrderDetailDTO;
import com.example.OnlinePharmacySystem.repositories.OrderDetailRepository;
import com.example.OnlinePharmacySystem.services.OrderDetailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrderDetailServiceImpl implements OrderDetailService {
    @Autowired
    private OrderDetailRepository orderDetailRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<OrderDetailDTO> findByOrderId(int id) {
        return orderDetailRepository.findByOrderId(id)
                .stream()
                .map(orderDetail -> modelMapper.map(orderDetail, OrderDetailDTO.class))
                .toList();
    }

}
