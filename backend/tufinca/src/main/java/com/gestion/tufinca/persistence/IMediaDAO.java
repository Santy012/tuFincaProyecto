package com.gestion.tufinca.persistence;

import com.gestion.tufinca.models.MediaModel;

import java.util.List;
import java.util.Optional;

public interface IMediaDAO {

    List<MediaModel> getMedia();

    void saveMedia(MediaModel media);

    void deleteMedia(MediaModel media);
}