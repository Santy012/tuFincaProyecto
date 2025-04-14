package com.gestion.tufinca.services.impl;

import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.models.PropiedadModel;
import com.gestion.tufinca.models.enums.EstadoPropiedad;
import com.gestion.tufinca.persistence.IPropiedadDAO;
import com.gestion.tufinca.services.IPropiedadService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropiedadServiceImpl implements IPropiedadService {

    private final IPropiedadDAO propiedadDAO;

    @Autowired
    public PropiedadServiceImpl(IPropiedadDAO propiedadDAO) {
        this.propiedadDAO = propiedadDAO;
    }

    @Override
    public List<PropiedadModel> getPropiedades() {
        List<PropiedadModel> propiedades = propiedadDAO.getPropiedades();

        System.out.println("Propiedades encontradas: " + propiedades.size());
        propiedades.forEach(p -> System.out.println("Propiedad: " + p.getTitulo()));

        return propiedades;
    }

    @Override
    public Optional<PropiedadModel> getPropiedadById(Integer id) {
        return propiedadDAO.getPropiedadById(id);
    }

    @Override
    public PropiedadModel savePropiedad(PropiedadModel propiedad) {
        return propiedadDAO.savePropiedad(propiedad);
    }

    @Override
    public void deletePropiedadById(Integer id) {
        propiedadDAO.deletePropiedadById(id);
    }

    @Override
    public Optional<PropiedadModel> getPropiedadByCodigo(String codigo) {
        return propiedadDAO.getPropiedadByCodigo(codigo);
    }

    @Override
    public List<PropiedadModel> getPropiedadesByEstado(EstadoPropiedad estado) {
        return propiedadDAO.getPropiedadesByEstado(estado);
    }

    @Override
    public List<PropiedadModel> getPropiedadesByUbicacion(String ubicacion) {
        return propiedadDAO.getPropiedadesByUbicacion(ubicacion);
    }

    @Override
    public List<PropiedadModel> getPropiedadesByEtiquetaId(Integer id) {
        return propiedadDAO.getPropiedadesByEtiquetaId(id);
    }

    @Override
    @Transactional
    public void deletePropiedadByCodigo(String codigo) {
        propiedadDAO.deletePropiedadByCodigo(codigo);
    }
}
