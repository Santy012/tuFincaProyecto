package com.gestion.tufinca.persistence;

import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.models.PropiedadModel;
import com.gestion.tufinca.models.enums.EstadoPropiedad;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

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

    Page<PropiedadModel> getAllPropiedadesPaginated(Pageable pageable);

    Optional<PropiedadModel> getPropiedadById(Integer id);

    PropiedadModel savePropiedad(PropiedadModel propiedad);

    void deletePropiedadById(Integer id);

    Optional<PropiedadModel> getPropiedadByCodigo(String codigo);

    List<PropiedadModel> getPropiedadesByEstado(EstadoPropiedad estado);

    List<PropiedadModel> getPropiedadesByUbicacion(String ubicacion);

    List<PropiedadModel> getPropiedadesByEtiquetaId(Integer id);

    void deletePropiedadByCodigo(String codigo);

    Page<PropiedadModel> getPropiedadesPaginated(Specification<PropiedadModel> spec, Pageable pageable);
}