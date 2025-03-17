package com.gestion.tufinca.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
//Indica que la clave primaria es compuesta y está definida en la clase PropiedadEtiquetaId.
@IdClass(PropiedadEtiquetaId.class)
@Table(name = "propiedad_etiqueta")
public class PropiedadEtiquetaModel {
    @Id
    @ManyToOne
    @JoinColumn(name = "propiedad_id")
    private PropiedadModel propiedad;

    @Id
    @ManyToOne
    @JoinColumn(name = "etiqueta_id")
    private EtiquetaModel etiqueta;
}
