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
    private Integer commentParentId;
    private int productId;
    private int status;


    // THÊM DÒNG NÀY: để chứa danh sách comment con (nếu có)
    private List<CommentDTO> childComments;
}
