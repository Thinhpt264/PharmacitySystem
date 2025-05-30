package com.example.OnlinePharmacySystem.services.impl;

import com.example.OnlinePharmacySystem.DTO.PaymentDTO;
import com.example.OnlinePharmacySystem.entities.Payment;
import com.example.OnlinePharmacySystem.repositories.PaymentRepository;
import com.example.OnlinePharmacySystem.services.PaymentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public boolean save(PaymentDTO paymentDTO) {
        Payment payment = paymentRepository.save(modelMapper.map(paymentDTO, Payment.class));
        return true;
    }
}
