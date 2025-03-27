package com.gestion.tufinca.services.impl;

import com.gestion.tufinca.models.MensajeModel;
import com.gestion.tufinca.persistence.IMensajeDAO;
import com.gestion.tufinca.services.IMensajeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gestion.tufinca.models.enums.Gestion;

import java.util.List;
import java.util.Optional;

@Service
public class MensajeServiceImpl implements IMensajeService {

    private final IMensajeDAO MensajeDAO;

    @Autowired
    public MensajeServiceImpl(IMensajeDAO MensajeDAO) {
        this.MensajeDAO = MensajeDAO;
    }

    @Override
    public List<MensajeModel> getMensajes() {
        List<MensajeModel> Mensajes = MensajeDAO.getMensajes();

        System.out.println("Mensajes encontradas: " + Mensajes.size());
        Mensajes.forEach(p -> System.out.println("Mensaje: " + p.getDetalle()));

        return Mensajes;
    }

    @Override
    public Optional<MensajeModel> getMensajeById(Integer id) {
        return MensajeDAO.getMensajeById(id);
    }

    @Override
    public void saveMensaje(MensajeModel Mensaje) {
        MensajeDAO.saveMensaje(Mensaje);
    }

    @Override
    public void deleteMensajeById(Integer id) {
        MensajeDAO.deleteMensajeById(id);
    }

    @Override
    public List<MensajeModel> getMensajesByGestion(Gestion gestion) {
        return MensajeDAO.getMensajesByGestion(gestion);
    }

    @Override
    public List<MensajeModel> getMensajesByNombre(String nombreCliente) {
        return MensajeDAO.getMensajesByNombre(nombreCliente);
    }
}