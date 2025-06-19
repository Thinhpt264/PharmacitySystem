package com.example.OnlinePharmacySystem.services.impl;

import com.example.OnlinePharmacySystem.entities.Image;
import com.example.OnlinePharmacySystem.repositories.ImageRepository;
import com.example.OnlinePharmacySystem.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepository;
    @Override
    public Image getImageByObjectId(Integer id, String tableName) {
        List<Image> images = imageRepository.findByObjectId(id, tableName);
        if (images.isEmpty()) return null;

        // Trả về ảnh đầu tiên, hoặc bạn có thể lọc theo ảnh chính (main), ví dụ:
        return images.get(0);
    }

    @Override
    public boolean saveImage(Image image) {
        imageRepository.save(image);
        return true;
    }
}
