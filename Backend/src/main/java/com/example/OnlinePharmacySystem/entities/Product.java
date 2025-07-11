package com.example.OnlinePharmacySystem.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false, length = 300)
	private String name;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String description;

	@Column(nullable = false)
	private Double price;

	@Column(nullable = true, columnDefinition = "TEXT")
	private String image;

	@Column(nullable = true, columnDefinition = "timestamp default current_timestamp")
	private LocalDateTime created_at;

	@Column
	private LocalDateTime updated_at;

	@Column
	private Integer type;

	@Column(length = 200)
	private String manufacturer;

	@Column(length = 200)
	private String ingredient;

	@Column(columnDefinition = "TEXT")
	private String note;

	@Column(name = "`use`", columnDefinition = "TEXT")
	private String use;

	@Column(columnDefinition = "TEXT")
	private String packaging;

	@Column
	private Boolean status;

	// Quan hệ với Brand
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "brand_id", referencedColumnName = "id", insertable = false, updatable = false)
	private Brand brand;

	@Column(name = "brand_id")
	private Integer brandId;

	// Quan hệ với Category
	@ManyToOne(fetch = FetchType.LAZY)
	private Category category;

		public Product() {
			super();
		}

		public Product(Integer id, String name, String description, Double price, String image,
				LocalDateTime created_at, LocalDateTime updated_at, Integer type, String manufacturer,
				String ingredient, String note, String use, String packaging, Boolean status, Integer brandId) {
			super();
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
			this.brandId = brandId;
		}

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

	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
			this.category = category;
	}

	@Override
		public String toString() {
			return "Product [id=" + id + ", name=" + name + ", description=" + description + ", price=" + price
					+ ", image=" + image + ", created_at=" + created_at + ", updated_at=" + updated_at + ", type="
					+ type + ", manufacturer=" + manufacturer + ", ingredient=" + ingredient + ", note=" + note
					+ ", use=" + use + ", packaging=" + packaging + ", status=" + status + "]";
		}

	@PrePersist
	public void prePersist() {
		if (created_at == null) {
			created_at = LocalDateTime.now();
		}
	}

	public Integer getBrandId() {
		return brandId;
	}

	public void setBrandId(Integer brandId) {
		this.brandId = brandId;
	}
}
