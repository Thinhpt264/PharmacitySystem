package com.example.OnlinePharmacySystem.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {
    private int id;
    private int method;
    private int status;
    private double totalPrice;
//    private int deliveryInfoId;  // dùng ID để tránh lồng cả entity
    private int orderId;
}
