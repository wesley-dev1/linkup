package com.seuempresa.linkup.controller;

import com.seuempresa.linkup.model.Post;
import com.seuempresa.linkup.model.User;
import com.seuempresa.linkup.service.PostService;
import com.seuempresa.linkup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import java.util.*;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    // Criar novo post
    @PostMapping("/criar/{userId}")
    public ResponseEntity<?> createPost(@PathVariable Integer userId, @RequestBody Post post) {
        Optional<User> optionalUser = userService.findById(userId);
        if (optionalUser.isPresent()) {
            post.setUsuario(optionalUser.get());
            Post novoPost = postService.createPost(post);
            return ResponseEntity.ok(novoPost);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }

    // Obter posts de um usuário
    @GetMapping("/usuario/{userId}")
    public ResponseEntity<?> getPostsByUser(@PathVariable Integer userId) {
        Optional<User> optionalUser = userService.findById(userId);
        if (optionalUser.isPresent()) {
            List<Post> posts = postService.getPostsByUser(optionalUser.get());
            return ResponseEntity.ok(posts);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }

    // Obter todos os posts (por exemplo, para o feed)
    @GetMapping("/feed")
    public ResponseEntity<?> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }
}
