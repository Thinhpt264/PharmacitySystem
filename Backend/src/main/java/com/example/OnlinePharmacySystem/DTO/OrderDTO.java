package com.example.OnlinePharmacySystem.DTO;

import com.example.OnlinePharmacySystem.entities.DeliveryInfo;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class OrderDTO {
    private int id;
    private int accountId;
    private String note;
    private Date orderDate;
    private int status;
    private double totalPrice;
    private List<OrderDetailDTO> orderDetails;

}
