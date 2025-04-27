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
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;
import com.gestion.tufinca.models.enums.Tipo;
import org.springframework.web.multipart.MultipartFile;
import net.coobird.thumbnailator.Thumbnails;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Arrays;
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
            @RequestPart("files") MultipartFile[] files,
            @RequestParam(value = "propiedadId", required = false) Integer propiedadId) {

        List<MediaDTO> uploadedFiles = new ArrayList<>();

        for (MultipartFile file : files) {
            try {
                // Validar tipo
                String contentType = file.getContentType();
                Tipo tipo = (contentType != null && contentType.startsWith("video")) ? Tipo.video : Tipo.imagen;

                // Solo procesar imágenes (no videos)
                if (tipo == Tipo.imagen) {
                    String originalName = file.getOriginalFilename();
                    String webpName = originalName.replaceFirst("\\.[^.]+$", ".webp");
                    String filePath = uploadDirectory + File.separator + webpName;

                    // Convertir a WebP con tamaño controlado
                    Thumbnails.of(file.getInputStream())
                            .size(1200, 1200)
                            .outputFormat("webp")
                            .outputQuality(0.8)
                            .toFile(filePath);

                    uploadedFiles.add(createMediaRecord(webpName, tipo, propiedadId));
                } else {
                    // Manejo de videos (sin conversión)
                    String fileName = file.getOriginalFilename();
                    Files.copy(file.getInputStream(), Paths.get(uploadDirectory + File.separator + fileName));
                    uploadedFiles.add(createMediaRecord(fileName, tipo, propiedadId));
                }
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        return ResponseEntity.ok(uploadedFiles);
    }

    private MediaDTO createMediaRecord(String fileName, Tipo tipo, Integer propiedadId) {
        MediaDTO mediaDTO = MediaDTO.builder()
                .url("/uploads/" + fileName)
                .tipo(tipo)
                .propiedad(propiedadService.getPropiedadById(propiedadId).get())
                .build();
        return buildMediaDTO(mediaService.saveMedia(buildMedia(mediaDTO)));
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

    @GetMapping("/optimize-existing")
    public ResponseEntity<String> optimizeExistingImages() {
        File uploadDir = new File(uploadDirectory);
        File[] imageFiles = uploadDir.listFiles((dir, name) ->
                name.toLowerCase().matches(".*\\.(jpg|jpeg|png)$"));

        if (imageFiles != null) {
            Arrays.stream(imageFiles).forEach(this::convertToWebp);
            return ResponseEntity.ok("Optimización iniciada para " + imageFiles.length + " imágenes");
        }
        return ResponseEntity.ok("No hay imágenes para optimizar");
    }

    @Async
    private void convertToWebp(File imageFile) {
        try {
            String webpPath = imageFile.getPath().replaceFirst("\\.[^.]+$", ".webp");
            Thumbnails.of(imageFile)
                    .size(1200, 1200)
                    .outputFormat("webp")
                    .outputQuality(0.8)
                    .toFile(webpPath);

            // Actualiza la URL en la base de datos
            mediaService.updateImagePath(
                    "/uploads/" + imageFile.getName(),
                    "/uploads/" + new File(webpPath).getName()
            );
        } catch (IOException e) {
            e.printStackTrace();
        }
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