package com.example.OnlinePharmacySystem.repositories;

import com.example.OnlinePharmacySystem.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
