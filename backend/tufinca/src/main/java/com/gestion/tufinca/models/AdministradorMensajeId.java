package com.gestion.tufinca.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@AllArgsConstructor  // Constructor con todos los argumentos
@NoArgsConstructor   // Constructor sin argumentos
@Builder
public class AdministradorMensajeId implements Serializable {
    private Integer administrador;
    private Integer mensaje;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AdministradorMensajeId that = (AdministradorMensajeId) o;
        return Objects.equals(administrador, that.administrador) &&
                Objects.equals(mensaje, that.mensaje);
    }

    @Override
    public int hashCode() {
        return Objects.hash(administrador, mensaje);
    }
}
