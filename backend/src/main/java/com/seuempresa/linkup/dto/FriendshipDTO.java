package com.seuempresa.linkup.dto;

import com.seuempresa.linkup.model.Friendship;
import lombok.Data;

@Data
public class FriendshipDTO {
    private Integer id;
    private String status;
    private String dataAmizade;
    private String solicitanteNome; // Nome de quem enviou a solicitação
    private String destinatarioNome; // Nome de quem recebeu a solicitação

    public FriendshipDTO(Friendship friendship) {
        this.id = friendship.getId();
        this.status = friendship.getStatus();
        this.dataAmizade = friendship.getDataAmizade().toString();
        this.solicitanteNome = friendship.getUsuario1().getNome(); // Usuario que enviou
        this.destinatarioNome = friendship.getUsuario2().getNome(); // Usuario que recebeu
    }
}
