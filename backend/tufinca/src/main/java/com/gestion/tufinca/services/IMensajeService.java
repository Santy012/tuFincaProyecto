package com.gestion.tufinca.services;

import com.gestion.tufinca.models.MensajeModel;

import java.util.List;
import java.util.Optional;

public interface IMensajeService {
    List<MensajeModel> getMensajes();

    Optional<MensajeModel> getMensajeById(Integer id);

    void saveMensaje(MensajeModel mensajes);

    void deleteMensajeById(Integer id);

    List<MensajeModel> getMensajeByGestion(String gestion);

    List<MensajeModel> getMensajeByNombre(String nombreCliente);

}
