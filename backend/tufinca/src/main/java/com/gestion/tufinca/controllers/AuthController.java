package com.gestion.tufinca.controllers;

import java.util.Map;
import com.gestion.tufinca.config.JwtUtil;
import com.gestion.tufinca.controllers.dto.AuthDTO;
import com.gestion.tufinca.models.AdministradorModel;
import com.gestion.tufinca.services.IAdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final IAdministradorService administradorService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthController(
            IAdministradorService administradorService,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {
        this.administradorService = administradorService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }


    @PostMapping(path="/login")
    public ResponseEntity<?> loginAdministrador(@RequestBody AuthDTO authDTO) throws URISyntaxException {
        //acá va lógica de seguridad? encriptar? que la contraseña tenga minimos requirements? que el correo tenga un arroba valido?
        Optional<AdministradorModel> adminOptional = administradorService
                .getAdministradorByUsuario(authDTO.getUsuario());

        if (adminOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }

        AdministradorModel admin = adminOptional.get();

        // Verificar contraseña
        if (passwordEncoder.matches(authDTO.getContraseña(), admin.getContraseña())) {
            String token = jwtUtil.generateToken(admin.getUsuario());
            return ResponseEntity.ok(Map.of("token", token)); // Devuelve token JWT en el futuro
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

}