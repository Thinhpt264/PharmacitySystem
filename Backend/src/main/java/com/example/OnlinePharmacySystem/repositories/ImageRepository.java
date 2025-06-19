package com.example.OnlinePharmacySystem.repositories;

import com.example.OnlinePharmacySystem.entities.Image;
import com.example.OnlinePharmacySystem.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {

    @Query("SELECT i FROM Image i WHERE i.objectId = :objectId AND i.tableName = :tableName")
     List<Image> findByObjectId(@Param("objectId") Integer objectId, @Param("tableName") String tableName);
	

}
