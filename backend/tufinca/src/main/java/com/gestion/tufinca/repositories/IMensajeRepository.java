package com.gestion.tufinca.repositories;

import com.gestion.tufinca.models.MensajeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IMensajeRepository extends JpaRepository<MensajeModel, Long> {
    List<MensajeModel> findAllByGestion(String gestion);
}
