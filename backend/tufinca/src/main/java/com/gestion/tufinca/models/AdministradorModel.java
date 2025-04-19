package com.gestion.tufinca.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "administrador")
public class AdministradorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String usuario;

    @Column(unique = true)
    private String correo;

    @Column(nullable = false)
    private String contraseña;

    @OneToMany(mappedBy = "administrador")
    @JsonIgnore
    private List<PropiedadModel> propiedades = new ArrayList<>();

    @OneToMany(mappedBy = "administrador")
    @JsonIgnore
    private List<MensajeModel> mensajes = new ArrayList<>();
}
