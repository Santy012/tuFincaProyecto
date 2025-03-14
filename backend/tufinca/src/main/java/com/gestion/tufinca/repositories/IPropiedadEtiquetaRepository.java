package com.gestion.tufinca.repositories;

import com.gestion.tufinca.models.PropiedadEtiquetaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPropiedadEtiquetaRepository extends JpaRepository<PropiedadEtiquetaModel, Long> {

    // Guardar una propiedad-etiqueta (heredado de JpaRepository)
    void deleteByPrimary(Long primary);
    void delete(PropiedadEtiquetaModel propiedadEtiqueta);
}
