package com.gestion.tufinca.controllers;

import com.gestion.tufinca.controllers.dto.EtiquetaDTO;
import com.gestion.tufinca.models.EtiquetaModel;
import com.gestion.tufinca.models.enums.TipoEtiqueta;
import com.gestion.tufinca.services.IEtiquetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/etiqueta")
public class EtiquetaController {

    private final IEtiquetaService etiquetaService;

    @Autowired
    public EtiquetaController(IEtiquetaService etiquetaService) {
        this.etiquetaService = etiquetaService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<EtiquetaDTO>> getEtiquetas() {
        List<EtiquetaDTO> etiquetaList = etiquetaService.getEtiquetas()
                .stream()
                .map(this::buildEtiquetaDTO)
                .toList();
        return ResponseEntity.ok(etiquetaList); // Siempre devuelve 200 OK con la lista
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<EtiquetaDTO>> getEtiquetaById(@PathVariable Integer id){
        Optional<EtiquetaModel> etiquetaOptional = etiquetaService.getEtiquetaById(id);
        return createEtiquetaResponseEntity(etiquetaOptional);
    }

    @PostMapping(path="/save")
    public ResponseEntity<?> saveEtiqueta(@RequestBody EtiquetaDTO etiquetaDTO) throws URISyntaxException {
        EtiquetaModel nuevaEtiqueta = etiquetaService.saveEtiqueta(buildEtiqueta(etiquetaDTO));
        EtiquetaDTO etiquetaCreadaDTO = buildEtiquetaDTO(nuevaEtiqueta);
        return ResponseEntity.created(new URI("api/etiqueta/save")).body(etiquetaCreadaDTO);
    }

    @DeleteMapping(path="/delete/{id}")
    public ResponseEntity<?> deleteEtiquetaById(@PathVariable Integer id){
        if(id!=null){
            etiquetaService.deleteEtiquetaById(id);
            return ResponseEntity.ok("Etiqueta con id " + id + " eliminado exitosamente");
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/tipoEtiqueta/{tipoEtiqueta}")
    public ResponseEntity<List<EtiquetaDTO>> getEtiquetaByTipoEtiqueta(@PathVariable TipoEtiqueta tipoEtiqueta) {
        List<EtiquetaDTO> etiquetaList = etiquetaService.getEtiquetaByTipoEtiqueta(tipoEtiqueta)
                .stream()
                .map(this::buildEtiquetaDTO)
                .toList();
        return ResponseEntity.ok(etiquetaList); // Siempre devuelve 200 OK con la lista
    }


    public EtiquetaModel setEtiquetaUpdateValues(EtiquetaDTO etiquetaDTO, EtiquetaModel etiquetaToUpdate){
        etiquetaToUpdate.setNombre(etiquetaDTO.getNombre());
        etiquetaToUpdate.setTipoEtiqueta(etiquetaDTO.getTipoEtiqueta());
        return etiquetaToUpdate;
    }

    public EtiquetaModel buildEtiqueta(EtiquetaDTO etiquetaDTO){
        return EtiquetaModel.builder()
                .id(etiquetaDTO.getId())
                .nombre(etiquetaDTO.getNombre())
                .tipoEtiqueta(etiquetaDTO.getTipoEtiqueta())
                .build();
    }

    public ResponseEntity<Optional<EtiquetaDTO>> createEtiquetaResponseEntity(Optional<EtiquetaModel> etiquetaOptional){
        if(etiquetaOptional.isPresent()){
            EtiquetaModel etiqueta = etiquetaOptional.get();
            return ResponseEntity.ok(Optional.of(buildEtiquetaDTO(etiqueta)));
        }
        return ResponseEntity.notFound().build();
    }

    public EtiquetaDTO buildEtiquetaDTO(EtiquetaModel etiqueta) {
        return EtiquetaDTO.builder()
                .id(etiqueta.getId())
                .nombre(etiqueta.getNombre())
                .tipoEtiqueta(etiqueta.getTipoEtiqueta())
                .build();
    }
}