package com.seuempresa.linkup.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String conteudo;

    private LocalDateTime dataPublicacao;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private User usuario;

    // Getters e Setters

    public Post() {
    }

    // Construtores, getters e setters
    // ...

}
