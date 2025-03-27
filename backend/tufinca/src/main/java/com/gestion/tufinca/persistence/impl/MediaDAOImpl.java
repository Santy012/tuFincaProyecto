package com.gestion.tufinca.persistence.impl;

import com.gestion.tufinca.models.MediaModel;
import com.gestion.tufinca.persistence.IMediaDAO;
import com.gestion.tufinca.repositories.IMediaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class MediaDAOImpl implements IMediaDAO {

    private final IMediaRepository mediaRepository;

    @Autowired
    public MediaDAOImpl(IMediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    @Override
    public List<MediaModel> getMedia() {
        return mediaRepository.findAll();
    }

    @Override
    public Optional<MediaModel> getMediaById(Integer id) {
        return mediaRepository.findById(id);
    }

    @Override
    public void saveMedia(MediaModel media) {
        mediaRepository.save(media);
    }

    @Override
    public void deleteMediaById(Integer id) {
        mediaRepository.deleteById(id);
    }

}
