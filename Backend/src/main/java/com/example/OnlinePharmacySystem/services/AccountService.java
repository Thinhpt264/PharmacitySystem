	package com.example.OnlinePharmacySystem.services;

	import java.util.List;

	import com.example.OnlinePharmacySystem.DTO.AccountDTO;
	import com.example.OnlinePharmacySystem.entities.Account;

	public interface AccountService {
		 List<Account> findAll();

		 AccountDTO findById(int id);

		 AccountDTO login(String username,String password);

		public boolean save(AccountDTO accountDTO);

		public AccountDTO findByUsername (String username);

		 boolean verify(String email, String securityCode);

		public AccountDTO findByEmail(String email);

		public boolean reSendCode(String email);

		boolean update (AccountDTO accountDTO);

		boolean delete(int id);

		boolean reSendCodeForgotPassword(String email);

		boolean verifyCode(String email, String code);

	}
