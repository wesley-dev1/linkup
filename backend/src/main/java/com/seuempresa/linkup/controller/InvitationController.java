// InvitationController.java

package com.seuempresa.linkup.controller;

import com.seuempresa.linkup.dto.InvitationDTO;
import com.seuempresa.linkup.dto.UserDTO;
import com.seuempresa.linkup.model.Invitation;
import com.seuempresa.linkup.model.User;
import com.seuempresa.linkup.service.InvitationService;
import com.seuempresa.linkup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/convites")
@CrossOrigin(origins = "http://localhost:3000")
public class InvitationController {

    @Autowired
    private InvitationService invitationService;

    @Autowired
    private UserService userService;

    // Enviar convite
    @PostMapping("/enviar")
    public ResponseEntity<?> sendInvitation(@RequestBody Map<String, Object> requestData) {
        Integer remetenteId = (Integer) requestData.get("remetenteId");
        Integer destinatarioId = (Integer) requestData.get("destinatarioId");
        String mensagem = (String) requestData.get("mensagem");
        String diaSemana = (String) requestData.get("diaSemana");
        String dataHoraConviteStr = (String) requestData.get("dataHoraConvite");

        Optional<User> remetenteOptional = userService.findById(remetenteId);
        Optional<User> destinatarioOptional = userService.findById(destinatarioId);

        if (remetenteOptional.isPresent() && destinatarioOptional.isPresent()) {
            Invitation invitation = new Invitation();
            invitation.setRemetente(remetenteOptional.get());
            invitation.setDestinatario(destinatarioOptional.get());
            invitation.setMensagem(mensagem);
            invitation.setDiaSemana(diaSemana);
            invitation.setDataHoraConvite(LocalDateTime.parse(dataHoraConviteStr));
            invitation.setStatus("PENDING");
            Invitation savedInvitation = invitationService.sendInvitation(invitation);

            // Converter para DTO
            InvitationDTO invitationDTO = convertToDTO(savedInvitation);

            return ResponseEntity.ok(invitationDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }

    // Aceitar convite
    @PostMapping("/aceitar/{invitationId}")
    public ResponseEntity<?> acceptInvitation(@PathVariable Integer invitationId) {
        Optional<Invitation> invitationOptional = invitationService.findById(invitationId);
        if (invitationOptional.isPresent()) {
            Invitation invitation = invitationService.acceptInvitation(invitationOptional.get());
            return ResponseEntity.ok(invitation);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Convite não encontrado");
        }
    }

    // Recusar convite
    @PostMapping("/recusar/{invitationId}")
    public ResponseEntity<?> declineInvitation(@PathVariable Integer invitationId, @RequestBody Map<String, String> request) {
        String justificativa = request.get("justificativa");
        Optional<Invitation> invitationOptional = invitationService.findById(invitationId);
        if (invitationOptional.isPresent()) {
            Invitation invitation = invitationService.declineInvitation(invitationOptional.get(), justificativa);
            return ResponseEntity.ok(invitation);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Convite não encontrado");
        }
    }

    // Obter convites pendentes para um usuário
    @GetMapping("/pendentes/{userId}")
    public ResponseEntity<?> getPendingInvitations(@PathVariable Integer userId) {
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isPresent()) {
            List<Invitation> invitations = invitationService.getPendingInvitations(userOptional.get());
            List<InvitationDTO> invitationDTOs = invitations.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(invitationDTOs);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }

    private InvitationDTO convertToDTO(Invitation invitation) {
        InvitationDTO dto = new InvitationDTO();
        dto.setId(invitation.getId());
        dto.setMensagem(invitation.getMensagem());
        dto.setDataHoraConvite(invitation.getDataHoraConvite());
        dto.setStatus(invitation.getStatus());
        dto.setJustificativaRecusa(invitation.getJustificativaRecusa());
        dto.setDiaSemana(invitation.getDiaSemana());

        UserDTO remetenteDTO = new UserDTO();
        remetenteDTO.setId(invitation.getRemetente().getId());
        remetenteDTO.setNome(invitation.getRemetente().getNome());
        dto.setRemetente(remetenteDTO);

        UserDTO destinatarioDTO = new UserDTO();
        destinatarioDTO.setId(invitation.getDestinatario().getId());
        destinatarioDTO.setNome(invitation.getDestinatario().getNome());
        dto.setDestinatario(destinatarioDTO);

        return dto;
    }
}
