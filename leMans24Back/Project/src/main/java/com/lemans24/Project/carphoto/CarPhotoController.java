package com.lemans24.Project.carphoto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/cars-photos")
public class CarPhotoController {

    private final CarPhotoService carPhotoService;

    @Autowired
    public CarPhotoController(CarPhotoService carPhotoService) {
        this.carPhotoService = carPhotoService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<CarPhoto>> getAllCarPhoto(){
        List<CarPhoto> carPhotoList = carPhotoService.getAllCarPhoto();
        return new ResponseEntity<>(carPhotoList, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<CarPhoto> addCarPhoto(@RequestBody CarPhoto carPhoto){
        CarPhoto carPhotoAdded = carPhotoService.addCarPhoto(carPhoto);
        return new ResponseEntity<>(carPhotoAdded, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<CarPhoto> updateCarPhoto(@PathVariable("id") Long id,
                                                   @RequestBody CarPhoto carPhoto){
        CarPhoto carPhotoUpdated = carPhotoService.updateCarPhoto(id, carPhoto);
        return new ResponseEntity<>(carPhotoUpdated, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCarPhoto(@PathVariable("id") Long id){
        carPhotoService.deleteCarPhoto(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
