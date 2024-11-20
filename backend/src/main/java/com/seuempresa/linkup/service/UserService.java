package com.seuempresa.linkup.service;

import com.seuempresa.linkup.model.User;
import com.seuempresa.linkup.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Registrar novo usuário
    public User registerUser(User user) {
        user.setDataCadastro(LocalDate.now());
        return userRepository.save(user);
    }

    // Autenticar usuário
    public Optional<User> authenticate(String email, String senha) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getSenha().equals(senha)) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }

    public Iterable<User> searchUsers(String query) {
        return userRepository.findByNomeContainingIgnoreCase(query);
    }
}
