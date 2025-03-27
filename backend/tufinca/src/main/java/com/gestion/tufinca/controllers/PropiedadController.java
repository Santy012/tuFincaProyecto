package com.gestion.tufinca.controllers;

import com.gestion.tufinca.controllers.dto.PropiedadDTO;
import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.models.PropiedadModel;
import com.gestion.tufinca.models.enums.EstadoPropiedad;
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
        if(id!=null){
            propiedadService.deletePropiedadById(id);
            return ResponseEntity.ok("Propiedad con id " + id + " eliminada exitosamente");
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<Optional<PropiedadDTO>> getPropiedadByCodigo(@PathVariable Integer codigo){
        Optional<PropiedadModel> propiedadOptional = propiedadService.getPropiedadByCodigo(codigo);
        return createPropiedadResponseEntity(propiedadOptional);
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<PropiedadDTO>> getPropiedadesByEstado(@PathVariable EstadoPropiedad estado) {
        List<PropiedadDTO> propiedadList = propiedadService.getPropiedadesByEstado(estado)
                .stream()
                .map(this::buildPropiedadDTO)
                .toList();
        return ResponseEntity.ok(propiedadList); // Siempre devuelve 200 OK con la lista
    }

    @GetMapping("/ubicacion/{ubicacion}")
    public ResponseEntity<List<PropiedadDTO>> getPropiedadesByUbicacion(@PathVariable String ubicacion) {
        List<PropiedadDTO> propiedadList = propiedadService.getPropiedadesByUbicacion(ubicacion)
                .stream()
                .map(this::buildPropiedadDTO)
                .toList();
        return ResponseEntity.ok(propiedadList); // Siempre devuelve 200 OK con la lista
    }

    @GetMapping("/etiqueta/{id}")
    public ResponseEntity<List<PropiedadDTO>> getPropiedadesByEtiquetaId(@PathVariable Integer id) {
        List<PropiedadDTO> propiedadList = propiedadService.getPropiedadesByEtiquetaId(id)
                .stream()
                .map(this::buildPropiedadDTO)
                .toList();
        return ResponseEntity.ok(propiedadList); // Siempre devuelve 200 OK con la lista
    }

    @DeleteMapping(path="/delete/codigo/{codigo}")
    public ResponseEntity<?> deletePropiedadByCodigo(@PathVariable Integer codigo){
        if(codigo!=null){
            propiedadService.deletePropiedadByCodigo(codigo);
            return ResponseEntity.ok("Propiedad con codigo " + codigo + " eliminada exitosamente");
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
        propiedadToUpdate.getMedias().clear();
        propiedadToUpdate.getMedias().addAll(propiedadDTO.getMedias());
        propiedadToUpdate.getMensajes().clear();
        propiedadToUpdate.getMensajes().addAll(propiedadDTO.getMensajes());
        propiedadToUpdate.getEtiquetas().clear();
        propiedadToUpdate.getEtiquetas().addAll(propiedadDTO.getEtiquetas());

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
