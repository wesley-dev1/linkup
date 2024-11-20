package com.seuempresa.linkup.dto;

import com.seuempresa.linkup.model.Friendship;
import com.seuempresa.linkup.model.Availability;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class FriendListDTO {
    private Integer id; // ID da amizade
    private String status; // Status da amizade (e.g., ACCEPTED)
    private String dataAmizade; // Data em que a amizade foi criada
    private Integer amigoId; // ID do amigo
    private String amigoNome; // Nome do amigo
    private String amigoEmail; // Email do amigo
    private List<AvailabilityDTO> availabilities; // Disponibilidade do amigo

    public FriendListDTO(Friendship friendship, Integer userId) {
        this.id = friendship.getId();
        this.status = friendship.getStatus();
        this.dataAmizade = friendship.getDataAmizade().toString();

        // Determina quem é o amigo baseado no userId
        if (friendship.getUsuario1().getId().equals(userId)) {
            this.amigoId = friendship.getUsuario2().getId();
            this.amigoNome = friendship.getUsuario2().getNome();
            this.amigoEmail = friendship.getUsuario2().getEmail();
            this.availabilities = friendship.getUsuario2().getAvailabilities()
                    .stream()
                    .map(AvailabilityDTO::new)
                    .collect(Collectors.toList());
        } else {
            this.amigoId = friendship.getUsuario1().getId();
            this.amigoNome = friendship.getUsuario1().getNome();
            this.amigoEmail = friendship.getUsuario1().getEmail();
            this.availabilities = friendship.getUsuario1().getAvailabilities()
                    .stream()
                    .map(AvailabilityDTO::new)
                    .collect(Collectors.toList());
        }
    }
}
