package com.gestion.tufinca.services;

import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.models.PropiedadModel;
import com.gestion.tufinca.models.enums.EstadoPropiedad;

import java.util.List;
import java.util.Optional;

public interface IPropiedadService {
    List<PropiedadModel> getPropiedades();

    Optional<PropiedadModel> getPropiedadById(Integer id);

    PropiedadModel savePropiedad(PropiedadModel propiedad);

    void deletePropiedadById(Integer id);

    Optional<PropiedadModel> getPropiedadByCodigo(Integer codigo);

    List<PropiedadModel> getPropiedadesByEstado(EstadoPropiedad estado);

    List<PropiedadModel> getPropiedadesByUbicacion(String ubicacion);

    List<PropiedadModel> getPropiedadesByEtiquetaId(Integer id);

    void deletePropiedadByCodigo(Integer codigo);
}
