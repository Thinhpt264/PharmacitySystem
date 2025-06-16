package com.example.OnlinePharmacySystem.controllers;

import com.example.OnlinePharmacySystem.DTO.OrderDTO;
import com.example.OnlinePharmacySystem.Ultis.ApiResponse;
import com.example.OnlinePharmacySystem.services.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/orders")
@RequiredArgsConstructor
@Slf4j
public class OrderController {
    private final OrderService orderService;
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<OrderDTO>> createOrder(@RequestBody @Valid OrderDTO orderDTO) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();

            OrderDTO savedOrder = orderService.save(orderDTO);
            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Tạo đơn hàng thành công", savedOrder)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Lỗi khi tạo đơn hàng: " + e.getMessage()));
        }
    }
    @GetMapping("/accept/{orderId}")
    public ResponseEntity<ApiResponse<OrderDTO>> acceptOrder(@PathVariable("orderId") int orderId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            OrderDTO orderDTO = orderService.getOrderById(orderId);
            if (orderDTO.getStatus() == 0 ) {
                orderDTO.setStatus(1);
            }

            OrderDTO savedOrder = orderService.save(orderDTO);
            return ResponseEntity.ok(
                    new ApiResponse<>(true, " Đơn hàng được duyệt thành công", savedOrder)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Lỗi khi duyệt đơn hàng: " + e.getMessage()));
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderDTO>> getOrderById(@PathVariable int id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            OrderDTO order = orderService.getOrderById(id);
            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Lấy đơn hàng thành công", order)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, "Không tìm thấy đơn hàng với ID: " + id));
        }
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<List<OrderDTO>>> findAll() {
        try {
            List<OrderDTO> orders = orderService.findAll();
            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Lấy đơn hàng thành công", orders)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse<>(false, "Không tìm thấy đơn hàng : "));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<OrderDTO>>> searchByAccountAndStatus(
            @RequestParam("accountId") int accountId,
            @RequestParam("status") int status) {
        try {
            List<OrderDTO> orders = orderService.findByStatusAndAccountId(status, accountId);
            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Lấy danh sách đơn hàng thành công", orders)
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Lỗi khi tìm đơn hàng: " + e.getMessage()));
        }
    }

    
}
