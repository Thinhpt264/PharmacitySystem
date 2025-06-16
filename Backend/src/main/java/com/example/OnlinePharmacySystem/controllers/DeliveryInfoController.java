package com.example.OnlinePharmacySystem.controllers;

import com.example.OnlinePharmacySystem.Ultis.ApiResponse;
import com.example.OnlinePharmacySystem.entities.DeliveryInfo;
import com.example.OnlinePharmacySystem.services.DeliveryInfoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/deliveryInfo")
public class DeliveryInfoController {
    @Autowired
    private DeliveryInfoService deliveryInfoService;
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<DeliveryInfo>> createDelivery(@RequestBody @Valid DeliveryInfo deliveryInfo) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();

            DeliveryInfo savedDe = deliveryInfoService.save(deliveryInfo);
            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Tạo địa chỉ  thành công", savedDe)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Lỗi khi tạo địa chỉ: " + e.getMessage()));
        }
    }

    @GetMapping("/findByAccoutId")
    public ResponseEntity<ApiResponse<List<DeliveryInfo>>> searchByAccountAndStatus(
            @RequestParam("accountId") int accountId) {
        try {
            List<DeliveryInfo> deliveryInfos = deliveryInfoService.findAllByAccountId(accountId);
            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Lấy danh sách địa chỉ thành công", deliveryInfos)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Lỗi khi tìm địa chỉ: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DeliveryInfo>> findById(@PathVariable int id) {
        try {
            DeliveryInfo deliveryInfos = deliveryInfoService.findById(id);
            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Lấy  địa chỉ thành công", deliveryInfos)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Lỗi khi tìm địa chỉ: " + e.getMessage()));
        }
    }
}
