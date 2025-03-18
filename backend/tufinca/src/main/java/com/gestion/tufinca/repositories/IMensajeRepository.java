package com.gestion.tufinca.repositories;

import com.gestion.tufinca.models.MensajeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface IMensajeRepository extends JpaRepository<MensajeModel, Integer> {
    List<MensajeModel> findAllByGestion(String gestion);
    List<MensajeModel> findAllByNombreCliente(String nombreCliente);
}
