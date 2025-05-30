package com.example.OnlinePharmacySystem.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.example.OnlinePharmacySystem.Ultis.RandomHelper;
import com.example.OnlinePharmacySystem.services.AccountService;
import com.example.OnlinePharmacySystem.services.MailService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.OnlinePharmacySystem.DTO.AccountDTO;
import com.example.OnlinePharmacySystem.repositories.AccountRepository;
import com.example.OnlinePharmacySystem.entities.Account;

@Service
@Slf4j
public class AccountServiceImpl implements AccountService {
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private ModelMapper mapper;

	@Autowired
	private MailService mailService;

	@Autowired
	private Environment environment;
	
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
			account.setStatus(false);
			account.setSecurity_code(RandomHelper.random6Digits());
			account.setSecurityExpiration(LocalDateTime.now().plusMinutes(15));
			// Lưu tài khoản và xử lý nếu thành công
			Account savedAccount = accountRepository.save(account);
				String from = environment.getProperty("spring.mail.username");
				String to = account.getEmail();
				String verifyLink = environment.getProperty("BASE_URL") + "/verify?email=" + account.getEmail() + "&securityCode=" + account.getSecurity_code();

				String content = "<!DOCTYPE html>" +
						"<html>" +
						"<head>" +
						"<style>" +
						"body { font-family: Arial, sans-serif; }" +
						".container { max-width: 600px; margin: 0 auto; padding: 20px; }" +
						".btn { background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; }" +
						"</style>" +
						"</head>" +
						"<body>" +
						"<div class='container'>" +
						"<h2>Xác minh tài khoản của bạn</h2>" +
						"<p>Xin chào,</p>" +
						"<p>Vui lòng nhấp vào nút bên dưới để xác minh tài khoản của bạn:</p>" +
						"<a href='" + verifyLink + "' class='btn'>Xác minh tài khoản</a>" +
						"" +
						"<br><br><br><b> Đường dẫn sẽ hết hạn sau 15 phút </b>"+
						"</div>" +
						"</body>" +
						"</html>";
				System.out.println(verifyLink);
				mailService.send(from, to, "Xác minh tài khoản", content);

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

	@Override
	public boolean verify(String email, String securityCode) {
		try {
			Account account = accountRepository.findByEmail(email);
			if (account != null && securityCode.equals(account.getSecurity_code())) {
				account.setStatus(true);
				account.setSecurity_code(securityCode);

				account.setCreated_at(LocalDateTime.now());
				accountRepository.save(account);
				return true;
			}
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}


	@Override
	public AccountDTO findByEmail(String email) {
		Account account = accountRepository.findByEmail(email);
		if(account != null) {
			return mapper.map(account, AccountDTO.class);
		}
		return null;
	}

	@Override
	public boolean reSendCode(String email) {
		try {
			Account account = accountRepository.findByEmail(email);
			if (account != null) {
				String securityCode = RandomHelper.random6Digits();
				account.setSecurity_code(securityCode);
				account.setSecurityExpiration(LocalDateTime.now().plusMinutes(15));
//				accountRepository.save(account);
//				return true;
				try {
					// Lưu tài khoản và xử lý nếu thành công
					Account savedAccount = accountRepository.save(account);
					String from = environment.getProperty("spring.mail.username");
					String to = account.getEmail();
					String verifyLink = environment.getProperty("BASE_URL") + "/verify?email=" + account.getEmail() + "&securityCode=" + account.getSecurity_code();

					String content = "<!DOCTYPE html>" +
							"<html>" +
							"<head>" +
							"<style>" +
							"body { font-family: Arial, sans-serif; }" +
							".container { max-width: 600px; margin: 0 auto; padding: 20px; }" +
							".btn { background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; }" +
							"</style>" +
							"</head>" +
							"<body>" +
							"<div class='container'>" +
							"<h2>Xác minh tài khoản của bạn</h2>" +
							"<p>Xin chào,</p>" +
							"<p>Vui lòng nhấp vào nút bên dưới để xác minh tài khoản của bạn:</p>" +
							"<a href='" + verifyLink + "' class='btn'>Xác minh tài khoản</a>" +
							"" +
							"<br><br><br><b> Đường dẫn sẽ hết hạn sau 15 phút </b>"+
							"</div>" +
							"</body>" +
							"</html>";
					System.out.println(verifyLink);
					mailService.send(from, to, "Xác minh tài khoản", content);

					return true;
				} catch (Exception e) {
					e.printStackTrace();
					// TODO: handle exception
					return false;
				}
				// TODO Auto-generated method stub

			}
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}


}
