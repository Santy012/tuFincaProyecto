package com.gestion.tufinca.controllers.dto;

import com.gestion.tufinca.models.AdministradorModel;
import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.models.MediaModel;
import com.gestion.tufinca.models.MensajeModel;
import com.gestion.tufinca.models.enums.EstadoPropiedad;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class PropiedadDTO {
    private Integer id;
    private String titulo;
    private Integer codigo;
    private String descripcion;
    private Float areaTotal;
    private Float areaConst;
    private String ubicacion;
    private EstadoPropiedad estado;
    private AdministradorModel administrador;
    private List<EtiquetaModel> etiquetas;
    private List<MediaModel> medias;
    private List<MensajeModel> mensajes;
}
