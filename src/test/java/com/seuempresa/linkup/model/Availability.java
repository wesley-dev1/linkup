package com.seuempresa.linkup.model;

import javax.persistence.*;

@Entity
@Table(name = "availabilities",
        uniqueConstraints = @UniqueConstraint(columnNames = {"usuario_id", "diaSemana"}))
public class Availability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String diaSemana; // "Segunda", "Terça", etc.

    private boolean disponivel;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private User usuario;

    // Getters e Setters

    public Availability() {
    }

    // Construtores, getters e setters
    // ...

}
