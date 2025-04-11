package com.example.OnlinePharmacySystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.OnlinePharmacySystem.entities.Account;
import com.example.OnlinePharmacySystem.service.AccountService;

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
	
	@PostMapping(value = "process_login", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Account> login(@RequestParam("username") String username, @RequestParam("password") String password) {
		 try {
		        Account account = accountService.login(username, password);
		        if (account != null) {
		            return new ResponseEntity<>(account, HttpStatus.OK);
		        } else {
		            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		        }
		    } catch (Exception e) {
		        e.printStackTrace();
		        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		    }
		
		
	}
	
	
}
