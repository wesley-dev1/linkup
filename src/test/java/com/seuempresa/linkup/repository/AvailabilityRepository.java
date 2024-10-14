package com.seuempresa.linkup.repository;

import com.seuempresa.linkup.model.Availability;
import com.seuempresa.linkup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {

    // Encontrar disponibilidade por usuário
    List<Availability> findByUsuario(User usuario);

    // Encontrar disponibilidade por usuário e dia da semana
    Optional<Availability> findByUsuarioAndDiaSemana(User usuario, String diaSemana);

    // Outros métodos personalizados, se necessário
}
