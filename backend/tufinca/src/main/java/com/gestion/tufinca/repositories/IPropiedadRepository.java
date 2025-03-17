package com.gestion.tufinca.repositories;

import com.gestion.tufinca.models.PropiedadModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IPropiedadRepository extends JpaRepository<PropiedadModel, Long> {

    // Guardar una propiedad (ya lo hereda de JpaRepository, no es necesario definirlo)
    Optional<PropiedadModel> findByCodigo(Integer codigo);
    List<PropiedadModel> findAllByEstado(String estado);
    void deleteByCodigo(Integer codigo);
}
