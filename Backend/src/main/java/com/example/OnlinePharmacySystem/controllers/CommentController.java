package com.example.OnlinePharmacySystem.controllers;

import com.example.OnlinePharmacySystem.DTO.CommentDTO;
import com.example.OnlinePharmacySystem.Ultis.ApiResponse;
import com.example.OnlinePharmacySystem.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<List<CommentDTO>>> getCommentsByProductId(@PathVariable int productId) {
        try {
            List<CommentDTO> comments = commentService.commentsByProductId(productId);
            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Lấy danh sách thành công", comments));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Lỗi khi Lấy danh sách: " + e.getMessage()));
        }

    }

    @PostMapping
    public ResponseEntity<ApiResponse<CommentDTO>> addComment(@RequestBody CommentDTO commentDTO) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            CommentDTO comment = commentService.addComment(commentDTO);
            return ResponseEntity.ok(
                    new ApiResponse<>(true, "Lấy danh sách thành công", comment));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse<>(false, "Lỗi khi Lấy danh sách: " + e.getMessage()));
        }
    }
}
