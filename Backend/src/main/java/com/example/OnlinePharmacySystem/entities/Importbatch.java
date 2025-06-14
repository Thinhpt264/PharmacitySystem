package com.example.OnlinePharmacySystem.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
@Entity
public class Importbatch {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="batch_code")
    private String batchCode;

    @Temporal(TemporalType.DATE)
    @Column(name="import_date")
    private LocalDate importDate;

    @Lob
    private String note;

    @Lob
    @Column(name="supplier_name")
    private String supplierName;

    //bi-directional many-to-one association to Inventoryitem
    @OneToMany(mappedBy = "importbatch", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InventoryItem> inventoryitems;

    public Importbatch() {
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBatchCode() {
        return this.batchCode;
    }

    public void setBatchCode(String batchCode) {
        this.batchCode = batchCode;
    }

    public LocalDate getImportDate() {
        return this.importDate;
    }

    public void setImportDate(LocalDate importDate) {
        this.importDate = importDate;
    }

    public String getNote() {
        return this.note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getSupplierName() {
        return this.supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public List<InventoryItem> getInventoryitems() {
        return this.inventoryitems;
    }

    public void setInventoryitems(List<InventoryItem> inventoryitems) {
        this.inventoryitems = inventoryitems;
    }

    public InventoryItem addInventoryitem(InventoryItem inventoryitem) {
        getInventoryitems().add(inventoryitem);
        inventoryitem.setImportBatch(this);

        return inventoryitem;
    }

    public InventoryItem removeInventoryitem(InventoryItem inventoryitem) {
        getInventoryitems().remove(inventoryitem);
        inventoryitem.setImportBatch(null);

        return inventoryitem;
    }
}
