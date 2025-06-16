package com.example.OnlinePharmacySystem.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
@Entity
@Table(name = "inventory_item")
public class InventoryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="expiry_date")
    private LocalDate expiryDate;

    @Column(name="product_id")
    private int productId;

    private int quantity;

    @Column(name="quantity_remaining")
    private int quantityRemaining;

    private int status;

    //bi-directional many-to-one association to Importbatch
    @ManyToOne
    @JoinColumn(name="import_batch_id")
    private Importbatch importbatch;

    @ManyToOne
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private Product product;

    public InventoryItem() {
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDate getExpiryDate() {
        return this.expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public int getProductId() {
        return this.productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return this.quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getQuantityRemaining() {
        return this.quantityRemaining;
    }

    public void setQuantityRemaining(int quantityRemaining) {
        this.quantityRemaining = quantityRemaining;
    }

    public int getStatus() {
        return this.status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Importbatch getImportbatch() {
        return this.importbatch;
    }

    public void setImportBatch(Importbatch importbatch) {
        this.importbatch = importbatch;
    }
}
