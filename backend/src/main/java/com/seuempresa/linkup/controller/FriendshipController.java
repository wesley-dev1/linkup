package com.seuempresa.linkup.controller;

import com.seuempresa.linkup.dto.FriendListDTO;
import com.seuempresa.linkup.dto.FriendshipDTO;
import com.seuempresa.linkup.model.Friendship;
import com.seuempresa.linkup.model.User;
import com.seuempresa.linkup.service.FriendshipService;
import com.seuempresa.linkup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/amizades")
@CrossOrigin(origins = "http://localhost:3000")
public class FriendshipController {

    @Autowired
    private FriendshipService friendshipService;

    @Autowired
    private UserService userService;


    // Enviar solicitação de amizade
    @PostMapping("/solicitar")
    public ResponseEntity<?> sendFriendRequest(@RequestParam Integer senderId, @RequestParam Integer receiverId) {
        Optional<User> senderOptional = userService.findById(senderId);
        Optional<User> receiverOptional = userService.findById(receiverId);

        if (senderOptional.isPresent() && receiverOptional.isPresent()) {
            Friendship friendship = friendshipService.sendFriendRequest(senderOptional.get(), receiverOptional.get());
            return ResponseEntity.ok(friendship);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }


    // Obter solicitações pendentes de amizade
    @GetMapping("/pendentes/{userId}")
    public ResponseEntity<?> getPendingFriendRequests(@PathVariable Integer userId) {
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Friendship> pendingRequests = friendshipService.getPendingRequests(user);

            // Converte para DTO
            List<FriendshipDTO> pendingRequestsDTO = pendingRequests.stream()
                    .map(FriendshipDTO::new)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(pendingRequestsDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }

    // Aceitar solicitação de amizade
    @PostMapping("/aceitar/{friendshipId}")
    public ResponseEntity<?> acceptFriendRequest(@PathVariable Integer friendshipId) {
        Optional<Friendship> friendshipOptional = friendshipService.findById(friendshipId);
        if (friendshipOptional.isPresent()) {
            Friendship friendship = friendshipService.acceptFriendRequest(friendshipOptional.get());
            return ResponseEntity.ok(friendship);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Solicitação de amizade não encontrada");
        }
    }

    // Obter amizades de um usuário
    @GetMapping("/usuario/{userId}")
    public ResponseEntity<?> getFriendships(@PathVariable Integer userId) {
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Friendship> friendships = friendshipService.getFriendships(user);

            // Converte para FriendListDTO
            List<FriendListDTO> friendsDTO = friendships.stream()
                    .map(friendship -> new FriendListDTO(friendship, user.getId()))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(friendsDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }

}
