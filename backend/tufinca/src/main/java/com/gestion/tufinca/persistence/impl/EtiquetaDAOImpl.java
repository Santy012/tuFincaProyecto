package com.gestion.tufinca.persistence.impl;

import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.persistence.IEtiquetaDAO;
import com.gestion.tufinca.repositories.IEtiquetaRepository;
import com.gestion.tufinca.models.enums.TipoEtiqueta;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class EtiquetaDAOImpl implements IEtiquetaDAO {

    private final IEtiquetaRepository etiquetaRepository;

    @Autowired
    public EtiquetaDAOImpl(IEtiquetaRepository etiquetaRepository) {
        this.etiquetaRepository = etiquetaRepository;
    }

    @Override
    public List<EtiquetaModel> getEtiquetas() {
        return etiquetaRepository.findAll();
    }

    @Override
    public List<EtiquetaModel> getEtiquetaByTipoEtiqueta(TipoEtiqueta tipoEtiqueta) {
        return etiquetaRepository.findAllByTipoEtiqueta(tipoEtiqueta);
    }

    @Override
    public Optional<EtiquetaModel> getEtiquetaById(Integer id) {
        return etiquetaRepository.findById(id);
    }

    @Override
    public void saveEtiqueta(EtiquetaModel etiqueta) {
        etiquetaRepository.save(etiqueta);
    }

    @Override
    public void deleteEtiquetaById(Integer id) {
        etiquetaRepository.deleteById(id);
    }
}