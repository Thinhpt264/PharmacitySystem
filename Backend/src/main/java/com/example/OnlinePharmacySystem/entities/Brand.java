package com.example.OnlinePharmacySystem.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;


/**
 * The persistent class for the brand database table.
 * 
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class Brand implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Lob
	private String description;

	@Lob
	private String name;

	private byte status;

	// Quan hệ ngược lại với Product (không bắt buộc nhưng hữu ích nếu cần)
	@OneToMany(mappedBy = "brand", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Product> products;



}