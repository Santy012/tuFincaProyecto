package com.gestion.tufinca.controllers;

import com.gestion.tufinca.controllers.dto.MediaDTO;
import com.gestion.tufinca.models.MediaModel;
import com.gestion.tufinca.services.IMediaService;
import com.gestion.tufinca.services.IPropiedadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gestion.tufinca.models.enums.Tipo;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/media")
public class MediaController {

    private final IMediaService mediaService;
    private final IPropiedadService propiedadService;

    @Value("${upload.directory}")
    private String uploadDirectory;

    @Autowired
    public MediaController(IMediaService mediaService, IPropiedadService propiedadService) {
        this.mediaService = mediaService;
        this.propiedadService = propiedadService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<MediaDTO>> getMedia() {
        List<MediaDTO> mediaList = mediaService.getMedia()
                .stream()
                .map(this::buildMediaDTO)
                .toList();
        return ResponseEntity.ok(mediaList); // Siempre devuelve 200 OK con la lista
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<MediaDTO>> getMediaById(@PathVariable Integer id){
        Optional<MediaModel> mediaOptional = mediaService.getMediaById(id);
        return createMediaResponseEntity(mediaOptional);
    }

    @GetMapping("/propiedad/{propiedadId}")
    public ResponseEntity<List<MediaDTO>> getMediaByPropiedadId(@PathVariable Integer propiedadId) {
        List<MediaDTO> medias = mediaService.getMediasByPropiedadId(propiedadId)
                .stream()
                .map(this::buildMediaDTO)
                .toList();
        return ResponseEntity.ok(medias);
    }

    @Operation(summary = "Subir archivos multimedia", description = "Permite subir imágenes o videos y asociarlos a una propiedad")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Archivos subidos exitosamente"),
            @ApiResponse(responseCode = "500", description = "Error al subir archivos")
    })

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<MediaDTO>> uploadMedia(
            @Parameter(description = "Archivos multimedia", content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE))
            @RequestPart("files") MultipartFile[] files,

            @Parameter(description = "ID de la propiedad asociada", example = "1")
            @RequestParam(value = "propiedadId", required = false) Integer propiedadId) {

        List<MediaDTO> uploadedFiles = new ArrayList<>();

        for (MultipartFile file : files) {
            try {
                // Validar tipo de archivo
                String contentType = file.getContentType();
                Tipo tipo = (contentType != null && contentType.startsWith("video")) ? Tipo.video : Tipo.imagen;

                // Crear directorio si no existe
                File uploadDir = new File(uploadDirectory);
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                // Generar nombre único para el archivo
                String fileName = file.getOriginalFilename();
                String filePath = uploadDirectory + File.separator + fileName;

                // Guardar archivo en sistema
                Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

                // Crear DTO y guardar en BD
                MediaDTO mediaDTO = MediaDTO.builder()
                        .url("/uploads/" + fileName)
                        .tipo(tipo)
                        .propiedad(propiedadService.getPropiedadById(propiedadId).get())
                        .build();

                MediaModel savedMedia = mediaService.saveMedia(buildMedia(mediaDTO));
                uploadedFiles.add(buildMediaDTO(savedMedia));
            } catch (IllegalArgumentException ex) {
                // ⛔️ Re-lanza la excepción para que sea atrapada por @ControllerAdvice y Swagger la vea
                throw ex;

            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        return ResponseEntity.ok(uploadedFiles);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMediaById(@PathVariable Integer id) {
        Optional<MediaModel> mediaOptional = mediaService.getMediaById(id);
        if (mediaOptional.isPresent()) {
            MediaModel media = mediaOptional.get();

            try {
                // Obtener el nombre del archivo desde la URL
                String fileName = media.getUrl().replace("/uploads/", "");

                // Eliminar archivo físico del sistema
                boolean fileDeleted = Files.deleteIfExists(Paths.get(uploadDirectory + File.separator + fileName));

                // Eliminar registro de la base de datos
                mediaService.deleteMediaById(id);

                // Responder según si el archivo físico fue eliminado o no
                if (fileDeleted) {
                    return ResponseEntity.ok("Media eliminada exitosamente (archivo y registro)");
                } else {
                    return ResponseEntity.ok("Media eliminada exitosamente (solo registro, archivo no encontrado)");
                }
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Error al eliminar el archivo físico: " + e.getMessage());
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Media no encontrada con el ID proporcionado");
    }



    public MediaModel setMediaUpdateValues(MediaDTO mediaDTO, MediaModel mediaToUpdate){
        mediaToUpdate.setUrl(mediaDTO.getUrl());
        mediaToUpdate.setTipo(mediaDTO.getTipo());
        return mediaToUpdate;
    }

    public MediaModel buildMedia(MediaDTO mediaDTO){
        return MediaModel.builder()
                .id(mediaDTO.getId())
                .url(mediaDTO.getUrl())
                .tipo(mediaDTO.getTipo())
                .propiedad(mediaDTO.getPropiedad())
                .build();
    }

    public ResponseEntity<Optional<MediaDTO>> createMediaResponseEntity(Optional<MediaModel> mediaOptional){
        if(mediaOptional.isPresent()){
            MediaModel media = mediaOptional.get();
            return ResponseEntity.ok(Optional.of(buildMediaDTO(media)));
        }
        return ResponseEntity.notFound().build();
    }

    public MediaDTO buildMediaDTO(MediaModel media) {
        return MediaDTO.builder()
                .id(media.getId())
                .url(media.getUrl())
                .tipo(media.getTipo())
                .propiedad(media.getPropiedad())
                .build();
    }
}