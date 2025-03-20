package com.gestion.tufinca.controllers;

import com.gestion.tufinca.controllers.dto.PropiedadDTO;
import com.gestion.tufinca.models.PropiedadModel;
import com.gestion.tufinca.services.IPropiedadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/{id}")
    public ResponseEntity<Optional<PropiedadDTO>> getPropiedadById(@PathVariable Integer id){
        Optional<PropiedadModel> propiedadOptional = propiedadService.getPropiedadById(id);
        return createPropiedadResponseEntity(propiedadOptional);
    }

    @PostMapping(path="/save")
    public ResponseEntity<?> savePropiedad(@RequestBody PropiedadDTO propiedadDTO) throws URISyntaxException {
        if(propiedadDTO.getCodigo() == null){
            return ResponseEntity.badRequest().build();
        }
        propiedadService.savePropiedad(buildPropiedad(propiedadDTO));
        return ResponseEntity.created(new URI("api/propiedad/save")).build();
    }

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<?> updatePropiedadById(@RequestBody PropiedadDTO request, @PathVariable("id") Integer id){
        Optional<PropiedadModel> propiedadOptional = propiedadService.getPropiedadById(id);
        if(propiedadOptional.isPresent()){
            PropiedadModel propiedadToUpdate = propiedadOptional.get();
            propiedadService.savePropiedad(setPropiedadUpdateValues(request, propiedadToUpdate));
            return ResponseEntity.ok("Propiedad con id " + id + " actualizado exitosamente.");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping(path="/delete/{id}")
    public ResponseEntity<?> deletePropiedadById(@PathVariable Integer id){
        if(id==null){
            propiedadService.deletePropiedadById(id);
            return ResponseEntity.ok("Propiedad con id " + id + " eliminada exitosamente");
        }
        return ResponseEntity.badRequest().build();
    }

    public PropiedadModel setPropiedadUpdateValues(PropiedadDTO propiedadDTO, PropiedadModel propiedadToUpdate){
        propiedadToUpdate.setTitulo(propiedadDTO.getTitulo());
        propiedadToUpdate.setCodigo(propiedadDTO.getCodigo());
        propiedadToUpdate.setDescripcion(propiedadDTO.getDescripcion());
        propiedadToUpdate.setEstado(propiedadDTO.getEstado());
        propiedadToUpdate.setUbicacion(propiedadDTO.getUbicacion());
        propiedadToUpdate.setAreaTotal(propiedadDTO.getAreaTotal());
        propiedadToUpdate.setAdministrador(propiedadDTO.getAdministrador());
        propiedadToUpdate.setAreaConst(propiedadDTO.getAreaConst());
        propiedadToUpdate.setMedias(propiedadDTO.getMedias());
        propiedadToUpdate.setMensajes(propiedadDTO.getMensajes());
        propiedadToUpdate.setEtiquetas(propiedadDTO.getEtiquetas());

        return propiedadToUpdate;
    }

    public PropiedadModel buildPropiedad(PropiedadDTO propiedadDTO){
        return PropiedadModel.builder()
                .id(propiedadDTO.getId())
                .titulo(propiedadDTO.getTitulo())
                .codigo(propiedadDTO.getCodigo())
                .descripcion(propiedadDTO.getDescripcion())
                .areaTotal(propiedadDTO.getAreaTotal())
                .areaConst(propiedadDTO.getAreaConst())
                .ubicacion(propiedadDTO.getUbicacion())
                .estado(propiedadDTO.getEstado())
                .administrador(propiedadDTO.getAdministrador())
                .etiquetas(propiedadDTO.getEtiquetas())
                .medias(propiedadDTO.getMedias())
                .mensajes(propiedadDTO.getMensajes())
                .build();
    }

    public ResponseEntity<Optional<PropiedadDTO>> createPropiedadResponseEntity(Optional<PropiedadModel> propiedadOptional){
        if(propiedadOptional.isPresent()){
            PropiedadModel propiedad = propiedadOptional.get();
            return ResponseEntity.ok(Optional.of(buildPropiedadDTO(propiedad)));
        }
        return ResponseEntity.notFound().build();
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
