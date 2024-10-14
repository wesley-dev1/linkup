package com.seuempresa.linkup.repository;

import com.seuempresa.linkup.model.Post;
import com.seuempresa.linkup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    // Encontrar posts por usuário
    List<Post> findByUsuario(User usuario);

    // Outros métodos personalizados, se necessário
}
