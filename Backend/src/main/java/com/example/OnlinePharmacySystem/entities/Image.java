package com.example.OnlinePharmacySystem.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "table_name", columnDefinition = "TEXT")
    private String tableName;

    @Column(name = "object_id")
    private Integer objectId;

    @Column(name = "path", columnDefinition = "TEXT")
    private String path;

    @Column(name = "image_name", columnDefinition = "TEXT")
    private String imageName;

    // Constructors
    public Image() {
    }

    public Image(String tableName, Integer objectId, String path, String imageName) {
        this.tableName = tableName;
        this.objectId = objectId;
        this.path = path;
        this.imageName = imageName;
    }

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public Integer getObjectId() {
        return objectId;
    }

    public void setObjectId(Integer objectId) {
        this.objectId = objectId;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }
}
