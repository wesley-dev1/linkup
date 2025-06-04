package com.seuempresa.linkup.repository;

import org.springframework.data.repository.query.Param;
import com.seuempresa.linkup.model.Friendship;
import com.seuempresa.linkup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Integer> {
    List<Friendship> findByUsuario1OrUsuario2(User usuario1, User usuario2);

    Optional<Friendship> findByUsuario1AndUsuario2(User usuario1, User usuario2);

    List<Friendship> findByUsuario2AndStatus(User usuario2, String status);

    List<Friendship> findByStatusAndUsuario1OrStatusAndUsuario2(String status1, User usuario1, String status2, User usuario2);

    List<Friendship> findByUsuario1AndStatus(User usuario1, String status);

    @Query("""
      SELECT f FROM Friendship f
       WHERE f.status = 'ACCEPTED'
         AND f.notified = false
         AND (f.usuario1 = :user OR f.usuario2 = :user)
    """)
    List<Friendship> findAcceptedAndUnnotified(@Param("user") User user);
}
