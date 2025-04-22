package com.gestion.tufinca.controllers.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AuthDTO {
    @JsonProperty("usuario")
    private String usuario;
    @JsonProperty("contrasena")
    private String contraseña;
}
