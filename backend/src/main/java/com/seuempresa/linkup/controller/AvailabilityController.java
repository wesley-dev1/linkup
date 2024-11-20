package com.seuempresa.linkup.controller;

import com.seuempresa.linkup.model.Availability;
import com.seuempresa.linkup.model.User;
import com.seuempresa.linkup.service.AvailabilityService;
import com.seuempresa.linkup.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

import java.util.*;

@RestController
@RequestMapping("/api/disponibilidade")
@CrossOrigin(origins = "http://localhost:3000")
public class AvailabilityController {

    @Autowired
    private AvailabilityService availabilityService;

    @Autowired
    private UserService userService;

    // Obter disponibilidade do usuário
    @GetMapping("/usuario/{userId}")
    public ResponseEntity<?> getAvailabilities(@PathVariable Integer userId) {
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isPresent()) {
            List<Availability> availabilities = availabilityService.getAvailabilitiesByUser(userOptional.get());
            return ResponseEntity.ok(availabilities);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }

    // Definir disponibilidade do usuário
    @PostMapping("/definir")
    public ResponseEntity<?> setAvailability(@RequestParam Integer userId, @RequestParam String diaSemana, @RequestParam Boolean disponivel) {
        Optional<User> userOptional = userService.findById(userId);
        if (userOptional.isPresent()) {
            Availability availability = availabilityService.setAvailability(userOptional.get(), diaSemana, disponivel);
            return ResponseEntity.ok(availability);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }
}
