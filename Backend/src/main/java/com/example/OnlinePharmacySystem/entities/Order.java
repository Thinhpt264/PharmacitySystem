package com.example.OnlinePharmacySystem.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;


/**
 * The persistent class for the order database table.
 * 
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Order implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Column(name="account_id")
	private int accountId;

	@Lob
	private String note;

	@Temporal(TemporalType.DATE)
	@Column(name="order_date")
	private Date orderDate;

	private byte status;

	@Column(name="total_price")
	private double totalPrice;



}