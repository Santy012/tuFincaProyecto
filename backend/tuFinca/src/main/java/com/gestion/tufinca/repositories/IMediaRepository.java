package com.gestion.tufinca.repositories;

import com.gestion.tufinca.models.AdministradorModel;
import com.gestion.tufinca.models.MediaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IMediaRepository extends JpaRepository<MediaModel, Integer> {
    List<MediaModel> findByPropiedadId(Integer propiedadId);
    Optional<MediaModel> findByUrl(String url);
}
