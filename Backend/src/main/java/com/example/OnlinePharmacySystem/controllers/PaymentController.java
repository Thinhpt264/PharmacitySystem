package com.example.OnlinePharmacySystem.controllers;

import com.example.OnlinePharmacySystem.DTO.ExportProductDTO;
import com.example.OnlinePharmacySystem.DTO.OrderDTO;
import com.example.OnlinePharmacySystem.DTO.OrderDetailDTO;
import com.example.OnlinePharmacySystem.DTO.PaymentDTO;
import com.example.OnlinePharmacySystem.configurations.VNPayConfig;
import com.example.OnlinePharmacySystem.entities.Order;
import com.example.OnlinePharmacySystem.entities.Payment;
import com.example.OnlinePharmacySystem.services.InventoryItemService;
import com.example.OnlinePharmacySystem.services.OrderService;
import com.example.OnlinePharmacySystem.services.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@Controller
@RequestMapping("api/payment")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final VNPayConfig vnPayConfig;
    private final PaymentService paymentService;
    private final InventoryItemService inventoryItemService;
    private final OrderService orderService;
    @PostMapping("/pay")
    @ResponseBody
    public String pay(
            @RequestParam("orderId") int  orderId ,
            HttpServletRequest request,
            HttpSession session
    ) {
        OrderDTO order = orderService.getOrderById(orderId);
        if (order == null) throw new RuntimeException("Order not found");

        long amount = Math.round(order.getTotalPrice() * 100); // VNPay yêu cầu nhân 100
        String vnp_TxnRef = String.valueOf(order.getId()); // <-- Sửa ở đây
        String vnp_IpAddr = vnPayConfig.getIpAddress(request);

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", vnPayConfig.vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don thuoc: " + order.getId());
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnPayConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        String vnp_CreateDate = formatter.format(cld.getTime());
        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());

        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        // Hash & build URL
        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        for (Iterator<String> itr = fieldNames.iterator(); itr.hasNext(); ) {
            String fieldName = itr.next();
            String fieldValue = vnp_Params.get(fieldName);
            if (fieldValue != null && !fieldValue.isEmpty()) {
                hashData.append(fieldName).append('=').append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII))
                        .append('=').append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                if (itr.hasNext()) {
                    hashData.append('&');
                    query.append('&');
                }
            }
        }

        String vnp_SecureHash = vnPayConfig.hmacSHA512(vnPayConfig.secretKey, hashData.toString());
        query.append("&vnp_SecureHash=").append(vnp_SecureHash);
        String paymentUrl = vnPayConfig.vnp_PayUrl + "?" + query;

        return vnPayConfig.vnp_PayUrl + "?" + query;
    }

    @GetMapping("/vnPay-callback")
    public RedirectView callback(
            @RequestParam("vnp_Amount") String amount,
            @RequestParam("vnp_ResponseCode") String responseCode,
            @RequestParam("vnp_TransactionNo") String txnNo,
            @RequestParam("vnp_PayDate") String payDate,
            @RequestParam("vnp_TxnRef") String vnpTxnRef,
            HttpSession session
    ) {


        Integer orderId;
        try {
            orderId = Integer.parseInt(vnpTxnRef);
        } catch (NumberFormatException e) {
            return new RedirectView("http://localhost:4200/payment-failed");
        }

        OrderDTO order = orderService.getOrderById(orderId);
        if (order == null) return new RedirectView("http://localhost:4200/payment-failed");

        PaymentDTO payment = new PaymentDTO();
        payment.setOrderId(order.getId());
        payment.setTotalPrice(Double.parseDouble(amount) / 100);
        payment.setMethod(1);
        payment.setStatus("00".equals(responseCode) ? 1 : 0);

        if ("00".equals(responseCode)) {
            try {
                // 1. Cập nhật trạng thái đơn hàng
                order.setStatus(0);
                orderService.updateStatusOnly(order);

                // 2. Thực hiện xuất kho theo từng sản phẩm
                for (OrderDetailDTO orderDetail : order.getOrderDetails()) {
                    ExportProductDTO exportProductDTO = new ExportProductDTO(
                            orderDetail.getProductId(),
                            orderDetail.getQuantity()
                    );
                    inventoryItemService.exportProduct(exportProductDTO); // FIFO logic
                }

            } catch (Exception e) {
                // ⚠️ Nếu xuất kho thất bại, nên rollback hoặc log cảnh báo
                log.error("❌ Xuất kho thất bại cho đơn hàng ID: {}", order.getId(), e);
                // Optional: cập nhật trạng thái đơn hàng lại về "lỗi xử lý kho"
                order.setStatus(99); // ví dụ 99 = lỗi kho
                orderService.updateStatusOnly(order);
                // Optional: gửi thông báo tới Admin
            }


        }

        paymentService.save(payment);

        // Điều hướng tới trang FE dựa trên kết quả thanh toán
        String redirectUrl = "http://localhost:4200/";
        redirectUrl += "00".equals(responseCode) ? "thank-you" : "payment-failed";

        return new RedirectView(redirectUrl);
    }
}
