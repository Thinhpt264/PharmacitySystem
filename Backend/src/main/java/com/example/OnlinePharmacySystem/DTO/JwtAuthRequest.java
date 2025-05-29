package com.example.OnlinePharmacySystem.DTO;

import lombok.Data;

@Data
public class JwtAuthRequest {
    private String username;
    private String password;
}
