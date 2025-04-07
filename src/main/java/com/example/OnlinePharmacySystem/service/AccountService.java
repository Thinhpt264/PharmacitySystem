package com.example.OnlinePharmacySystem.service;

import java.util.List;

import com.example.OnlinePharmacySystem.entities.Account;

public interface AccountService {
	public List<Account> findAll();
	
	public Account login(String username,String password);
}
