package com.example.OnlinePharmacySystem.entities;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.micrometer.common.lang.Nullable;
import jakarta.persistence.*;

@Entity
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

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCategoryName() {
		return this.categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Integer getCategoryParentId() {
		return this.categoryParentId;
	}

	public void setCategoryParentId(Integer categoryParentId) {
		this.categoryParentId = categoryParentId;
	}

	public byte getStatus() {
		return this.status;
	}

	public void setStatus(byte status) {
		this.status = status;
	}

	public List<Product> getProducts() {
		return this.products;
	}
	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public Category(int id, String categoryName, Integer categoryParentId, byte status) {
		super();
		this.id = id;
		this.categoryName = categoryName;
		this.categoryParentId = categoryParentId;
		this.status = status;
	}

	public Category() {
		super();
	}
	
	

}
