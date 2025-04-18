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
        return AdministradorDAO.saveAdministrador(administrador);
    }

    public AdministradorModel registrarAdministrador(AdministradorModel administrador) {

        String contraseña = administrador.getContraseña();

        if (contraseña == null || contraseña.length() < 4 || contraseña.length() > 30) {
            throw new IllegalArgumentException("La contraseña debe tener entre 5 y 30 caracteres.");
        }

        // Validar usuario único
        if (AdministradorDAO.getAdministradorByUsuario(administrador.getUsuario()).isPresent()) {
            throw new IllegalArgumentException("El nombre de usuario ya está en uso.");
        }

        // Validar correo único
        if (AdministradorDAO.getAdministradorByCorreo(administrador.getCorreo()).isPresent()) {
            throw new IllegalArgumentException("El correo ya está registrado.");
        }

        String contraseñaEncriptada = passwordEncoder.encode(administrador.getContraseña());
        administrador.setContraseña(contraseñaEncriptada);
        return AdministradorDAO.saveAdministrador(administrador);
    }

    @Override
    public void deleteAdministradorById(Integer id) {
        AdministradorDAO.deleteAdministradorById(id);
    }
}