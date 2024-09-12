package com.lemans24.Project.pilotphoto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("pilotPhotos")
public class PilotPhotoController {

    private final PilotPhotoService pilotPhotoService;

    @Autowired
    public PilotPhotoController(PilotPhotoService pilotPhotoService) {
        this.pilotPhotoService = pilotPhotoService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<PilotPhoto>> getAllPilotPhotos(){
        List<PilotPhoto> listPilotPhoto = pilotPhotoService.findAllPilotPhotos();
        return new ResponseEntity<>(listPilotPhoto, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePilotPhoto(@PathVariable("id") Long id){
        pilotPhotoService.deletePilotPhoto(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PilotPhoto> updatePilotPhoto(@PathVariable("id") Long id, @RequestBody PilotPhoto pilotPhoto)
    {
        PilotPhoto pilotPhotoUpdated = pilotPhotoService.updatePilotPhoto(id, pilotPhoto);
        return new ResponseEntity(pilotPhotoUpdated, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<PilotPhoto> addPilotPhoto(@RequestBody PilotPhoto pilotPhoto)
    {
        PilotPhoto newPilotPhoto = pilotPhotoService.addPilotPhoto(pilotPhoto);
        return new ResponseEntity(newPilotPhoto, HttpStatus.OK);
    }

}
