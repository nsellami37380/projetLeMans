package com.lemans24.Project.car;

import com.lemans24.Project.team.Team;
import com.lemans24.Project.team.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    private final CarRepository carRepository;
    private final TeamRepository teamRepository;

    @Autowired
    public CarService(CarRepository carRepository, TeamRepository teamRepository) {
        this.carRepository = carRepository;
        this.teamRepository = teamRepository;
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
    public Car updateCarService(Long id, Long teamId, Car car) {

        Car carFoundToUpdate = carRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("id " + id + " not found"));

        carFoundToUpdate.setCarPhotoList(car.getCarPhotoList());
        carFoundToUpdate.setModelName(car.getModelName());
        carFoundToUpdate.setEngine(car.getEngine());
        carFoundToUpdate.setPower(car.getPower());
        carFoundToUpdate.setMaxSpeed(car.getMaxSpeed());
        carFoundToUpdate.setAcceleration(car.getAcceleration());
        carFoundToUpdate.setBio(car.getBio());
        carFoundToUpdate.setPilot(car.getPilot());
        Team teamToSet = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("id of team " + teamId + " not found"));
        carFoundToUpdate.setTeam(teamToSet);
        return carRepository.save(carFoundToUpdate);
    }



    //DELETE
    public void deleteCarService(Long id) {
        carRepository.deleteById(id);
    }
}
