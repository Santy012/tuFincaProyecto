package com.gestion.tufinca.repositories;

import com.gestion.tufinca.models.AdministradorModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAdministradorRepository extends JpaRepository<AdministradorModel, Long> {

    // Guardar o actualizar un administrador (heredado de JpaRepository)
    void delete(AdministradorModel administrador);
}
