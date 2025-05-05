package com.example.OnlinePharmacySystem.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;


/**
 * The persistent class for the delivery_info database table.
 * 
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name="delivery_info")
public class DeliveryInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Column(name="account_id")
	private int accountId;

	@Lob
	@Column(name="address_detail")
	private String addressDetail;

	@Lob
	private String district;

	@Lob
	private String phone;

	@Lob
	private String province;

	private byte status;

	@Lob
	private String ward;



}