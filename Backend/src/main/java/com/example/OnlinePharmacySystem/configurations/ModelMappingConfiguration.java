package com.example.OnlinePharmacySystem.configurations;

import com.example.OnlinePharmacySystem.DTO.ImportBatchDTO;
import com.example.OnlinePharmacySystem.DTO.ProductDTO;
import com.example.OnlinePharmacySystem.entities.Importbatch;
import com.example.OnlinePharmacySystem.entities.Product;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMappingConfiguration {
	@Bean
	public ModelMapper modelMapper() {
		ModelMapper mapper = new ModelMapper();

		mapper.typeMap(Product.class, ProductDTO.class).addMappings(m -> {
			m.map(src -> src.getCategory().getId(), ProductDTO::setCategoryId);
			m.map(src -> src.getCategory().getCategoryName(), ProductDTO::setCategoryName);
		});

		mapper.typeMap(Importbatch.class, ImportBatchDTO.class)
				.addMappings(m ->
						m.map(Importbatch::getInventoryitems, ImportBatchDTO::setItems)
				);

		return mapper;
	}

}
