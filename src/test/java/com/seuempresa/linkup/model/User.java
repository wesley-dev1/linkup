package com.seuempresa.linkup.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Column(unique = true, nullable = false)
    private String email;

    private String senha;

    private String fotoPerfil;

    private LocalDate dataCadastro;

    // Relacionamento com Publicações
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts;

    // Relacionamento com Disponibilidades
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Availability> disponibilidades;

    // Relacionamento com Amizades enviadas
    @OneToMany(mappedBy = "usuario1", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Friendship> amizadesEnviadas;

    // Relacionamento com Amizades recebidas
    @OneToMany(mappedBy = "usuario2", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Friendship> amizadesRecebidas;

    // Relacionamento de Favoritos
    @ManyToMany
    @JoinTable(
            name = "favorites",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "amigo_id")
    )
    private Set<User> favoritos;

    // Relacionamento de Bloqueios
    @ManyToMany
    @JoinTable(
            name = "blocks",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "bloqueado_id")
    )
    private Set<User> bloqueados;

    // Getters e Setters

    public User() {
    }

    // Construtores, getters e setters
    // ...

}
