package com.gestion.tufinca.repositories;

import com.gestion.tufinca.models.EtiquetaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IEtiquetaRepository extends JpaRepository<EtiquetaModel, Long> {
    void deleteByNombre(String nombre);
    List<EtiquetaModel> findAllByNombre(String nombre);
}
