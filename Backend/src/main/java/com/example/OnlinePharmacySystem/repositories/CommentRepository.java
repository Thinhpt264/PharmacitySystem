package com.example.OnlinePharmacySystem.repositories;

import com.example.OnlinePharmacySystem.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository  extends JpaRepository<Comment, Integer> {
    List<Comment> findCommentByProductId(int productId);
}
