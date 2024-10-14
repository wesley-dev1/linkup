package com.seuempresa.linkup.repository;

import com.seuempresa.linkup.model.Friendship;
import com.seuempresa.linkup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {

    // Encontrar amizades de um usuário
    List<Friendship> findByUsuario1OrUsuario2(User usuario1, User usuario2);

    // Encontrar amizade específica entre dois usuários
    Optional<Friendship> findByUsuario1AndUsuario2(User usuario1, User usuario2);

    // Outros métodos personalizados, se necessário
}
