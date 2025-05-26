package com.example.OnlinePharmacySystem.DTO;

public class BrandDTO {

    private int id;
    private String description;
    private String name;
    private byte status;

    public BrandDTO() {}

    public BrandDTO(int id, String description, String name, byte status) {
        this.id = id;
        this.description = description;
        this.name = name;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte getStatus() {
        return status;
    }

    public void setStatus(byte status) {
        this.status = status;
    }
}
