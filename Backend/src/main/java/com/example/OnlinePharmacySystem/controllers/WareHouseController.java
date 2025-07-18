package com.example.OnlinePharmacySystem.controllers;

import com.example.OnlinePharmacySystem.DTO.ImportBatchDTO;
import com.example.OnlinePharmacySystem.Ultis.ApiResponse;
import com.example.OnlinePharmacySystem.services.ImportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/warehouses")
@RequiredArgsConstructor
@Slf4j
public class WareHouseController {

    private final ImportService importBatchService;

    @PostMapping(value = "/create", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
    public ResponseEntity<ApiResponse<ImportBatchDTO>> createImportBatch(@RequestBody ImportBatchDTO importBatchDTO) {
        try {
            ImportBatchDTO result = importBatchService.createImportBatch(importBatchDTO);
            return ResponseEntity.ok(new ApiResponse<>(true, "Nhập kho thành công", result));
        } catch (Exception e) {
            log.error("❌ Lỗi khi nhập kho: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Lỗi khi nhập kho: " + e.getMessage(), null));
        }
    }
    @GetMapping()
    public ResponseEntity<ApiResponse<List<ImportBatchDTO>>> getAllImportBatches() {
        try {
            List<ImportBatchDTO> result = importBatchService.findAllImportBatch();
            return ResponseEntity.ok(new ApiResponse<>(true, "Lấy danh sách thành công", result));
        } catch (Exception e) {
            log.error("❌ Lỗi Lấy danh sách nhập kho: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Lỗi khi nhập kho: " + e.getMessage(), null));
        }
    }



}
