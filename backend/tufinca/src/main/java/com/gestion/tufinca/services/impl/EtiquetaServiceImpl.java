package com.gestion.tufinca.services.impl;

import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.persistence.IEtiquetaDAO;
import com.gestion.tufinca.services.IEtiquetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gestion.tufinca.models.enums.TipoEtiqueta;

import java.util.List;
import java.util.Optional;

@Service
public class EtiquetaServiceImpl implements IEtiquetaService {

    private final IEtiquetaDAO EtiquetaDAO;

    @Autowired
    public EtiquetaServiceImpl(IEtiquetaDAO EtiquetaDAO) {
        this.EtiquetaDAO = EtiquetaDAO;
    }

    @Override
    public List<EtiquetaModel> getEtiquetas() {
        return EtiquetaDAO.getEtiquetas();
    }

    @Override
    public Optional<EtiquetaModel> getEtiquetaById(Integer id) {
        return EtiquetaDAO.getEtiquetaById(id);
    }

    @Override
    public List<EtiquetaModel> getEtiquetaByTipoEtiqueta(TipoEtiqueta tipoEtiqueta) {
        return EtiquetaDAO.getEtiquetaByTipoEtiqueta(tipoEtiqueta);
    }

    @Override
    public EtiquetaModel saveEtiqueta(EtiquetaModel Etiqueta) {
        return EtiquetaDAO.saveEtiqueta(Etiqueta);
    }

    @Override
    public void deleteEtiquetaById(Integer id) {
        EtiquetaDAO.deleteEtiquetaById(id);
    }
}