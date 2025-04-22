package com.gestion.tufinca.repositories;

import com.gestion.tufinca.models.EtiquetaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.gestion.tufinca.models.enums.TipoEtiqueta;

import java.util.List;

@Repository
public interface IEtiquetaRepository extends JpaRepository<EtiquetaModel, Integer> {
    void deleteByNombre(String nombre);

    List<EtiquetaModel> findAllByTipoEtiqueta(TipoEtiqueta tipoEtiqueta);

    List<EtiquetaModel> findAllByNombre(String nombre);
}
