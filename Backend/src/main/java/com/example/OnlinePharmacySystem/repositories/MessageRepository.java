package com.example.OnlinePharmacySystem.repositories;

import com.example.OnlinePharmacySystem.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllBySenderIdOrReceiverId(int senderId, int receiverId);


    @Query("SELECT m FROM Message m WHERE " +
            "(m.senderId = :user1 AND m.receiverId = :user2) OR " +
            "(m.senderId = :user2 AND m.receiverId = :user1) " +
            "ORDER BY m.timestamp ASC")
    List<Message> findConversationBetweenAccounts(
            @Param("user1") int user1,
            @Param("user2") int user2
    );
}