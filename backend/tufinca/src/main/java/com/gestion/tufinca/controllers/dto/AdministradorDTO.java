package com.gestion.tufinca.controllers.dto;

import com.gestion.tufinca.models.AdministradorModel;
import com.gestion.tufinca.models.MensajeModel;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AdministradorDTO {
    private Integer id;
    private String nombre;
    private String usuario;
    private String correo;
    private String contraseña;
    private List<MensajeModel> mensajes;
}
