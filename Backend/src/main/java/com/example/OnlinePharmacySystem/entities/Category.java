package com.example.OnlinePharmacySystem.entities;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.micrometer.common.lang.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Category implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Lob
	@Column(name="category_name")
	private String categoryName;

	@Column(name="category_parent_id")
	@Nullable
	private Integer categoryParentId;
	@OneToMany(mappedBy="category")
	@JsonIgnore
	private List<Product> products;

	private byte status;


	
	

}
