package com.gestion.tufinca.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gestion.tufinca.models.enums.*;
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
@Builder
@Entity
@Table(name = "mensaje")
public class MensajeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nombreCliente;

    @Column(nullable = false)
    private String apellidoCliente;

    private String celular;
    private String correo;

    @Column(columnDefinition = "TEXT")
    private String detalle;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gestion gestion;

    @ManyToOne
    @JoinColumn(name = "propiedad_id", foreignKey = @ForeignKey(name = "fk_mensaje_propiedad"))
    @JsonIgnore
    private PropiedadModel propiedad;

    @ManyToOne
    @JoinColumn(name = "administrador_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "fk_propiedad_administrador"))
    @JsonIgnore
    private AdministradorModel administrador;
}
