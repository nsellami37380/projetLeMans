package com.lemans24.Project.carphoto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarPhotoService {

    private final CarPhotoRepository carPhotoRepository;

    @Autowired
    public CarPhotoService(CarPhotoRepository carPhotoRepository) {
        this.carPhotoRepository = carPhotoRepository;
    }

    public List<CarPhoto> getAllCarPhoto(){
        return carPhotoRepository.findAll();
    }

    public CarPhoto addCarPhoto(CarPhoto carPhoto){
        return carPhotoRepository.save(carPhoto);
    }

    public CarPhoto updateCarPhoto(Long id, CarPhoto carPhoto){
        CarPhoto carPhotoFoundById = carPhotoRepository.findById(id)
                .orElseThrow(()-> new IllegalStateException("id " + id + " not found" ));
        carPhotoFoundById.setUrlPhoto(carPhoto.getUrlPhoto());
        return carPhotoRepository.save(carPhotoFoundById);
    }

    public void deleteCarPhoto(Long id){
        carPhotoRepository.deleteById(id);
    }
}
