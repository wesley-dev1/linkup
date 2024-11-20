package com.seuempresa.linkup.service;

import com.seuempresa.linkup.model.Availability;
import com.seuempresa.linkup.model.User;
import com.seuempresa.linkup.repository.AvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AvailabilityService {

    @Autowired
    private AvailabilityRepository availabilityRepository;

    public List<Availability> getAvailabilitiesByUser(User user) {
        return availabilityRepository.findByUsuario(user);
    }

    public Availability setAvailability(User user, String diaSemana, Boolean disponivel) {
        Optional<Availability> optionalAvailability = availabilityRepository.findByUsuarioAndDiaSemana(user, diaSemana);
        Availability availability;
        if (optionalAvailability.isPresent()) {
            availability = optionalAvailability.get();
            availability.setDisponivel(disponivel);
        } else {
            availability = new Availability();
            availability.setUsuario(user);
            availability.setDiaSemana(diaSemana);
            availability.setDisponivel(disponivel);
        }
        return availabilityRepository.save(availability);
    }
}
