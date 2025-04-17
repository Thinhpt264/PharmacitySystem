package com.example.OnlinePharmacySystem.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.OnlinePharmacySystem.DTO.AccountDTO;
import com.example.OnlinePharmacySystem.entities.Account;
import com.example.OnlinePharmacySystem.services.AccountService;

@RestController
@RequestMapping("/accounts")
public class AccountController {
	@Autowired
	private AccountService accountService;
	
	@GetMapping(value = "/" , produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Account>> findAll() {
		try {
			return new ResponseEntity<List<Account>>(accountService.findAll() ,HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity<List<Account>>(HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@PostMapping(value = "process_login",consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> login(@RequestBody AccountDTO accountDTO) {
		try {
	        AccountDTO account = accountService.login(accountDTO.getUsername(), accountDTO.getPassword());

	        if (account == null) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai tài khoản hoặc mật khẩu");
	        }

	        Map<String, Object> response = new HashMap<>();
	        response.put("message", "Thanh Cong");
	        response.put("account", account);

	        return new ResponseEntity<>(response, HttpStatus.OK);

	    } catch (Exception e) {
	        e.printStackTrace();
	        return new ResponseEntity<>("Lỗi nội bộ server", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
		
	}
	
	@PostMapping(value = "/register", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> register(@RequestBody AccountDTO accountDTO) {
		try {
			return new ResponseEntity<Object>(new Object() {
				public boolean status = accountService.save(accountDTO);
				public AccountDTO account = accountService.findByUsername(accountDTO.getUsername());
			}, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
}
