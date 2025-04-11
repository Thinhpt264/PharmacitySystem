package com.example.OnlinePharmacySystem.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.OnlinePharmacySystem.DTO.AccountDTO;
import com.example.OnlinePharmacySystem.Repositories.AccountRepository;
import com.example.OnlinePharmacySystem.entities.Account;

@Service
public class AccountServiceImpl implements AccountService {
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	@Override
	public List<Account> findAll() {
		// TODO Auto-generated method stub
		System.out.println(accountRepository.findAll());
		return accountRepository.findAll();
	}

	@Override
	public AccountDTO login(String username, String password) {
		// TODO Auto-generated method stub
		Optional<Account> account = accountRepository.findByUsername(username);
		if (account.isPresent()) {
	        Account acc = account.get();
	        if ( encoder.matches(password, acc.getPassword()) && acc.getStatus() == true) {
	        	return mapper.map(acc, AccountDTO.class);
	        }
	    }
	    return null;
	}

	@Override
	public boolean save(AccountDTO accountDTO) {
		try {
			Account account = mapper.map(accountDTO, Account.class);
			account.setRole(1);
			account.setPassword(encoder.encode(accountDTO.getPassword()));
			account.setStatus(true);
			accountRepository.save(account);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
			return false;
		}
		// TODO Auto-generated method stub
		
	}

	@Override
	public AccountDTO findByUsername(String username) {
		// TODO Auto-generated method stub
		Optional<Account> account = accountRepository.findByUsername(username);
		if (account.isPresent()) {
			Account acc = account.get();
			return mapper.map(acc, AccountDTO.class);
		} 
		return null;
	}
	
	
	
	
}
