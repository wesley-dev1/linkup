

package com.seuempresa.linkup.repository;

import com.seuempresa.linkup.model.Invitation;
import com.seuempresa.linkup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InvitationRepository extends JpaRepository<Invitation, Integer> {
    List<Invitation> findByDestinatarioAndStatus(User destinatario, String status);
    List<Invitation> findByRemetente(User remetente);

    List<Invitation> findByRemetenteAndStatusNotAndNotifiedFalse(User remetente, String status);

}
