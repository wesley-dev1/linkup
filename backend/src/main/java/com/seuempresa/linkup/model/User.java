package com.seuempresa.linkup.model;


import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Data;

import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "users", schema = "estagio2")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nome;

    @Column(unique = true)
    private String email;

    private String senha;

    @Column(name = "foto_perfil")
    private String fotoPerfil;

    @Column(name = "data_cadastro")
    private LocalDate dataCadastro;

    // Relacionamentos
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Post> posts;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Availability> availabilities;

    @OneToMany(mappedBy = "usuario1", cascade = CascadeType.ALL)
    @JsonManagedReference("usuario1")
    private List<Friendship> friendshipsAsUser1;

    @OneToMany(mappedBy = "usuario2", cascade = CascadeType.ALL)
    @JsonManagedReference("usuario2")
    private List<Friendship> friendshipsAsUser2;

    @OneToMany(mappedBy = "remetente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference("remetente")
    private List<Invitation> sentInvitations;

    @OneToMany(mappedBy = "destinatario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference("destinatario")
    private List<Invitation> receivedInvitations;

}
