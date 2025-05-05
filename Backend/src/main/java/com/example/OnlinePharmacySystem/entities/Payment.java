package com.example.OnlinePharmacySystem.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;


/**
 * The persistent class for the payment database table.
 * 
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Payment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Column(name="delivery_info_id")
	private int deliveryInfoId;

	private int method;

	@Column(name="order_id")
	private int orderId;

	private int status;

	@Column(name="total_price")
	private double totalPrice;



}