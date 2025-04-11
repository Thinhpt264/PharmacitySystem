package com.example.OnlinePharmacySystem.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.OnlinePharmacySystem.Repositories.AccountRepository;
import com.example.OnlinePharmacySystem.entities.Account;

@Service
public class AccountServiceImpl implements AccountService {
	@Autowired
	private AccountRepository accountRepository;

	@Override
	public List<Account> findAll() {
		// TODO Auto-generated method stub
		System.out.println(accountRepository.findAll());
		return accountRepository.findAll();
	}

	@Override
	public Account login(String username, String password) {
		// TODO Auto-generated method stub
		Optional<Account> account = accountRepository.findByUsername(username);
		if (account.isPresent()) {
	        Account acc = account.get();
	        if (acc.getPassword().equals(password) && acc.getStatus() == true) {
	        	return acc;
	        }
	    }
	    return null;
	}
	
	
}
