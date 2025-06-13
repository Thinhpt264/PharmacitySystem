package com.example.OnlinePharmacySystem.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.OnlinePharmacySystem.DTO.JwtAuthRequest;
import com.example.OnlinePharmacySystem.DTO.JwtAuthResponse;
import com.example.OnlinePharmacySystem.Ultis.ApiResponse;
import com.example.OnlinePharmacySystem.Ultis.CustomUserDetails;
import com.example.OnlinePharmacySystem.Ultis.JwtUtils;
import com.example.OnlinePharmacySystem.configurations.CustomUserDetailsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.MimeTypeUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import com.example.OnlinePharmacySystem.DTO.AccountDTO;
import com.example.OnlinePharmacySystem.entities.Account;
import com.example.OnlinePharmacySystem.services.AccountService;

import javax.management.ObjectName;

@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController {
	@Autowired
	private  AccountService accountService;

	@Autowired
	private CustomUserDetailsService userDetailsService;

	@Autowired
	private JwtUtils jwtUtils;



	@Autowired
	private AuthenticationManager authenticationManager;
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
	public ResponseEntity<Object> login(@RequestBody @Valid JwtAuthRequest accountDTO, BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			return buildValidationErrors(bindingResult);
		}

		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(accountDTO.getUsername(), accountDTO.getPassword())
			);


			// 2. Lấy thông tin người dùng từ DB
			UserDetails userDetails = userDetailsService.loadUserByUsername(accountDTO.getUsername());
			System.out.println(userDetails);
			// 3. Sinh token JWT
			String role = ((CustomUserDetails) userDetails).getRoleName();
			System.out.println(role);
			String token = jwtUtils.generateToken(userDetails.getUsername(), role);
			AccountDTO account = accountService.findByUsername(accountDTO.getUsername());


			Map<String, Object> response = new HashMap<>();
			response.put("message", true);
			response.put("token", token);
			response.put("account", account);

			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tên đăng nhập hoặc mật khẩu không đúng");
		}
	}

	@PostMapping(value = "/register", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> register(@RequestBody @Valid AccountDTO accountDTO, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return buildValidationErrors(bindingResult);
		}

		try {
			boolean saved = accountService.save(accountDTO);
			if (!saved) {
				Map<String, Object> response = new HashMap<>();
				response.put("message", false);
				response.put("error", "Đăng ký thất bại. Tài khoản hoặc email đã tồn tại.");
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
			}

			AccountDTO createdAccount = accountService.findByUsername(accountDTO.getUsername());

			// Kiểm tra nếu tài khoản đã active thì mới sinh JWT
			if (createdAccount.isStatus()) {
				UserDetails userDetails = userDetailsService.loadUserByUsername(createdAccount.getUsername());
				String role = ((CustomUserDetails) userDetails).getRoleName(); // sử dụng role đúng

				String token = jwtUtils.generateToken(userDetails.getUsername(), role);
				return ResponseEntity.ok(new JwtAuthResponse(token, createdAccount));
			} else {
				// Trả về thông báo yêu cầu xác thực tài khoản
				Map<String, Object> response = new HashMap<>();
				response.put("message", true);
				response.put("account", createdAccount);
				response.put("note", "Tài khoản đã được tạo. Vui lòng xác minh email trước khi đăng nhập.");
				return ResponseEntity.status(HttpStatus.CREATED).body(response);
			}
		} catch (Exception e) {
			e.printStackTrace();
			Map<String, Object> response = new HashMap<>();
			response.put("message", false);
			response.put("error", "Lỗi hệ thống. Vui lòng thử lại sau.");
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
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

	@PutMapping(value = "/{id}", consumes = MimeTypeUtils.APPLICATION_JSON_VALUE, produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> updateAccount(@PathVariable int id, @RequestBody @Valid AccountDTO accountDTO, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return buildValidationErrors(bindingResult);
		}

		try {
			accountDTO.setId(id);
			boolean updated = accountService.update(accountDTO);

			if (updated) {
				AccountDTO updatedAccount = accountService.findByUsername(accountDTO.getUsername());
				return ResponseEntity.ok(updatedAccount);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body("Không tìm thấy tài khoản để cập nhật.");
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Lỗi hệ thống khi cập nhật tài khoản.");
		}
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Object> deleteAccount(@PathVariable int id) {
		try {
			boolean deleted = accountService.delete(id);

			if (deleted) {
				return ResponseEntity.ok("Xóa tài khoản thành công.");
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND)
						.body("Không tìm thấy tài khoản để xóa.");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Lỗi hệ thống khi xóa tài khoản.");
		}
	}


	@PostMapping(value = "/forgot-password", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse<Object>> forgotPassword(@RequestParam String email) {
		try {
			boolean emailSent = accountService.reSendCodeForgotPassword(email);

            if(emailSent) {
				return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>(true, "Email đã được gửi", emailSent));
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<>(false, "Email không tìm thấy"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			Map<String, String> response = new HashMap<>();
			response.put("error", "An error occurred while attempting to send reset instructions.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(false, "Lỗi server"));
		}
	}


	@PostMapping(value = "/verify-code", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
	public ResponseEntity<ApiResponse<Object>> verifySixDigitCode(@RequestParam String email, @RequestParam String code) {
		try {
			boolean isVerified = accountService.verifyCode(email, code);

			if (isVerified) {
				return ResponseEntity.ok(new ApiResponse<>(true, "Code verified successfully."));
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse<>(false, "Invalid or expired code."));
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse<>(false, "Server error. Please try again later."));
		}
	}
}
