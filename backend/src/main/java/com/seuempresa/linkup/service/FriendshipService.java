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
        return friendshipRepository.findByStatusAndUsuario1OrStatusAndUsuario2("ACCEPTED", user, "ACCEPTED", user);
    }

    public Optional<Friendship> findById(Integer id) {
        return friendshipRepository.findById(id);
    }

    public List<Friendship> getPendingRequests(User user) {
        return friendshipRepository.findByUsuario2AndStatus(user, "PENDING");
    }

}
