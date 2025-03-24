package com.gestion.tufinca.controllers;

import com.gestion.tufinca.controllers.dto.MediaDTO;
import com.gestion.tufinca.models.MediaModel;
import com.gestion.tufinca.services.IMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.gestion.tufinca.models.enums.Tipo;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/media")
public class MediaController {

    private final IMediaService mediaService;

    @Autowired
    public MediaController(IMediaService mediaService) {
        this.mediaService = mediaService;
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

    @PostMapping(path="/save")
    public ResponseEntity<?> saveMedia(@RequestBody MediaDTO mediaDTO) throws URISyntaxException {
        //acá va lógica de asegurar que sea un png, jpg, .mp4??
        mediaService.saveMedia(buildMedia(mediaDTO));
        return ResponseEntity.created(new URI("api/media/save")).build();
    }

    @DeleteMapping(path="/delete/{id}")
    public ResponseEntity<?> deleteMediaById(@PathVariable Integer id){
        if(id!=null){
            mediaService.deleteMediaById(id);
            return ResponseEntity.ok("Media con id " + id + " eliminada exitosamente");
        }
        return ResponseEntity.badRequest().build();
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
                .build();
    }
}