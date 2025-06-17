package com.example.OnlinePharmacySystem.services;

import com.example.OnlinePharmacySystem.DTO.CommentDTO;

import java.util.List;

public interface CommentService {
    List<CommentDTO> commentsByProductId(int id);

    CommentDTO addComment(CommentDTO commentDTO);
}
