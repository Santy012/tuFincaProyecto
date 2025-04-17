package com.gestion.tufinca.controllers.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AuthDTO {
    private String usuario;
    private String contraseña;
}
