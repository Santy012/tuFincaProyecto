package com.gestion.tufinca.models;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data  // Genera getters, setters, equals(), hashCode() y toString()
@AllArgsConstructor  // Constructor con todos los argumentos
@NoArgsConstructor   // Constructor sin argumentos
@Builder
public class PropiedadEtiquetaId implements Serializable {
    private Long propiedad;  // Debe coincidir con la entidad PropiedadEtiqueta
    private Long etiqueta;
}
