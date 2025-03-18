package com.gestion.tufinca.persistence;

import com.gestion.tufinca.models.MensajeModel;

import java.util.List;
import java.util.Optional;

public interface IMensajeDAO {

    List<MensajeModel> getMensajes();

    Optional<MensajeModel> getMensajeById(Integer id);

    void saveMensaje(MensajeModel mensajes);

    void deleteMensajeById(Integer id);

    Optional<MensajeModel> getMensajeByGestion(String gestion);

    Optional<MensajeModel> getMensajeByNombre(String nombre);

}