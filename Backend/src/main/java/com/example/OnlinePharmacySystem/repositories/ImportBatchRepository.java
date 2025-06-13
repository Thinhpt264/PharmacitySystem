package com.example.OnlinePharmacySystem.repositories;

import com.example.OnlinePharmacySystem.entities.Importbatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImportBatchRepository extends JpaRepository<Importbatch, Integer> {
}
