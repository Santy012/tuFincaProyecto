package com.gestion.tufinca.services;

import com.gestion.tufinca.models.MediaModel;

import java.util.List;

public interface IMediaService {

    List<MediaModel> getMedia();

    void saveMedia(MediaModel media);

    void deleteMedia(MediaModel media);

}
