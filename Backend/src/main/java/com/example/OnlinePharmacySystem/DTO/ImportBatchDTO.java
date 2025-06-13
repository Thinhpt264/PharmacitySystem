package com.example.OnlinePharmacySystem.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ImportBatchDTO {
    private String batchCode;
    private String supplierName;
    private String note;
    private LocalDate importDate;
    private List<InventoryItemDTO> items;
}
