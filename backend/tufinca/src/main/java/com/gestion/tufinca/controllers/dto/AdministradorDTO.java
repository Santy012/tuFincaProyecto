package com.gestion.tufinca.controllers.dto;

import com.gestion.tufinca.models.AdministradorModel;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdministradorDTO {
    private Integer id;
    private String nombre;
    private String usuario;
    private String correo;
    private String contraseña;
}
