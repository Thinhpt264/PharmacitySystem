package com.example.OnlinePharmacySystem.services.impl;

import com.example.OnlinePharmacySystem.DTO.ImportBatchDTO;
import com.example.OnlinePharmacySystem.DTO.InventoryItemDTO;
import com.example.OnlinePharmacySystem.entities.Importbatch;
import com.example.OnlinePharmacySystem.entities.InventoryItem;
import com.example.OnlinePharmacySystem.entities.Product;
import com.example.OnlinePharmacySystem.repositories.ImportBatchRepository;
import com.example.OnlinePharmacySystem.repositories.InventoryItemRepository;
import com.example.OnlinePharmacySystem.repositories.ProductRepository;
import com.example.OnlinePharmacySystem.services.ImportService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ImportServiceImpl implements ImportService {

    private final ImportBatchRepository importBatchRepository;
    private final InventoryItemRepository inventoryItemRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Override
    public ImportBatchDTO createImportBatch(ImportBatchDTO importBatchDTO) {
        Importbatch importbatch = modelMapper.map(importBatchDTO, Importbatch.class);
        importbatch.setImportDate(importBatchDTO.getImportDate() != null ? importBatchDTO.getImportDate() : LocalDate.now());
        List<InventoryItem> inventoryItems = new ArrayList<>();
        for(InventoryItemDTO inventoryItem : importBatchDTO.getItems()) {
            Product product = productRepository.findById(inventoryItem.getProductId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm ID: " + inventoryItem.getProductId()));

            InventoryItem item = new InventoryItem();
            item.setProductId(inventoryItem.getProductId());
            item.setExpiryDate(inventoryItem.getExpiryDate());
            item.setQuantity(inventoryItem.getQuantity());
            item.setQuantityRemaining(inventoryItem.getQuantity());
            item.setStatus(1); // nếu cần
            item.setImportBatch(importbatch); // nếu có logic này
            inventoryItems.add(item);

        }
        importbatch.setInventoryitems(inventoryItems);
        Importbatch savedBatch = importBatchRepository.save(importbatch);
        // Trả về DTO đã lưu
        ImportBatchDTO savedDTO = modelMapper.map(savedBatch, ImportBatchDTO.class);
        List<InventoryItemDTO> savedItemDTOs = savedBatch.getInventoryitems().stream()
                .map(item -> {
                    InventoryItemDTO dto = modelMapper.map(item, InventoryItemDTO.class);
                    dto.setProductId(item.getProductId()); // nếu cần gán productId
                    return dto;
                })
                .collect(Collectors.toList());

        savedDTO.setItems(savedItemDTOs);
        return savedDTO;
    }
}
