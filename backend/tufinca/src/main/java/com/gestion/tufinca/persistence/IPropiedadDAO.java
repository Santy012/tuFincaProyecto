package com.gestion.tufinca.persistence;

import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.models.PropiedadModel;
import com.gestion.tufinca.models.enums.EstadoPropiedad;

import java.util.List;
import java.util.Optional;

/**
 * Metodo adicionales a agregar, definidos en el repositorio de las propiedades
 * Optional<PropiedadModel> findByCodigo(Integer codigo);
 * List<PropiedadModel> findAllByEstado(String estado);
 * List<PropiedadModel> findAllByUbicacion(String ubicacion);
 *
 * @Query("SELECT p FROM PropiedadModel p JOIN p.etiquetas e WHERE e = :etiqueta")
 * List<PropiedadModel> findAllByEtiqueta(@Param("etiqueta") EtiquetaModel etiqueta);
 * void deleteByCodigo(Integer codigo);
 */

public interface IPropiedadDAO {

    List<PropiedadModel> getPropiedades();

    Optional<PropiedadModel> getPropiedadById(Integer id);

    void savePropiedad(PropiedadModel propiedad);

    void deletePropiedadById(Integer id);

    Optional<PropiedadModel> getPropiedadByCodigo(Integer codigo);

    List<PropiedadModel> getPropiedadesByEstado(EstadoPropiedad estado);

    List<PropiedadModel> getPropiedadesByUbicacion(String ubicacion);

    List<PropiedadModel> getPropiedadesByEtiquetaId(Integer id);

    void deletePropiedadByCodigo(Integer codigo);


}