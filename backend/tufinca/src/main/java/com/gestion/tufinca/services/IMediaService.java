package com.gestion.tufinca.services;
import com.gestion.tufinca.models.MediaModel;

import java.util.List;
import java.util.Optional;

public interface IMediaService {
    List<MediaModel> getMedia();

    Optional<MediaModel> getMediaById(Integer id);

    void saveMedia(MediaModel Media);

    void deleteMediaById(Integer id);
}
