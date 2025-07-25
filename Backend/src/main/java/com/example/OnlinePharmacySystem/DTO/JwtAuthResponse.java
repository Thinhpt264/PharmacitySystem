package com.example.OnlinePharmacySystem.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtAuthResponse {
    private String token;
    private AccountDTO account;
}