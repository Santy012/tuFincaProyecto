package com.gestion.tufinca.persistence;

import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.models.enums.TipoEtiqueta;

import java.util.List;
import java.util.Optional;

public interface IEtiquetaDAO {

    List<EtiquetaModel> getEtiquetas();

    List<EtiquetaModel> getEtiquetaByTipoEtiqueta(TipoEtiqueta tipoEtiqueta);

    Optional<EtiquetaModel> getEtiquetaById(Integer id);

    void saveEtiqueta(EtiquetaModel etiqueta);

    void deleteEtiquetaById(Integer id);

}