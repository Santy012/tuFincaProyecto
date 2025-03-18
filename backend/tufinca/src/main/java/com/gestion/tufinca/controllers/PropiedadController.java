package com.gestion.tufinca.controllers;

import com.gestion.tufinca.controllers.dto.PropiedadDTO;
import com.gestion.tufinca.models.PropiedadModel;
import com.gestion.tufinca.services.IPropiedadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/propiedades")
public class PropiedadController {

    private final IPropiedadService propiedadService;

    @Autowired
    public PropiedadController(IPropiedadService propiedadService) {
        this.propiedadService = propiedadService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<PropiedadDTO>> getPropiedades() {
        List<PropiedadDTO> propiedadList = propiedadService.getPropiedades()
                .stream()
                .map(this::buildPropiedadDTO)
                .toList();
        return ResponseEntity.ok(propiedadList); // Siempre devuelve 200 OK con la lista
    }

    public PropiedadDTO buildPropiedadDTO(PropiedadModel propiedad) {
        return PropiedadDTO.builder()
                .id(propiedad.getId())
                .titulo(propiedad.getTitulo())
                .codigo(propiedad.getCodigo())
                .descripcion(propiedad.getDescripcion())
                .areaTotal(propiedad.getAreaTotal())
                .areaConst(propiedad.getAreaConst())
                .ubicacion(propiedad.getUbicacion())
                .estado(propiedad.getEstado())
                .administrador(propiedad.getAdministrador())
                .etiquetas(propiedad.getEtiquetas())
                .medias(propiedad.getMedias())
                .mensajes(propiedad.getMensajes())
                .build();
    }


}
