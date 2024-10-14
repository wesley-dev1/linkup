package com.seuempresa.linkup.repository;

import com.seuempresa.linkup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    // Encontrar usuários por nome (opcional)
    List<User> findByNomeContainingIgnoreCase(String nome);

    // Outros métodos personalizados, se necessário
}
