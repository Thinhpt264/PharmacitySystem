package com.example.OnlinePharmacySystem.services.impl;

import com.example.OnlinePharmacySystem.DTO.ExportProductDTO;
import com.example.OnlinePharmacySystem.entities.InventoryItem;
import com.example.OnlinePharmacySystem.repositories.InventoryItemRepository;
import com.example.OnlinePharmacySystem.services.InventoryItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class InventoryItemServiceImpl implements InventoryItemService {
    private final InventoryItemRepository inventoryItemRepository;

    @Override
    public boolean exportProduct(ExportProductDTO e) {
        int productId = e.getProductId();
        int quantityToExport = e.getQuantityToExport();

        // Lấy danh sách các lô hàng còn tồn kho theo thứ tự nhập (FIFO)
        List<InventoryItem> items = inventoryItemRepository.findByProductIdAndQuantityRemainingGreaterThanOrderByImportbatch_ImportDateAsc(productId, 0);
        int remainingToExport = quantityToExport;
        for (InventoryItem item : items) {
            int available = item.getQuantityRemaining();

            if (available >= remainingToExport) {
                item.setQuantityRemaining(available - remainingToExport);
                inventoryItemRepository.save(item);
                return true; // đã xuất đủ
            } else {
                // dùng hết lô này, chuyển sang lô sau
                item.setQuantityRemaining(0);
                inventoryItemRepository.save(item);
                remainingToExport -= available;
            }
        }

        if (remainingToExport > 0) {
            throw new RuntimeException("Không đủ hàng trong kho để xuất.");
        }

        return true;

    }

    @Override
    public int getTotalQuantityRemaining(int productId) {
        return inventoryItemRepository.findByProductIdOrderByExpiryDateAsc(productId)
                .stream()
                .mapToInt(InventoryItem::getQuantityRemaining)
                .sum();
    }

    @Override
    public int getExpiredQuantityByProductId(int productId) {
        return inventoryItemRepository.sumExpiredQuantityByProduct(productId, LocalDate.now());
    }

    @Override
    public int getExpiringQuantityByProduct(int productId) {
        LocalDate today     = LocalDate.now();
        LocalDate threshold = today.plusDays(14);
        return inventoryItemRepository.sumExpiringQuantityByProduct(productId, today, threshold);
    }


}
