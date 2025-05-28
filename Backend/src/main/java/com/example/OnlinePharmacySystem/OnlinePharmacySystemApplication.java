package com.example.OnlinePharmacySystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class OnlinePharmacySystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlinePharmacySystemApplication.class, args);
	}

}
