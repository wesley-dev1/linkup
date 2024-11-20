package com.seuempresa.linkup.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InvitationDTO {
    private Integer id;
    private String mensagem;
    private LocalDateTime dataHoraConvite;
    private String status;
    private String justificativaRecusa;
    private String diaSemana;
    private UserDTO remetente;
    private UserDTO destinatario;
}
