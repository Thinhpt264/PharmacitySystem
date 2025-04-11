package com.example.OnlinePharmacySystem.configuration;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ui.ModelMap;

@Configuration
public class ModelMappingConfiguration {
	@Bean
	public ModelMapper modelMapper() {
		ModelMapper mapper = new ModelMapper();
		return mapper;
	}

}
