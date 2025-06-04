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
    public ResponseEntity<?> sendFriendRequest(
            @RequestParam Integer senderId,
            @RequestParam Integer receiverId) {
        Optional<User> senderOpt   = userService.findById(senderId);
        Optional<User> receiverOpt = userService.findById(receiverId);

        if (senderOpt.isPresent() && receiverOpt.isPresent()) {
            Friendship friendship = friendshipService
                    .sendFriendRequest(senderOpt.get(), receiverOpt.get());
            return ResponseEntity.ok(friendship);
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Usuário não encontrado");
        }
    }

    // Obter solicitações pendentes de amizade (recebidas)
    @GetMapping("/pendentes/{userId}")
    public ResponseEntity<?> getPendingFriendRequests(@PathVariable Integer userId) {
        Optional<User> userOpt = userService.findById(userId);
        if (userOpt.isPresent()) {
            List<Friendship> pending = friendshipService
                    .getPendingRequests(userOpt.get());

            List<FriendshipDTO> dto = pending.stream()
                    .map(FriendshipDTO::new)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Usuário não encontrado");
        }
    }

    // Obter solicitações enviadas de amizade (respondidas)
    @GetMapping("/enviados/{userId}")
    public ResponseEntity<?> getSentFriendRequests(@PathVariable Integer userId) {
        Optional<User> userOpt = userService.findById(userId);
        if (userOpt.isPresent()) {
            List<Friendship> sent = friendshipService
                    .getSentRequests(userOpt.get());

            List<FriendshipDTO> dto = sent.stream()
                    .map(FriendshipDTO::new)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Usuário não encontrado");
        }
    }

    // Aceitar solicitação de amizade
    @PostMapping("/aceitar/{friendshipId}")
    public ResponseEntity<?> acceptFriendRequest(@PathVariable Integer friendshipId) {
        Optional<Friendship> friendshipOpt = friendshipService.findById(friendshipId);
        if (friendshipOpt.isPresent()) {
            Friendship updated = friendshipService
                    .acceptFriendRequest(friendshipOpt.get());
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Solicitação de amizade não encontrada");
        }
    }

    // Obter todas as amizades (já aceitas)
    @GetMapping("/usuario/{userId}")
    public ResponseEntity<?> getFriendships(@PathVariable Integer userId) {
        Optional<User> userOpt = userService.findById(userId);
        if (userOpt.isPresent()) {
            List<Friendship> friends = friendshipService
                    .getFriendships(userOpt.get());

            List<FriendListDTO> dto = friends.stream()
                    .map(f -> new FriendListDTO(f, userOpt.get().getId()))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Usuário não encontrado");
        }
    }

    @GetMapping("/unread/{userId}")
    public ResponseEntity<?> getUnreadFriendships(@PathVariable Integer userId) {
        Optional<User> userOpt = userService.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }

        List<Friendship> unread = friendshipService.getAcceptedAndUnnotified(userOpt.get());
        List<FriendshipDTO> dto = unread.stream()
                .map(FriendshipDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dto);
    }
}
