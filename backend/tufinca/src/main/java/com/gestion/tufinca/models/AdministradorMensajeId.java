package com.gestion.tufinca.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data  // Genera getters, setters, equals(), hashCode() y toString()
@AllArgsConstructor  // Constructor con todos los argumentos
@NoArgsConstructor   // Constructor sin argumentos
@Builder
public class AdministradorMensajeId implements Serializable {
    private Integer administrador;
    private Integer mensaje;
}
