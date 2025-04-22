package com.gestion.tufinca.controllers;

import com.gestion.tufinca.controllers.dto.MensajeDTO;
import com.gestion.tufinca.models.AdministradorModel;
import com.gestion.tufinca.models.MensajeModel;
import com.gestion.tufinca.models.enums.Gestion;
import com.gestion.tufinca.services.IAdministradorService;
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
    private final IAdministradorService administradorService;

    @Autowired
    public MensajeController(IMensajeService mensajeService, IAdministradorService administradorService) {
        this.mensajeService = mensajeService;
        this.administradorService = administradorService;
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
    public ResponseEntity<Optional<MensajeDTO>> getMensajeById(@PathVariable Integer id) {
        Optional<MensajeModel> mensajeOptional = mensajeService.getMensajeById(id);
        return createMensajeResponseEntity(mensajeOptional);
    }

    @PostMapping(path = "/save")
    public ResponseEntity<?> saveMensaje(@RequestBody MensajeDTO mensajeDTO) throws URISyntaxException {
        mensajeService.saveMensaje(buildMensaje(mensajeDTO));
        return ResponseEntity.created(new URI("api/mensajes/save")).build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateMensajeById(@RequestBody MensajeDTO request, @PathVariable Integer id) {
        Optional<MensajeModel> mensajeOptional = mensajeService.getMensajeById(id);

        if (mensajeOptional.isPresent()) {
            MensajeModel mensajeToUpdate = mensajeOptional.get();

            // Obtener el administrador desde la base de datos
            if (request.getAdministradorId() != null) {
                AdministradorModel administrador = administradorService.getAdministradorById(request.getAdministradorId())
                        .orElseThrow(() -> new RuntimeException("Administrador no encontrado"));
                mensajeToUpdate.setAdministrador(administrador);
            }

            // Actualizar otros campos
            mensajeToUpdate.setGestion(request.getGestion());

            mensajeService.saveMensaje(mensajeToUpdate);
            return ResponseEntity.ok("Mensaje actualizado exitosamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<?> deleteMensajeById(@PathVariable Integer id) {
        if (id != null) {
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

    public MensajeModel setMensajeUpdateValues(MensajeDTO mensajeDTO, MensajeModel mensajeToUpdate) {
        mensajeToUpdate.setNombreCliente(mensajeDTO.getNombreCliente());
        mensajeToUpdate.setApellidoCliente(mensajeDTO.getApellidoCliente());
        mensajeToUpdate.setCelular(mensajeDTO.getCelular());
        mensajeToUpdate.setCorreo(mensajeDTO.getCorreo());
        mensajeToUpdate.setDetalle(mensajeDTO.getDetalle());

        // Obtener el administrador por ID
        if (mensajeDTO.getAdministradorId() != null) {
            AdministradorModel administrador = administradorService.getAdministradorById(mensajeDTO.getAdministradorId())
                    .orElseThrow(() -> new RuntimeException("Administrador no encontrado"));
            mensajeToUpdate.setAdministrador(administrador);
        }

        mensajeToUpdate.setPropiedad(mensajeDTO.getPropiedad());
        mensajeToUpdate.setGestion(mensajeDTO.getGestion());

        return mensajeToUpdate;
    }


    public MensajeModel buildMensaje(MensajeDTO mensajeDTO) {
        AdministradorModel administrador = null;
        if (mensajeDTO.getAdministradorId() != null) {
            administrador = administradorService.getAdministradorById(mensajeDTO.getAdministradorId())
                    .orElseThrow(() -> new RuntimeException("Administrador no encontrado"));
        }

        return MensajeModel.builder()
                .id(mensajeDTO.getId())
                .nombreCliente(mensajeDTO.getNombreCliente())
                .apellidoCliente(mensajeDTO.getApellidoCliente())
                .celular(mensajeDTO.getCelular())
                .correo(mensajeDTO.getCorreo())
                .detalle(mensajeDTO.getDetalle())
                .gestion(mensajeDTO.getGestion())
                .fecha(mensajeDTO.getFecha())
                .administrador(administrador) // <--- Asignar el objeto recuperado
                .propiedad(mensajeDTO.getPropiedad())
                .build();
    }

    public ResponseEntity<Optional<MensajeDTO>> createMensajeResponseEntity(Optional<MensajeModel> mensajeOptional) {
        if (mensajeOptional.isPresent()) {
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
                .fecha(mensaje.getFecha())
                .administradorId(mensaje.getAdministrador() != null ? mensaje.getAdministrador().getId() : null) // <--- Mapear el ID
                .propiedad(mensaje.getPropiedad())
                .build();
    }
}