package com.gestion.tufinca.persistence;

import com.gestion.tufinca.models.AdministradorModel;

import java.util.List;
import java.util.Optional;

public interface IAdministradorDAO {

    List<AdministradorModel> getAdministradores();

    Optional<AdministradorModel> getAdministradorById(Integer id);

    Optional<AdministradorModel> getAdministradorByUsuario(String usuario);

    AdministradorModel saveAdministrador(AdministradorModel administrador);

    void deleteAdministradorById(Integer id);
}