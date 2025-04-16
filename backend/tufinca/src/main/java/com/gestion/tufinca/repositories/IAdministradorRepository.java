package com.gestion.tufinca.repositories;

import com.gestion.tufinca.models.AdministradorModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IAdministradorRepository extends JpaRepository<AdministradorModel, Integer> {
    Optional<AdministradorModel> findByUsuario(String usuario);
}
