package com.example.OnlinePharmacySystem.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "view_stat")
public class ViewStat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int view_count;

    @JoinColumn(name = "product_id")
    @OneToOne
    private Product product;

}
