package com.example.OnlinePharmacySystem.services;

import java.util.List;

import com.example.OnlinePharmacySystem.DTO.AccountDTO;
import com.example.OnlinePharmacySystem.entities.Account;

public interface AccountService {
	public List<Account> findAll();
	
	public AccountDTO login(String username,String password);
	 
	public boolean save(AccountDTO accountDTO);
	
	public AccountDTO findByUsername (String username);

	public boolean verify(String email, String securityCode);

	public AccountDTO findByEmail(String email);

	public boolean reSendCode(String email);
}
