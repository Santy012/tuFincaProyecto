package com.gestion.tufinca.persistence.impl;

import com.gestion.tufinca.models.MensajeModel;
import com.gestion.tufinca.models.enums.Gestion;

import com.gestion.tufinca.persistence.IMensajeDAO;
import com.gestion.tufinca.repositories.IMensajeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class MensajeDAOImpl implements IMensajeDAO {
    private final IMensajeRepository mensajeRepository;

    @Autowired
    public MensajeDAOImpl(IMensajeRepository mensajeRepository) {
        this.mensajeRepository = mensajeRepository;
    }

    @Override
    public List<MensajeModel> getMensajes() {
        return mensajeRepository.findAll();
    }

    @Override
    public Optional<MensajeModel> getMensajeById(Integer id) {
        return mensajeRepository.findById(id);
    }

    @Override
    public void saveMensaje(MensajeModel mensaje) {
        mensajeRepository.save(mensaje);
    }

    @Override
    public void deleteMensajeById(Integer id) {
        mensajeRepository.deleteById(id);
    }

    @Override
    public List<MensajeModel> getMensajeByGestion(String gestion) {
        return mensajeRepository.findAllByGestion(gestion);
    }

    @Override
    public List<MensajeModel> getMensajeByNombre(String nombreCliente) {
        return mensajeRepository.findAllByNombreCliente(nombreCliente);
    }
}