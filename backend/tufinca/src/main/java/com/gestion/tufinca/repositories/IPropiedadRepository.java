package com.gestion.tufinca.repositories;

import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.models.PropiedadModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * save(T entity)	Guarda o actualiza una entidad en la base de datos.
 * saveAll(Iterable<T> entities)	Guarda una lista de entidades.
 * findById(ID id)	Busca una entidad por su ID.
 * existsById(ID id)	Verifica si existe una entidad con un ID específico.
 * findAll()	Recupera todas las entidades.
 * findAllById(Iterable<ID> ids)	Encuentra varias entidades por una lista de IDs.
 * count()	Retorna el número total de registros.
 * deleteById(ID id)	Elimina una entidad por su ID.
 * delete(T entity)	Elimina una entidad específica.
 * deleteAllById(Iterable<? extends ID> ids)	Elimina varias entidades por sus IDs.
 * deleteAll(Iterable<? extends T> entities)	Elimina un conjunto de entidades.
 * deleteAll()	Elimina todas las entidades de la base de datos.
 */

@Repository
public interface IPropiedadRepository extends JpaRepository<PropiedadModel, Integer> {
    Optional<PropiedadModel> findByCodigo(Integer codigo);

    List<PropiedadModel> findAllByEstado(String estado);

    List<PropiedadModel> findAllByUbicacion(String ubicacion);

    @Query("SELECT p FROM PropiedadModel p JOIN p.etiquetas e WHERE e = :etiqueta")
    List<PropiedadModel> findAllByEtiqueta(@Param("etiqueta") EtiquetaModel etiqueta);

    void deleteByCodigo(Integer codigo);
}
