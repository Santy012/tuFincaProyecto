package com.gestion.tufinca.services.impl;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder; // Nuevo campo

    @Autowired
    public AdministradorServiceImpl(
            IAdministradorDAO AdministradorDAO,
            PasswordEncoder passwordEncoder
    ) {
        this.AdministradorDAO = AdministradorDAO;
        this.passwordEncoder = passwordEncoder;
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
    public Optional<AdministradorModel> getAdministradorByUsuario(String usuario) {
        return AdministradorDAO.getAdministradorByUsuario(usuario);
    }

    @Override
    public AdministradorModel saveAdministrador(AdministradorModel administrador) {
        //validar que el user sea unico
        //validar que contraseña sea mayor de 4 y menor que 30
        String contraseñaEncriptada = passwordEncoder.encode(administrador.getContraseña());
        administrador.setContraseña(contraseñaEncriptada);
        return AdministradorDAO.saveAdministrador(administrador);
    }

    @Override
    public void deleteAdministradorById(Integer id) {
        AdministradorDAO.deleteAdministradorById(id);
    }
}