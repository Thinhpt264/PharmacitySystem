package com.example.OnlinePharmacySystem.services.impl;

import com.example.OnlinePharmacySystem.DTO.CommentDTO;
import com.example.OnlinePharmacySystem.entities.Comment;
import com.example.OnlinePharmacySystem.repositories.CommentRepository;
import com.example.OnlinePharmacySystem.services.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;


    @Override
    public List<CommentDTO> commentsByProductId(int id) {
        List<Comment> allComments = commentRepository.findCommentByProductId(id);
        Map<Integer, CommentDTO> dtoMap = new HashMap<>();
        List<CommentDTO> rootComments = new ArrayList<>();

        for (Comment comment : allComments) {
            CommentDTO dto = new CommentDTO();
            dto.setId(comment.getId());
            dto.setAccountId(comment.getAccountId());
            dto.setComment(comment.getComment());
            dto.setProductId(comment.getProductId());
            dto.setStatus(comment.getStatus());
            dto.setCommentParentId(comment.getParentComment() != null ? comment.getParentComment().getId() : null);
            dto.setChildComments(new ArrayList<>());
            dtoMap.put(dto.getId(), dto);
        }

        for (CommentDTO dto : dtoMap.values()) {
            Integer parentId = dto.getCommentParentId();
            if (parentId == null) {
                rootComments.add(dto);
            } else {
                CommentDTO parentDTO = dtoMap.get(parentId);
                if (parentDTO != null) {
                    parentDTO.getChildComments().add(dto);
                } else {
                    rootComments.add(dto); // fallback nếu cha không tồn tại
                }
            }
        }

        return rootComments;
    }

    @Override
    public CommentDTO addComment(CommentDTO commentDTO) {
        Comment comment = new Comment();
        comment.setId(commentDTO.getId());
        comment.setAccountId(commentDTO.getAccountId());
        comment.setComment(commentDTO.getComment());
        comment.setProductId(commentDTO.getProductId());
        comment.setStatus(commentDTO.getStatus());

        // Gán parent nếu có
        if (commentDTO.getCommentParentId() != null) {
            Comment parent = commentRepository.findById(commentDTO.getCommentParentId())
                    .orElse(null);
            comment.setParentComment(parent);
        }

        Comment savedComment = commentRepository.save(comment);
        return modelMapper.map(savedComment, CommentDTO.class);
    }
}
