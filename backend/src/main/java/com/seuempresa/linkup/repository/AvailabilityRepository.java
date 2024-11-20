package com.seuempresa.linkup.repository;

import com.seuempresa.linkup.model.Availability;
import com.seuempresa.linkup.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AvailabilityRepository extends JpaRepository<Availability, Integer> {
    List<Availability> findByUsuario(User usuario);

    Optional<Availability> findByUsuarioAndDiaSemana(User usuario, String diaSemana);
}
