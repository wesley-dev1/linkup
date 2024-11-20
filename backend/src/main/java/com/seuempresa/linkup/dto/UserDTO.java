package com.seuempresa.linkup.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Integer id;
    private String nome;

    // Getters e Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
}
