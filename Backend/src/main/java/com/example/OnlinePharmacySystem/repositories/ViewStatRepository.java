package com.example.OnlinePharmacySystem.repositories;

import com.example.OnlinePharmacySystem.entities.Product;
import com.example.OnlinePharmacySystem.entities.ViewStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ViewStatRepository extends JpaRepository<ViewStat, Integer> {
    @Query("SELECT v.product FROM ViewStat v ORDER BY v.view_count DESC ")
    List<Product> findTopProductByView();
}
