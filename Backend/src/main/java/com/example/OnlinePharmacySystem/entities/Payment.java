package com.example.OnlinePharmacySystem.entities;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.*;
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
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private int method;

	private int status;

	@Column(name="total_price")
	private double totalPrice;

//	@ManyToOne
//	@JoinColumn(name="delivery_info_id")
//	private DeliveryInfo deliveryInfo;

	@ManyToOne
	private Order order;




}