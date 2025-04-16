package com.example.OnlinePharmacySystem.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@AllArgsConstructor
//@NoArgsConstructor
@Getter
@Setter
@Table(name = "account")
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(nullable = false, unique = true)
	private String username;
	private String password;
	private int role;
	@Column(nullable = false,  unique = true)
	private String email;
	private boolean status;
	private String security_code;
	private LocalDateTime created_at;
	private LocalDateTime deleted_at;
	private LocalDateTime updated_at;
	private LocalDateTime last_login_at;
	private LocalDate dob;
	private int gender;
	
	 @PrePersist
	 protected void onCreate() {
	     created_at = LocalDateTime.now();
	 }

	 @PreUpdate
	 protected void onUpdate() {
	     updated_at = LocalDateTime.now();
	  }

	@Override
	public String toString() {
		return "Account [id=" + id + ", username=" + username + ", password=" + password + ", email=" + email
				+ ", status=" + status + ", security_code=" + security_code + ", created_at=" + created_at
				+ ", deleted_at=" + deleted_at + ", updated_at=" + updated_at + ", last_login_at=" + last_login_at
				+ ", dob=" + dob + ", gender=" + gender + "]";
	}

	public Account(int id, String username, String password, String email, boolean status, String security_code,
			LocalDateTime created_at, LocalDateTime deleted_at, LocalDateTime updated_at, LocalDateTime last_login_at,
			LocalDate dob, char gender) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.status = status;
		this.security_code = security_code;
		this.created_at = created_at;
		this.deleted_at = deleted_at;
		this.updated_at = updated_at;
		this.last_login_at = last_login_at;
		this.dob = dob;
		this.gender = gender;
	}

	public Account() {
		super();
	}

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

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getSecurity_code() {
		return security_code;
	}

	public void setSecurity_code(String security_code) {
		this.security_code = security_code;
	}

	public LocalDateTime getCreated_at() {
		return created_at;
	}

	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}

	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
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

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public int getGender() {
		return gender;
	}

	public void setGender(int gender) {
		this.gender = gender;
	}
	
	
	 
}
