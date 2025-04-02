package com.gestion.tufinca.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import com.gestion.tufinca.models.enums.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "etiqueta")
public class EtiquetaModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoEtiqueta tipoEtiqueta;

    /**
     * mappedBy = "etiquetas"
     * Hace referencia al atributo en la entidad Propiedad donde se definió la relación ManyToMany.
     * Así aparece la variable de relacion en el PropiedadModel: private List<Etiqueta> etiquetas = new ArrayList<>();
     * El nombre de la variable es al que se le hace referencia en el mappedBy, en este caso se referencia a "etiquetas".
     */
    @ManyToMany(mappedBy = "etiquetas")
    @JsonIgnore
    private List<PropiedadModel> propiedades = new ArrayList<>();
}
