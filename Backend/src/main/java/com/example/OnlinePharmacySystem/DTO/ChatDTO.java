package com.example.OnlinePharmacySystem.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collector;

@Data


public class ChatDTO {
    private int id;
    private String username;
    private String email;
    public ChatDTO(int id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }


}
