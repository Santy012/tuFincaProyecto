package com.gestion.tufinca.repositories;

import com.gestion.tufinca.models.AdministradorMensajeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IAdministradorMensajeRepository extends JpaRepository<AdministradorMensajeModel, Long> {

    void deleteByMensajeId(Long mensajeId);
}
