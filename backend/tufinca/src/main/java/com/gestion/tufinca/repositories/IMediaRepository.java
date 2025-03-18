package com.gestion.tufinca.repositories;

import com.gestion.tufinca.models.MediaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IMediaRepository extends JpaRepository<MediaModel, Integer> {
}
