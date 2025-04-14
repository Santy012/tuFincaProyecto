package com.gestion.tufinca.controllers.dto;

import com.gestion.tufinca.models.MediaModel;
import com.gestion.tufinca.models.PropiedadModel;
import com.gestion.tufinca.models.enums.Tipo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MediaDTO {
    private Integer id;
    private String url;
    private Tipo tipo;
    private PropiedadModel propiedad;
}
