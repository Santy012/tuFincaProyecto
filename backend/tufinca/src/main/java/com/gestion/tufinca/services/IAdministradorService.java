package com.gestion.tufinca.services;

import com.gestion.tufinca.models.AdministradorModel;

import java.util.List;
import java.util.Optional;

public interface IAdministradorService {
    List<AdministradorModel> getAdministradores();

    Optional<AdministradorModel> getAdministradorById(Integer id);

    void saveAdministrador(AdministradorModel administrador);

    void deleteAdministradorById(Integer id);
}
