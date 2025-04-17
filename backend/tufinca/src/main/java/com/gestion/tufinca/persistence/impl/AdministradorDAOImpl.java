package com.gestion.tufinca.persistence.impl;

import com.gestion.tufinca.models.AdministradorModel;
import com.gestion.tufinca.persistence.IAdministradorDAO;
import com.gestion.tufinca.repositories.IAdministradorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class AdministradorDAOImpl implements IAdministradorDAO {

    private final IAdministradorRepository administradorRepository;

    @Autowired
    public AdministradorDAOImpl(IAdministradorRepository administradorRepository) {
        this.administradorRepository = administradorRepository;
    }

    @Override
    public List<AdministradorModel> getAdministradores() {
        return administradorRepository.findAll();
    }

    @Override
    public Optional<AdministradorModel> getAdministradorById(Integer id) {
        return administradorRepository.findById(id);
    }

    @Override
    public Optional<AdministradorModel> getAdministradorByUsuario(String usuario) {
        return administradorRepository.findByUsuario(usuario);
    }

    @Override
    public AdministradorModel saveAdministrador(AdministradorModel administrador) {
        return administradorRepository.save(administrador);
    }

    @Override
    public void deleteAdministradorById(Integer id) {
        administradorRepository.deleteById(id);
    }
}
