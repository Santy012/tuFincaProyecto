package com.gestion.tufinca.models;

import java.io.Serializable;
import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor  // Constructor con todos los argumentos
@NoArgsConstructor   // Constructor sin argumentos
@Builder
public class PropiedadEtiquetaId implements Serializable {
    private Integer propiedad;  // Debe coincidir con la entidad PropiedadEtiqueta
    private Integer etiqueta;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PropiedadEtiquetaId that = (PropiedadEtiquetaId) o;
        return Objects.equals(propiedad, that.propiedad) &&
                Objects.equals(etiqueta, that.etiqueta);
    }

    @Override
    public int hashCode() {
        return Objects.hash(propiedad, etiqueta);
    }
}
