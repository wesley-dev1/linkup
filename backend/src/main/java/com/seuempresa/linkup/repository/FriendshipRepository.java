package com.seuempresa.linkup.repository;

import com.seuempresa.linkup.model.Friendship;
import com.seuempresa.linkup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Integer> {
    List<Friendship> findByUsuario1OrUsuario2(User usuario1, User usuario2);

    Optional<Friendship> findByUsuario1AndUsuario2(User usuario1, User usuario2);

    List<Friendship> findByUsuario2AndStatus(User usuario2, String status);

}
