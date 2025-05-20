package com.example.OnlinePharmacySystem.services;

import com.example.OnlinePharmacySystem.entities.Image;
import com.example.OnlinePharmacySystem.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepository;
    @Override
    public Image getImageByObjectId(Integer id, String tableName) {
        return imageRepository.findByObjectId(id, tableName);
    }

    @Override
    public boolean saveImage(Image image) {
        imageRepository.save(image);
        return true;
    }
}
