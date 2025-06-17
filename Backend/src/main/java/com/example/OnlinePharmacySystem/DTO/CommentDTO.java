package com.example.OnlinePharmacySystem.DTO;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;

import java.util.List;

@Data
public class CommentDTO {
    private int id;
    private int accountId;
    private String comment;
    private Integer commentParentId; // sửa thành Integer thay vì CommentDTO
    private int productId;
    private int status;
    private List<CommentDTO> childComments;
}
