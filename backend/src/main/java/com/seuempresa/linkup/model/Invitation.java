package com.seuempresa.linkup.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.seuempresa.linkup.model.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;


@Entity
@Data
@NoArgsConstructor
@Table(name = "invitations", schema = "estagio2")
public class Invitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String mensagem;

    private LocalDateTime dataHoraConvite;

    private String status; // PENDING, ACCEPTED, DECLINED

    @Column(name = "justificativa_recusa")
    private String justificativaRecusa;

    @Column(nullable = false)
    private Boolean notified = false;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "remetente_id", nullable = false)
    @JsonBackReference("remetente")
    private User remetente;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "destinatario_id", nullable = false)
    @JsonBackReference("destinatario")
    private User destinatario;

    @Column(name = "dia_semana")
    private String diaSemana;
}
