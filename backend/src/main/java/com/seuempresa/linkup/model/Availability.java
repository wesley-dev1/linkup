package com.seuempresa.linkup.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@NoArgsConstructor
@Table(name = "availabilities", schema = "estagio2",
        uniqueConstraints = @UniqueConstraint(columnNames = {"usuario_id", "dia_semana"}))
public class Availability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "dia_semana")
    private String diaSemana;

    private Boolean disponivel;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    @JsonBackReference
    private User usuario;

}
