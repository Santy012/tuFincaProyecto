package com.gestion.tufinca.services.impl;

import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.persistence.IEtiquetaDAO;
import com.gestion.tufinca.services.IEtiquetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        List<EtiquetaModel> Etiquetas = EtiquetaDAO.getEtiquetas();

        System.out.println("Etiquetas encontradas: " + Etiquetas.size());
        Etiquetas.forEach(p -> System.out.println("Etiqueta: " + p.getNombre()));

        return Etiquetas;
    }

    @Override
    public Optional<EtiquetaModel> getEtiquetaById(Integer id) {
        return EtiquetaDAO.getEtiquetaById(id);
    }

    @Override
    public void saveEtiqueta(EtiquetaModel Etiqueta) {
        EtiquetaDAO.saveEtiqueta(Etiqueta);
    }

    @Override
    public void deleteEtiquetaById(Integer id) {
        EtiquetaDAO.deleteEtiquetaById(id);
    }
}