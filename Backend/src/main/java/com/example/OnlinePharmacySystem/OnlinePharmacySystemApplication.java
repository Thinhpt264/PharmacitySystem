package com.example.OnlinePharmacySystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@SpringBootApplication
@EnableCaching
@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)

public class OnlinePharmacySystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlinePharmacySystemApplication.class, args);
	}

}
