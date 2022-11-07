package com.lemans24.Project.car;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    private final CarRepository carRepository;

    @Autowired
    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    //POST
    public Car addCarService(Car car) {
        return carRepository.save(car);
    }


    //GET
    public List<Car> findAllCar() {
        return carRepository.findAll();
    }

    //PUT
    public Car updateCarService(Long id, Car car) {
        Car carFoundToUpdate = carRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("id " + id + " not found"));

        carFoundToUpdate.setPhotoList(car.getPhotoList());
        carFoundToUpdate.setModelName(car.getModelName());
        carFoundToUpdate.setEngine(car.getEngine());
        carFoundToUpdate.setPower(car.getPower());
        carFoundToUpdate.setMaxSpeed(car.getMaxSpeed());
        carFoundToUpdate.setAcceleration(car.getAcceleration());
        carFoundToUpdate.setBio(car.getBio());
        carFoundToUpdate.setTeam(car.getTeam());
        carFoundToUpdate.setPilot(car.getPilot());

        return carRepository.save(carFoundToUpdate);
    }

    //DELETE
    public void deleteCarService(Long id) {
        carRepository.deleteById(id);
    }
}
