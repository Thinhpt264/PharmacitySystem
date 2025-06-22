package com.example.OnlinePharmacySystem.controllers;

import com.example.OnlinePharmacySystem.DTO.PromotionRequestDTO;
import com.example.OnlinePharmacySystem.DTO.PromotionResponseDTO;
import com.example.OnlinePharmacySystem.entities.PromotionHistory;
import com.example.OnlinePharmacySystem.repositories.PromotionHistoryRepository;
import com.example.OnlinePharmacySystem.services.PromotionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/promotions")
@RequiredArgsConstructor
@Slf4j
public class PromotionController {


    private final PromotionService promotionService;
    private final PromotionHistoryRepository promotionHistoryRepository;

    @GetMapping
    public ResponseEntity<List<PromotionResponseDTO>> getAllPromotions() {
        List<PromotionResponseDTO> promotions = promotionService.getAllPromotions();
        return ResponseEntity.ok(promotions);
    }
    @PostMapping
    ResponseEntity<PromotionResponseDTO> createPromotion(@RequestBody PromotionRequestDTO requestDTO) {

        PromotionResponseDTO res = promotionService.createPromotion(requestDTO);
        return ResponseEntity.ok(res);
    }


    @GetMapping("/{id}")
    public ResponseEntity<PromotionResponseDTO> getPromotionById(@PathVariable("id") int id) {
        PromotionResponseDTO res = promotionService.getPromotionById(id);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PromotionResponseDTO> updatePromotion(@PathVariable("id") int id,@RequestBody  PromotionRequestDTO resquestDTO) {
        PromotionResponseDTO res = promotionService.updatePromotion(id, resquestDTO);
        return ResponseEntity.ok(res);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable("id") int id) {
       promotionService.deletePromotion(id);
       return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}/history")
    public ResponseEntity<List<PromotionHistory>> getPromotionHistory(@PathVariable int id) {
        List<PromotionHistory> historyList =  promotionHistoryRepository.findByPromotionId(id);
        return ResponseEntity.ok(historyList);
    }
}
