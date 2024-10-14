package com.seuempresa.linkup.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "friendships",
        uniqueConstraints = @UniqueConstraint(columnNames = {"usuario1_id", "usuario2_id"}))
public class Friendship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Usuário que enviou o pedido de amizade
    @ManyToOne
    @JoinColumn(name = "usuario1_id", nullable = false)
    private User usuario1;

    // Usuário que recebeu o pedido de amizade
    @ManyToOne
    @JoinColumn(name = "usuario2_id", nullable = false)
    private User usuario2;

    private String status; // Ex.: "pendente", "aceita", "bloqueada"

    private LocalDate dataAmizade;

    // Getters e Setters

    public Friendship() {
    }

    // Construtores, getters e setters
    // ...

}
