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

        // Map entity → DTO
        Map<Integer, CommentDTO> dtoMap = new HashMap<>();
        List<CommentDTO> rootComments = new ArrayList<>();

        for (Comment comment : allComments) {
            CommentDTO dto = modelMapper.map(comment, CommentDTO.class);
            dto.setChildComments(new ArrayList<>()); // Chuẩn bị danh sách con
            dtoMap.put(dto.getId(), dto);
        }

        // Xây dựng quan hệ cha – con
        for (CommentDTO dto : dtoMap.values()) {
            Integer parentId = dto.getCommentParentId();
            if (parentId == null) {
                rootComments.add(dto); // Comment gốc
            } else {
                CommentDTO parentDTO = dtoMap.get(parentId);
                if (parentDTO != null) {
                    parentDTO.getChildComments().add(dto);
                } else {
                    // Nếu không có cha thì cũng đưa ra ngoài (tránh lỗi)
                    rootComments.add(dto);
                }
            }
        }

        return rootComments;
    }

    @Override
    public CommentDTO addComment(CommentDTO commentDTO) {
        Comment comment = modelMapper.map(commentDTO, Comment.class);
        Comment savedComment = commentRepository.save(comment);
        return modelMapper.map(savedComment, CommentDTO.class);
    }
}
