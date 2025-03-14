package com.gestion.tufinca.repositories;

import com.gestion.tufinca.models.PropiedadModel
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Operaciones que realiza JpaRepository por defecto:
 * save(T entity)	Guarda una entidad (inserta si no existe, actualiza si ya existe).
 * saveAll(Iterable<T> entities)	Guarda varias entidades a la vez.
 * findById(ID id)	Busca una entidad por su ID. Retorna un Optional<T>.
 * existsById(ID id)	Retorna true si la entidad con ese ID existe.
 * findAll()	Retorna todas las entidades de la tabla.
 * findAllById(Iterable<ID> ids)	Retorna todas las entidades cuyos IDs estén en la lista dada.
 * count()	Retorna el número total de registros en la tabla.
 * deleteById(ID id)	Elimina la entidad con el ID especificado.
 * delete(T entity)	Elimina la entidad proporcionada.
 * deleteAllById(Iterable<ID> ids)	Elimina múltiples entidades por sus IDs.
 * deleteAll(Iterable<T> entities)	Elimina todas las entidades proporcionadas.
 * deleteAll()	Elimina todos los registros de la tabla.
 */

@Repository
public interface IPropiedadRepository extends JpaRepository<PropiedadModel, Integer> {
}