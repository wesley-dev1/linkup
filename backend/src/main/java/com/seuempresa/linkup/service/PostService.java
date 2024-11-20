package com.seuempresa.linkup.service;

import com.seuempresa.linkup.model.Post;
import com.seuempresa.linkup.model.User;
import com.seuempresa.linkup.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public Post createPost(Post post) {
        post.setDataPublicacao(LocalDateTime.now());
        return postRepository.save(post);
    }

    public List<Post> getPostsByUser(User user) {
        return postRepository.findByUsuario(user);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
}
