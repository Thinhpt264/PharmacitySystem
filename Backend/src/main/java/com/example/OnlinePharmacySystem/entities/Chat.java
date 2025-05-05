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
 * The persistent class for the chat database table.
 * 
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Chat implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Column(name="is_have_image")
	private byte isHaveImage;

	@Lob
	private String message;

	@Column(name="receiver_id")
	private int receiverId;

	@Column(name="sender_id")
	private int senderId;

	private byte staus;

	private int time;

	
}