package com.example.OnlinePharmacySystem.services;

import com.example.OnlinePharmacySystem.entities.Image;
import com.example.OnlinePharmacySystem.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


public interface ImageService {
    Image getImageByObjectId(Integer id, String tableName);
    boolean saveImage(Image image);

}
