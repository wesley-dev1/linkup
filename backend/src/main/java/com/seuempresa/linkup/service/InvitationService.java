
package com.seuempresa.linkup.service;
import java.util.stream.Collectors;
import com.seuempresa.linkup.model.Invitation;
import com.seuempresa.linkup.model.User;
import com.seuempresa.linkup.repository.InvitationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class InvitationService {

    @Autowired
    private InvitationRepository invitationRepository;

    public Invitation sendInvitation(Invitation invitation) {
        return invitationRepository.save(invitation);
    }

    public Optional<Invitation> findById(Integer id) {
        return invitationRepository.findById(id);
    }

    public Invitation acceptInvitation(Invitation invitation) {
        invitation.setStatus("ACCEPTED");
        return invitationRepository.save(invitation);
    }

    public Invitation declineInvitation(Invitation invitation, String justificativa) {
        invitation.setStatus("DECLINED");
        invitation.setJustificativaRecusa(justificativa);
        return invitationRepository.save(invitation);
    }

    public List<Invitation> getPendingInvitations(User user) {
        return invitationRepository.findByDestinatarioAndStatus(user, "PENDING");
    }

    public List<Invitation> getSentInvitations(User remetente) {
        return invitationRepository.findByRemetente(remetente).stream()
                .filter(inv -> !inv.getStatus().equals("PENDING"))
                .collect(Collectors.toList());
    }

    public List<Invitation> getUnnotifiedResponses(User remetente) {
        // busca no repo
        List<Invitation> list = invitationRepository
                .findByRemetenteAndStatusNotAndNotifiedFalse(remetente, "PENDING");
        // marca como notificado e salva
        list.forEach(inv -> inv.setNotified(true));
        invitationRepository.saveAll(list);
        return list;
    }
}