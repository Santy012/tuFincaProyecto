package com.gestion.tufinca.persistence;

import com.gestion.tufinca.models.MensajeModel;
import com.gestion.tufinca.models.enums.Gestion;


import java.util.List;
import java.util.Optional;

public interface IMensajeDAO {

    List<MensajeModel> getMensajes();

    Optional<MensajeModel> getMensajeById(Integer id);

    void saveMensaje(MensajeModel mensajes);

    void deleteMensajeById(Integer id);

    List<MensajeModel> getMensajeByGestion(String gestion);

    List<MensajeModel> getMensajeByNombre(String nombreCliente);

}