package com.example.OnlinePharmacySystem.controllers;

import com.example.OnlinePharmacySystem.DTO.OrderDTO;
import com.example.OnlinePharmacySystem.DTO.OrderDetailDTO;
import com.example.OnlinePharmacySystem.Ultis.ApiResponse;
import com.example.OnlinePharmacySystem.services.OrderDetailService;
import com.example.OnlinePharmacySystem.services.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/orderDetails")
@RequiredArgsConstructor
@Slf4j
public class OrderDetailsController {
    private final OrderDetailService orderDetailService;

    @GetMapping("findByOrderId/{id}")
    public ResponseEntity<ApiResponse<List<OrderDetailDTO>>> findByOrderId(@PathVariable("id") int id) {
        try {
            List<OrderDetailDTO> orderDetails = orderDetailService.findByOrderId(id);
            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Lấy chi tiết đơn hàng thành công", orderDetails)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, "Không tìm thấy chi tiết đơn hàng với ID: " + id));
        }
    }


}
