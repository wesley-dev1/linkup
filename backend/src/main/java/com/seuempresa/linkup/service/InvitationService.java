
package com.seuempresa.linkup.service;

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
}