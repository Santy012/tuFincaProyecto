package com.gestion.tufinca.services;

import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.models.MediaModel;
import com.gestion.tufinca.models.enums.TipoEtiqueta;

import java.util.List;
import java.util.Optional;

public interface IEtiquetaService {
    List<EtiquetaModel> getEtiquetas();

    Optional<EtiquetaModel> getEtiquetaById(Integer id);

    List<EtiquetaModel> getEtiquetaByTipoEtiqueta(TipoEtiqueta tipoEtiqueta);

    EtiquetaModel saveEtiqueta(EtiquetaModel etiqueta);

    void deleteEtiquetaById(Integer id);
}
