package com.gestion.tufinca.persistence.impl;

import com.fasterxml.jackson.databind.annotation.JsonAppend;
import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.models.PropiedadModel;
import com.gestion.tufinca.models.enums.EstadoPropiedad;
import com.gestion.tufinca.persistence.IPropiedadDAO;
import com.gestion.tufinca.repositories.IPropiedadRepository;

import com.gestion.tufinca.services.IPropiedadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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
    public Page<PropiedadModel> getAllPropiedadesPaginated(Pageable pageable) {
        return propiedadRepository.findAll(pageable);
    }

    @Override
    public Optional<PropiedadModel> getPropiedadById(Integer id) {
        return propiedadRepository.findById(id);
    }

    @Override
    public PropiedadModel savePropiedad(PropiedadModel propiedad) {
        return propiedadRepository.save(propiedad);
    }

    @Override
    public void deletePropiedadById(Integer id) {
        propiedadRepository.deleteById(id);
    }

    @Override
    public Optional<PropiedadModel> getPropiedadByCodigo(String codigo) {
        return propiedadRepository.findByCodigo(codigo);
    }

    @Override
    public List<PropiedadModel> getPropiedadesByEstado(EstadoPropiedad estado) {
        return propiedadRepository.findAllByEstado(estado);
    }

    @Override
    public List<PropiedadModel> getPropiedadesByUbicacion(String ubicacion) {
        return propiedadRepository.findAllByUbicacion(ubicacion);
    }

    @Override
    public List<PropiedadModel> getPropiedadesByEtiquetaId(Integer id) {
        return propiedadRepository.findAllByEtiquetaId(id);
    }

    @Override
    public void deletePropiedadByCodigo(String codigo) {
        propiedadRepository.deleteByCodigo(codigo);
    }

    @Override
    public Page<PropiedadModel> getPropiedadesPaginated(Specification<PropiedadModel> spec, Pageable pageable) {
        return propiedadRepository.findAll(spec, pageable);
    }
}
