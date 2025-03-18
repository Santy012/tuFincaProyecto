package com.gestion.tufinca.persistence;

import com.gestion.tufinca.models.EtiquetaModel;

import java.util.List;
import java.util.Optional;

public interface IEtiquetaDAO {

    List<EtiquetaModel> getEtiquetas();

    Optional<EtiquetaModel> getEtiquetaById(Integer id);

    void saveEtiqueta(EtiquetaModel etiqueta);

    void deleteEtiquetaById(Integer id);

}