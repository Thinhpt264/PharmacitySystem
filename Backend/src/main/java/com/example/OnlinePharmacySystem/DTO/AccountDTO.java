package com.example.OnlinePharmacySystem.DTO;

import lombok.*;

import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class AccountDTO {
	private int id;

	@NotBlank(message = "{username.not.blank}")
	@Size(min = 5, max = 20, message = "{username.size}")
	private String username;

	@NotBlank(message = "{password.not.blank}")
	@Size(min = 8, message = "{password.size}")
	private String password;

	@NotBlank(message = "{email.not.blank}")
	@Email(message = "{email.invalid}")
	private String email;
	private  String phone;
	private boolean status;

	private LocalDate dob;
	private int role;
	private LocalDateTime created_at;
	private LocalDateTime deleted_at;
	private LocalDateTime updated_at;
	private LocalDateTime last_login_at;
	private String security_code;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public LocalDateTime getCreated_at() {
		return created_at;
	}

	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}

	public LocalDateTime getDeleted_at() {
		return deleted_at;
	}

	public void setDeleted_at(LocalDateTime deleted_at) {
		this.deleted_at = deleted_at;
	}

	public LocalDateTime getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(LocalDateTime updated_at) {
		this.updated_at = updated_at;
	}

	public LocalDateTime getLast_login_at() {
		return last_login_at;
	}

	public void setLast_login_at(LocalDateTime last_login_at) {
		this.last_login_at = last_login_at;
	}

	public String getSecurity_code() {
		return security_code;
	}

	public void setSecurity_code(String security_code) {
		this.security_code = security_code;
	}

	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
}
