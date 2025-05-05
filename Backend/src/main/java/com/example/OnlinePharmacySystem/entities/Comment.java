package com.example.OnlinePharmacySystem.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

/**
 * The persistent class for the comment database table.
 * 
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Comment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Column(name="account_id")
	private int accountId;

	@Lob
	private String comment;

	@Column(name="comment_parent_id")
	private int commentParentId;

	@Column(name="product_id")
	private int productId;

	private int status;



}