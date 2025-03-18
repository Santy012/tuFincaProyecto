package com.gestion.tufinca.persistence.impl;

import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.models.PropiedadModel;
import com.gestion.tufinca.persistence.IPropiedadDAO;
import com.gestion.tufinca.repositories.IPropiedadRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class PropiedadDAOImpl implements IPropiedadDAO {

    private final IPropiedadRepository propiedadRepository;

    @Autowired
    public PropiedadDAOImpl(IPropiedadRepository propiedadRepository) {
        this.propiedadRepository = propiedadRepository;
    }

    @Override
    public List<PropiedadModel> getPropiedades() {
        return propiedadRepository.findAll();
    }

    @Override
    public Optional<PropiedadModel> getPropiedadById(Integer id) {
        return propiedadRepository.findById(id);
    }

    @Override
    public void savePropiedad(PropiedadModel propiedad) {
        propiedadRepository.save(propiedad);
    }

    @Override
    public void deletePropiedadById(Integer id) {
        propiedadRepository.deleteById(id);
    }

    @Override
    public Optional<PropiedadModel> getPropiedadByCodigo(Integer codigo) {
        return propiedadRepository.findByCodigo(codigo);
    }

    @Override
    public List<PropiedadModel> getPropiedadesByEstado(String estado) {
        return propiedadRepository.findAllByEstado(estado);
    }

    @Override
    public List<PropiedadModel> getPropiedadesByUbicacion(String ubicacion) {
        return propiedadRepository.findAllByUbicacion(ubicacion);
    }

    @Override
    public List<PropiedadModel> getPropiedadesByEtiqueta(EtiquetaModel etiqueta) {
        return propiedadRepository.findAllByEtiqueta(etiqueta);
    }

    @Override
    public void deletePropiedadByCodigo(Integer codigo) {
        propiedadRepository.deleteByCodigo(codigo);
    }
}
