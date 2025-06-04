package com.seuempresa.linkup.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name = "friendships", schema = "estagio2",
        uniqueConstraints = @UniqueConstraint(columnNames = {"usuario1_id", "usuario2_id"}))
public class Friendship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String status;

    @Column(nullable = false)
    private Boolean notified = false;

    @Column(name = "data_amizade")
    private LocalDate dataAmizade;

    @ManyToOne
    @JoinColumn(name = "usuario1_id", nullable = false)
    @JsonBackReference("usuario1")
    private User usuario1;

    @ManyToOne
    @JoinColumn(name = "usuario2_id", nullable = false)
    @JsonBackReference("usuario2")
    private User usuario2;

}
