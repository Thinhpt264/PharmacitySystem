package com.example.OnlinePharmacySystem.DTO;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class AccountDTO {
	private int id;
	private String username;
	private String password;
	private String email;
	private boolean status;
	private LocalDate dob;
	private LocalDateTime created_at;
	private LocalDateTime deleted_at;
	private LocalDateTime updated_at;
	private LocalDateTime last_login_at;
	

	
}
