package com.example.OnlinePharmacySystem.DTO;

import java.time.LocalDateTime;

public class ProductDTO {

	private Integer id;
	private String name;
	private String description;
	private Double price;
	private String image;
	private LocalDateTime created_at;
	private LocalDateTime updated_at;
	private Integer type;
	private String manufacturer;
	private String ingredient;
	private String note;
	private String use;
	private String packaging;
	private Boolean status;

	private Integer categoryId;
	private String categoryName;

	private Integer brandId; // mới thêm: đối tượng brand lồng vào

	public ProductDTO() {}

	public ProductDTO(Integer id, String name, String description, Double price, String image, LocalDateTime created_at,
					  LocalDateTime updated_at, Integer type, String manufacturer, String ingredient, String note, String use,
					  String packaging, Boolean status, Integer categoryId, String categoryName, Integer brandId) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.image = image;
		this.created_at = created_at;
		this.updated_at = updated_at;
		this.type = type;
		this.manufacturer = manufacturer;
		this.ingredient = ingredient;
		this.note = note;
		this.use = use;
		this.packaging = packaging;
		this.status = status;
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.brandId = brandId;
	}

	// Getters and Setters

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public LocalDateTime getCreated_at() {
		return created_at;
	}

	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}

	public LocalDateTime getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(LocalDateTime updated_at) {
		this.updated_at = updated_at;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getManufacturer() {
		return manufacturer;
	}

	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	public String getIngredient() {
		return ingredient;
	}

	public void setIngredient(String ingredient) {
		this.ingredient = ingredient;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getUse() {
		return use;
	}

	public void setUse(String use) {
		this.use = use;
	}

	public String getPackaging() {
		return packaging;
	}

	public void setPackaging(String packaging) {
		this.packaging = packaging;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Integer getBrandId() {
		return brandId;
	}

	public void setBrandId(Integer brandId) {
		this.brandId = brandId;
	}
}
