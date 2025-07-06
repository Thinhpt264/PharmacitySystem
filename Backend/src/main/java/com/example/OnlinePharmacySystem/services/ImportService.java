package com.example.OnlinePharmacySystem.services;

import com.example.OnlinePharmacySystem.DTO.ImportBatchDTO;

import java.util.List;

public interface ImportService {
    ImportBatchDTO createImportBatch(ImportBatchDTO importBatchDTO);

    List<ImportBatchDTO> findAllImportBatch();
}
