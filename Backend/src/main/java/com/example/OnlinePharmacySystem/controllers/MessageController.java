package com.example.OnlinePharmacySystem.controllers;

import com.example.OnlinePharmacySystem.entities.Account;
import com.example.OnlinePharmacySystem.entities.Message;
import com.example.OnlinePharmacySystem.repositories.AccountRepository;
import com.example.OnlinePharmacySystem.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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


    @PostMapping("/to-admin")
    public ResponseEntity<?> sendMessageToAdmin(@RequestBody Message message) {
        Optional<Account> adminUser = accountRepository.findByUsername("admin");

        if (adminUser.isEmpty()) {
            return ResponseEntity.badRequest().body("Admin user not found");
        }


        message.setReceiverId((long) adminUser.get().getId());

        Message saved = messageRepository.save(message);


        messagingTemplate.convertAndSend("/topic/messages/" + message.getReceiverId(), saved);

        return ResponseEntity.ok(saved);
    }
    @GetMapping("/with-admin")
    public ResponseEntity<?> getMessagesWithAdmin(@RequestParam int userId) {
        Optional<Account> adminAccount = accountRepository.findByUsername("admin");

        if (adminAccount.isEmpty()) {
            return ResponseEntity.badRequest().body("Admin account not found");
        }

        int adminId = adminAccount.get().getId();

        List<Message> messages = messageRepository.findConversationBetweenAccounts(userId, adminId);

        return ResponseEntity.ok(messages);
    }
}
