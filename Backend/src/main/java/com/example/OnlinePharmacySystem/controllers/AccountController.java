package com.example.OnlinePharmacySystem.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

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
				Map<String, Object> response = new HashMap<>();
				response.put("message", false);
	            return new ResponseEntity<>(response, HttpStatus.OK);
	        }

	        Map<String, Object> response = new HashMap<>();
	        response.put("message", true);
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
	@GetMapping(value = "/verify")
	public ResponseEntity<Object> verify(@RequestParam String email, @RequestParam String securityCode) {
		try {
			boolean verified = accountService.verify(email, securityCode);

			if (verified) {
				AccountDTO account = accountService.findByEmail(email);

				Map<String, Object> response = new HashMap<>();
				response.put("verified", true);
				response.put("account", account);

				return ResponseEntity.ok(response);
			} else {
				Map<String, Object> response = new HashMap<>();
				response.put("verified", false);
				response.put("message", "Mã xác minh không hợp lệ hoặc đã hết hạn.");

				return ResponseEntity.status(HttpStatus.OK).body(response);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Lỗi nội bộ server");
		}
	}
	@GetMapping(value = "/reSendCode")
	public ResponseEntity<Object> reSendCode(@RequestParam String email) {
		try {
			boolean verified = accountService.reSendCode(email);

			if (verified) {
				boolean status = true;
				return ResponseEntity.ok(status);
			} else {
				boolean status = false;
				return ResponseEntity.status(HttpStatus.OK).body(status);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Lỗi nội bộ server");
		}
	}
}
