package com.seuempresa.linkup.service;

import com.seuempresa.linkup.model.Friendship;
import com.seuempresa.linkup.model.User;

import com.seuempresa.linkup.repository.FriendshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class FriendshipService {



    @Autowired
    private FriendshipRepository friendshipRepository;

    public Friendship sendFriendRequest(User sender, User receiver) {
        Friendship friendship = new Friendship();
        friendship.setUsuario1(sender);
        friendship.setUsuario2(receiver);
        friendship.setStatus("PENDING");
        friendship.setDataAmizade(LocalDate.now());
        return friendshipRepository.save(friendship);
    }




    public Friendship acceptFriendRequest(Friendship friendship) {
        friendship.setStatus("ACCEPTED");
        return friendshipRepository.save(friendship);
    }

    public List<Friendship> getFriendships(User user) {
        List<Friendship> list = new ArrayList<>();
        list.addAll(friendshipRepository.findByUsuario1AndStatus(user, "ACCEPTED"));
        list.addAll(friendshipRepository.findByUsuario2AndStatus(user, "ACCEPTED"));
        return list;
    }

    public List<Friendship> getSentRequests(User sender) {
        // reutiliza o método que você já possui no repositório:
        return friendshipRepository
                .findByStatusAndUsuario1OrStatusAndUsuario2(
                        "ACCEPTED", sender,
                        "ACCEPTED", sender
                );
        // se quiser incluir os recusados, basta filtrar ou usar outro status
    }

    public Optional<Friendship> findById(Integer id) {
        return friendshipRepository.findById(id);
    }

    public List<Friendship> getPendingRequests(User user) {
        return friendshipRepository.findByUsuario2AndStatus(user, "PENDING");
    }

    public List<Friendship> getAcceptedAndUnnotified(User user) {
        // 1) busca no repositório
        List<Friendship> list = friendshipRepository.findAcceptedAndUnnotified(user);

        if (!list.isEmpty()) {
            // 2) marca todas como notificadas
            list.forEach(f -> f.setNotified(true));
            // 3) persiste as mudanças em lote
            friendshipRepository.saveAll(list);
        }

        return list;
    }
}
