package com.gestion.tufinca.controllers;

import com.gestion.tufinca.controllers.dto.AdministradorDTO;
import com.gestion.tufinca.controllers.dto.PropiedadDTO;
import com.gestion.tufinca.models.AdministradorModel;
import com.gestion.tufinca.models.PropiedadModel;
import com.gestion.tufinca.services.IAdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admins")
public class AdministradorController {

    private final IAdministradorService administradorService;

    @Autowired
    public AdministradorController(IAdministradorService administradorService) {
        this.administradorService = administradorService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<AdministradorDTO>> getAdministradores() {
        List<AdministradorDTO> administradorList = administradorService.getAdministradores()
                .stream()
                .map(this::buildAdministradorDTO)
                .toList();
        return ResponseEntity.ok(administradorList); // Siempre devuelve 200 OK con la lista
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<AdministradorDTO>> getAdministradorById(@PathVariable Integer id){
        Optional<AdministradorModel> administradorOptional = administradorService.getAdministradorById(id);
        return createAdministradorResponseEntity(administradorOptional);
    }

    @PostMapping(path="/save")
    public ResponseEntity<?> saveAdministrador(@RequestBody AdministradorDTO administradorDTO) throws URISyntaxException {
        //que el response de save en servicio llegue acá
        administradorService.registrarAdministrador(buildAdministrador(administradorDTO));
        return ResponseEntity.created(new URI("api/administrador/save")).build();
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }


    @PutMapping(path="/update/{id}")
    public ResponseEntity<?> updateAdministrador(@RequestBody AdministradorDTO request, @PathVariable("id") Integer id){
        Optional<AdministradorModel> administradorOptional = administradorService.getAdministradorById(id);
        if(administradorOptional.isPresent()){
            AdministradorModel administradorToUpdate = administradorOptional.get();
            AdministradorModel administradorActualizado = administradorService.saveAdministrador(setAdministradorUpdateValues(request, administradorToUpdate));
            AdministradorDTO administradorActualizadoDTO = buildAdministradorDTO(administradorActualizado);
            return ResponseEntity.ok(administradorActualizadoDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping(path="/delete/{id}")
    public ResponseEntity<?> deleteAdministradorById(@PathVariable Integer id){
        if(id!=null){
            administradorService.deleteAdministradorById(id);
            return ResponseEntity.ok("Administrador con id " + id + " eliminado exitosamente");
        }
        return ResponseEntity.badRequest().build();
    }

    public AdministradorModel setAdministradorUpdateValues(AdministradorDTO administradorDTO, AdministradorModel administradorToUpdate){
        administradorToUpdate.setNombre(administradorDTO.getNombre());
        administradorToUpdate.setUsuario(administradorDTO.getUsuario());
        administradorToUpdate.setCorreo(administradorDTO.getCorreo());
        administradorToUpdate.setContraseña(administradorDTO.getContraseña());
        administradorToUpdate.getMensajes().clear();
        administradorToUpdate.getMensajes().addAll(administradorDTO.getMensajes());
        return administradorToUpdate;
    }

    public AdministradorModel buildAdministrador(AdministradorDTO administradorDTO){
        return AdministradorModel.builder()
                .id(administradorDTO.getId())
                .nombre(administradorDTO.getNombre())
                .usuario(administradorDTO.getUsuario())
                .correo(administradorDTO.getCorreo())
                .contraseña(administradorDTO.getContraseña())
                .mensajes(administradorDTO.getMensajes())
                .build();
    }

    public ResponseEntity<Optional<AdministradorDTO>> createAdministradorResponseEntity(Optional<AdministradorModel> administradorOptional){
        if(administradorOptional.isPresent()){
            AdministradorModel administrador = administradorOptional.get();
            return ResponseEntity.ok(Optional.of(buildAdministradorDTO(administrador)));
        }
        return ResponseEntity.notFound().build();
    }

    public AdministradorDTO buildAdministradorDTO(AdministradorModel administrador) {
        return AdministradorDTO.builder()
                .id(administrador.getId())
                .nombre(administrador.getNombre())
                .usuario(administrador.getUsuario())
                .correo(administrador.getCorreo())
                .contraseña(administrador.getContraseña())
                .mensajes(administrador.getMensajes())
                .build();
    }
}