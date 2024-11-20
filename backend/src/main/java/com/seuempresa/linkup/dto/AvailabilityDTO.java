package com.seuempresa.linkup.dto;

import com.seuempresa.linkup.model.Availability;
import lombok.Data;

@Data
public class AvailabilityDTO {
    private String diaSemana; // Dia da semana
    private Boolean disponivel; // Se está disponível ou não

    public AvailabilityDTO(Availability availability) {
        this.diaSemana = availability.getDiaSemana();
        this.disponivel = availability.getDisponivel();
    }
}
