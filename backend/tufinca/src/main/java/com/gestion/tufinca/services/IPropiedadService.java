package com.gestion.tufinca.services;

import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.models.PropiedadModel;

import java.util.List;
import java.util.Optional;

public interface IPropiedadService {
    List<PropiedadModel> getPropiedades();

    Optional<PropiedadModel> getPropiedadById(Integer id);

    void savePropiedad(PropiedadModel propiedad);

    void deletePropiedadById(Integer id);

    Optional<PropiedadModel> getPropiedadByCodigo(Integer codigo);

    List<PropiedadModel> getPropiedadesByEstado(String estado);

    List<PropiedadModel> getPropiedadesByUbicacion(String ubicacion);

    List<PropiedadModel> getPropiedadesByEtiqueta(EtiquetaModel etiqueta);

    void deletePropiedadByCodigo(Integer codigo);
}
