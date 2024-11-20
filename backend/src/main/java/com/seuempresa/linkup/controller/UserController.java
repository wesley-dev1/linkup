package com.seuempresa.linkup.controller;

import com.seuempresa.linkup.model.User;
import com.seuempresa.linkup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import java.util.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // Registrar novo usuário
    @PostMapping("/registrar")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> userRequest) {
        String nome = userRequest.get("nome");
        String email = userRequest.get("email");
        String senha = userRequest.get("senha");

        // Validações básicas
        if (nome == null || email == null || senha == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nome, email e senha são obrigatórios.");
        }

        try {
            // Criação do objeto User
            User user = new User();
            user.setNome(nome);
            user.setEmail(email);
            user.setSenha(senha); // **ATENÇÃO**: Em produção, criptografe a senha com BCrypt.
            userService.registerUser(user);

            return ResponseEntity.ok("Usuário registrado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro ao registrar usuário: " + e.getMessage());
        }
    }

    // Endpoint de Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String senha = loginRequest.get("senha");

        if (email == null || senha == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email e senha são obrigatórios.");
        }

        Optional<User> userOptional = userService.authenticate(email, senha);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Map<String, Object> response = new HashMap<>();
            response.put("userId", user.getId());
            response.put("nome", user.getNome());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos.");
        }
    }


    // Buscar usuários (para adicionar amigos)
    @GetMapping("/search")
    public ResponseEntity<?> searchUsers(@RequestParam String query) {
        Iterable<User> users = userService.searchUsers(query);
        return ResponseEntity.ok(users);
    }

    // Obter detalhes do usuário
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUser(@PathVariable Integer userId) {
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }
}
