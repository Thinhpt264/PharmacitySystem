package com.example.OnlinePharmacySystem.controllers;

import com.example.OnlinePharmacySystem.DTO.ChatDTO;
import com.example.OnlinePharmacySystem.entities.Account;
import com.example.OnlinePharmacySystem.entities.Message;
import com.example.OnlinePharmacySystem.repositories.AccountRepository;
import com.example.OnlinePharmacySystem.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody Message message) {
        Message saved = messageRepository.save(message);

        messagingTemplate.convertAndSend("/topic/messages/" + message.getReceiverId(), saved);

        return ResponseEntity.ok(saved);
    }



    @GetMapping()
    public ResponseEntity<?> getConversationUsers(@RequestParam int userId) {
        List<Message> messages = messageRepository.findAllBySenderIdOrReceiverId(userId, userId);

        Set<Integer> partnerIds = new HashSet<>();
        for (Message msg : messages) {
            if (msg.getSenderId() != null && msg.getSenderId() != userId) {
                partnerIds.add(msg.getSenderId());
            }
            if (msg.getReceiverId() != null && msg.getReceiverId() != userId) {
                partnerIds.add(msg.getReceiverId());
            }
        }

        List<Account> partners = accountRepository.findAllById(partnerIds);

        return ResponseEntity.ok(
                partners.stream()
                        .map(acc -> new ChatDTO(acc.getId(), acc.getUsername(), acc.getEmail()))
                        .collect(Collectors.toList())
        );

    }
    @GetMapping("/conversation-detail")
    public ResponseEntity<?> getConversationDetail(@RequestParam int userId, @RequestParam int partnerId) {
        List<Message> messages = messageRepository.findConversationBetweenAccounts(userId, partnerId);

        return ResponseEntity.ok(messages);
    }

}
