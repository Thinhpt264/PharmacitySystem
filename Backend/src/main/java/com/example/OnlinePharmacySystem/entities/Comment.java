package com.example.OnlinePharmacySystem.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * The persistent class for the comment database table.
 * 
 */
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Setter
public class Comment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int id;

	@Column(name = "account_id")
	private int accountId;

	@Lob
	private String comment;

	@Column(name = "product_id")
	private int productId;

	private int status;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "comment_parent_id")
	private Comment parentComment;

	@OneToMany(mappedBy = "parentComment", cascade = CascadeType.ALL)
	private List<Comment> childComments = new ArrayList<>();
}