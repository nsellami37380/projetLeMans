package com.lemans24.Project.pilotphoto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PilotPhotoService {

private final PilotPhotoRepository pilotPhotoRepository;

    @Autowired
    public PilotPhotoService(PilotPhotoRepository pilotPhotoRepository) {
        this.pilotPhotoRepository = pilotPhotoRepository;
    }

    public List<PilotPhoto> findAllPilotPhotos() {
        return  pilotPhotoRepository.findAll();
    }

    public void deletePilotPhoto(Long id) {
        pilotPhotoRepository.deleteById(id);
    }

    public PilotPhoto updatePilotPhoto(Long id, PilotPhoto pilotPhoto) {
        PilotPhoto pilotPhotoFoundToUpdate = pilotPhotoRepository.findById(id).
                orElseThrow(()-> new IllegalStateException("id " + id + " not found"));
        pilotPhotoFoundToUpdate.setUrlPhoto(pilotPhoto.getUrlPhoto());
        pilotPhotoRepository.save(pilotPhotoFoundToUpdate);
        return pilotPhotoFoundToUpdate;
    }

    public PilotPhoto addPilotPhoto(PilotPhoto pilotPhoto) {
        return pilotPhotoRepository.save(pilotPhoto);
    }
}
