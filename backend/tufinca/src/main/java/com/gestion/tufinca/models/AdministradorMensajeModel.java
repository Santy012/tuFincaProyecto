package com.gestion.tufinca.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "administradormensaje")
@IdClass(AdministradorMensajeId.class)
public class AdministradorMensajeModel {
    @Id
    @ManyToOne
    @JoinColumn(name = "administrador_id")
    @JsonIgnore
    private AdministradorModel administrador;

    @Id
    @ManyToOne
    @JoinColumn(name = "mensaje_id")
    @JsonIgnore
    private MensajeModel mensaje;

}
