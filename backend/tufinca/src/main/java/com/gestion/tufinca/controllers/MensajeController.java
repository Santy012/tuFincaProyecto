package com.gestion.tufinca.controllers;

import com.gestion.tufinca.controllers.dto.MensajeDTO;
import com.gestion.tufinca.models.MensajeModel;
import com.gestion.tufinca.models.enums.Gestion;
import com.gestion.tufinca.services.IMensajeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mensajes")
public class MensajeController {

    private final IMensajeService mensajeService;

    @Autowired
    public MensajeController(IMensajeService mensajeService) {
        this.mensajeService = mensajeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<MensajeDTO>> getMensajes() {
        List<MensajeDTO> mensajeList = mensajeService.getMensajes()
                .stream()
                .map(this::buildMensajeDTO)
                .toList();
        return ResponseEntity.ok(mensajeList); // Siempre devuelve 200 OK con la lista
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<MensajeDTO>> getMensajeById(@PathVariable Integer id){
        Optional<MensajeModel> mensajeOptional = mensajeService.getMensajeById(id);
        return createMensajeResponseEntity(mensajeOptional);
    }

    @PostMapping(path="/save")
    public ResponseEntity<?> saveMensaje(@RequestBody MensajeDTO mensajeDTO) throws URISyntaxException {
        mensajeService.saveMensaje(buildMensaje(mensajeDTO));
        return ResponseEntity.created(new URI("api/mensajes/save")).build();
    }

    @DeleteMapping(path="/delete/{id}")
    public ResponseEntity<?> deleteMensajeById(@PathVariable Integer id){
        if(id!=null){
            mensajeService.deleteMensajeById(id);
            return ResponseEntity.ok("Mensaje con id " + id + " eliminado exitosamente");
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/gestion/{gestion}")
    public ResponseEntity<List<MensajeDTO>> getMensajesByGestion(@PathVariable Gestion gestion) {
        List<MensajeDTO> mensajeList = mensajeService.getMensajesByGestion(gestion)
                .stream()
                .map(this::buildMensajeDTO)
                .toList();
        return ResponseEntity.ok(mensajeList); // Siempre devuelve 200 OK con la lista
    }

    @GetMapping("/nombreCliente/{nombreCliente}")
    public ResponseEntity<List<MensajeDTO>> getMensajesByNombre(@PathVariable String nombreCliente) {
        List<MensajeDTO> mensajeList = mensajeService.getMensajesByNombre(nombreCliente)
                .stream()
                .map(this::buildMensajeDTO)
                .toList();
        return ResponseEntity.ok(mensajeList); // Siempre devuelve 200 OK con la lista
    }

    public MensajeModel setMensajeUpdateValues(MensajeDTO mensajeDTO, MensajeModel mensajeToUpdate){
        mensajeToUpdate.setNombreCliente(mensajeDTO.getNombreCliente());
        mensajeToUpdate.setApellidoCliente(mensajeDTO.getApellidoCliente());
        mensajeToUpdate.setCelular(mensajeDTO.getCelular());
        mensajeToUpdate.setCorreo(mensajeDTO.getCorreo());
        mensajeToUpdate.setDetalle(mensajeDTO.getDetalle());
        mensajeToUpdate.setGestion(mensajeDTO.getGestion());
        return mensajeToUpdate;
    }

    public MensajeModel buildMensaje(MensajeDTO mensajeDTO){
        return MensajeModel.builder()
                .id(mensajeDTO.getId())
                .nombreCliente(mensajeDTO.getNombreCliente())
                .apellidoCliente(mensajeDTO.getApellidoCliente())
                .celular(mensajeDTO.getCelular())
                .correo(mensajeDTO.getCorreo())
                .detalle(mensajeDTO.getDetalle())
                .gestion(mensajeDTO.getGestion())
                .build();
    }

    public ResponseEntity<Optional<MensajeDTO>> createMensajeResponseEntity(Optional<MensajeModel> mensajeOptional){
        if(mensajeOptional.isPresent()){
            MensajeModel mensaje = mensajeOptional.get();
            return ResponseEntity.ok(Optional.of(buildMensajeDTO(mensaje)));
        }
        return ResponseEntity.notFound().build();
    }

    public MensajeDTO buildMensajeDTO(MensajeModel mensaje) {
        return MensajeDTO.builder()
                .id(mensaje.getId())
                .nombreCliente(mensaje.getNombreCliente())
                .apellidoCliente(mensaje.getApellidoCliente())
                .celular(mensaje.getCelular())
                .correo(mensaje.getCorreo())
                .detalle(mensaje.getDetalle())
                .gestion(mensaje.getGestion())
                .build();
    }
}