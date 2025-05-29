package com.example.OnlinePharmacySystem.configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	 
	 @Bean
	 public BCryptPasswordEncoder passwordEncoder() {
			return new BCryptPasswordEncoder();
		}


	@Override
	public void addResourceHandlers(org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/images/product/**")
				.addResourceLocations("file:uploads/images/product/");
	}
}
