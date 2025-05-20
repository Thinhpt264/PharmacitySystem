package com.example.OnlinePharmacySystem.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import com.example.OnlinePharmacySystem.DTO.AccountDTO;
import com.example.OnlinePharmacySystem.entities.Account;
import com.example.OnlinePharmacySystem.services.AccountService;

@RestController
@RequestMapping("/accounts")
public class AccountController {

	@Autowired
	private AccountService accountService;

	@GetMapping(value = "/", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Account>> findAll() {
		try {
			return new ResponseEntity<>(accountService.findAll(), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping(value = "process_login", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> login(@RequestBody @Valid AccountDTO accountDTO, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return buildValidationErrors(bindingResult);
		}

		try {
			AccountDTO account = accountService.login(accountDTO.getUsername(), accountDTO.getPassword());

			Map<String, Object> response = new HashMap<>();
			response.put("message", account != null);
			if (account != null) {
				response.put("account", account);
			}

			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>("Lỗi nội bộ server", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/register", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> register(@RequestBody @Valid AccountDTO accountDTO, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return buildValidationErrors(bindingResult);
		}

		try {
			return new ResponseEntity<>(new Object() {
				public boolean status = accountService.save(accountDTO);
				public AccountDTO account = accountService.findByUsername(accountDTO.getUsername());
			}, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping(value = "/verify")
	public ResponseEntity<Object> verify(@RequestParam String email, @RequestParam String securityCode) {
		try {
			boolean verified = accountService.verify(email, securityCode);

			Map<String, Object> response = new HashMap<>();
			response.put("verified", verified);

			if (verified) {
				AccountDTO account = accountService.findByEmail(email);
				response.put("account", account);
			} else {
				response.put("message", "Mã xác minh không hợp lệ hoặc đã hết hạn.");
			}

			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi nội bộ server");
		}
	}

	@GetMapping(value = "/reSendCode")
	public ResponseEntity<Object> reSendCode(@RequestParam String email) {
		try {
			boolean verified = accountService.reSendCode(email);
			return ResponseEntity.ok(verified);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi nội bộ server");
		}
	}

	// Helper method to format validation errors
	private ResponseEntity<Object> buildValidationErrors(BindingResult bindingResult) {
		Map<String, String> errors = new HashMap<>();
		for (FieldError error : bindingResult.getFieldErrors()) {
			errors.put(error.getField(), error.getDefaultMessage());
		}
		return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	}
}
