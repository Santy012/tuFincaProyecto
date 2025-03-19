package com.gestion.tufinca.services.impl;

import com.gestion.tufinca.models.AdministradorModel;
import com.gestion.tufinca.persistence.IAdministradorDAO;
import com.gestion.tufinca.services.IAdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdministradorServiceImpl implements IAdministradorService {

    private final IAdministradorDAO AdministradorDAO;

    @Autowired
    public AdministradorServiceImpl(IAdministradorDAO AdministradorDAO) {
        this.AdministradorDAO = AdministradorDAO;
    }

    @Override
    public List<AdministradorModel> getAdministradores() {
        List<AdministradorModel> Administradores = AdministradorDAO.getAdministradores();

        System.out.println("Administradores encontradas: " + Administradores.size());
        Administradores.forEach(p -> System.out.println("Administrador: " + p.getNombre()));

        return Administradores;
    }

    @Override
    public Optional<AdministradorModel> getAdministradorById(Integer id) {
        return AdministradorDAO.getAdministradorById(id);
    }

    @Override
    public void saveAdministrador(AdministradorModel Administrador) {
        AdministradorDAO.saveAdministrador(Administrador);
    }

    @Override
    public void deleteAdministradorById(Integer id) {
        AdministradorDAO.deleteAdministradorById(id);
    }
}