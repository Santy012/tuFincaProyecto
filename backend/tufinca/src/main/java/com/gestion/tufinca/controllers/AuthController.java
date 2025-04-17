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


    @PostMapping(path="/login")// Asegúrate de que la ruta coincida con tu frontend
    public ResponseEntity<?> loginAdministrador(@RequestBody AuthDTO authDTO) {
        // Debug: Verificar datos recibidos
        System.out.println("Usuario recibido: " + authDTO.getUsuario());
        System.out.println("Contraseña recibida: " + authDTO.getContraseña());

        Optional<AdministradorModel> adminOptional = administradorService
                .getAdministradorByUsuario(authDTO.getUsuario());

        if (adminOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }

        AdministradorModel admin = adminOptional.get();

        // Debug: Verificar contraseñas
        System.out.println("Contraseña almacenada (hash): " + admin.getContraseña());
        System.out.println("Coincide?: " + passwordEncoder.matches(authDTO.getContraseña(), admin.getContraseña()));

        if (passwordEncoder.matches(authDTO.getContraseña(), admin.getContraseña())) {
            String token = jwtUtil.generateToken(admin.getUsuario());
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "usuario", admin.getUsuario(),
                    "nombre", admin.getNombre(), // Añade el nombre
                    "correo", admin.getCorreo()  // Añade el correo
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            if (jwtUtil.validateToken(token)) {
                // El token es válido, recupera la información del usuario
                String username = jwtUtil.getUsernameFromToken(token);
                Optional<AdministradorModel> adminOptional = administradorService.getAdministradorByUsuario(username);

                if (adminOptional.isPresent()) {
                    AdministradorModel admin = adminOptional.get();
                    return ResponseEntity.ok(Map.of(
                            "token", token,
                            "usuario", admin.getUsuario(),
                            "nombre", admin.getNombre(),
                            "correo", admin.getCorreo()
                    ));
                } else {
                    // El usuario asociado al token no se encontró (situación rara, pero manejable)
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
                }
            }
        }
        // El token no es válido
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}