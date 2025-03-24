package com.gestion.tufinca.services.impl;

import com.gestion.tufinca.models.MediaModel;
import com.gestion.tufinca.persistence.IMediaDAO;
import com.gestion.tufinca.services.IMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MediaServiceImpl implements IMediaService {

    private final IMediaDAO MediaDAO;

    @Autowired
    public MediaServiceImpl(IMediaDAO MediaDAO) {
        this.MediaDAO = MediaDAO;
    }

    @Override
    public List<MediaModel> getMedia() {
        List<MediaModel> Media = MediaDAO.getMedia();

        System.out.println("Media encontrada: " + Media.size());
        Media.forEach(p -> System.out.println("Media: " + p.getTipo()));

        return Media;
    }

    @Override
    public Optional<MediaModel> getMediaById(Integer id) {
        return Optional.empty();
    }

    @Override
    public void saveMedia(MediaModel Media) {
        MediaDAO.saveMedia(Media);
    }

    @Override
    public void deleteMediaById(Integer id) {
        MediaDAO.deleteMediaById(id);
    }
}