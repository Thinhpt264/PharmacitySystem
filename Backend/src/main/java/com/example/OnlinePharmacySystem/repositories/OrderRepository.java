package com.example.OnlinePharmacySystem.repositories;

import com.example.OnlinePharmacySystem.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findOrdersByAccountIdAndStatus(int accountId, int status);
}
