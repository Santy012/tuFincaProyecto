package com.gestion.tufinca.controllers.dto;

import com.gestion.tufinca.models.enums.Gestion;
import lombok.Builder;
import lombok.Data;
import java.time.ZonedDateTime;

@Data
@Builder
public class MensajeDTO {
    private Integer id;
    private String nombreCliente;
    private String apellidoCliente;
    private String celular;
    private String correo;
    private String detalle;
    private Gestion gestion;
    private ZonedDateTime fecha;
}
