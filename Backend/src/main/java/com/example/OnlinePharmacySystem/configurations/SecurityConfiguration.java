package com.example.OnlinePharmacySystem.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception   {
		return httpSecurity
				.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(auth -> auth
		                .anyRequest().permitAll() // Mở tất cả API
		            )
				.build();
	}
}
