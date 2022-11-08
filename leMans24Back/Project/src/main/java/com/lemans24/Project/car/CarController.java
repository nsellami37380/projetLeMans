package com.lemans24.Project.car;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/cars")

public class CarController {

    private final CarService carService;

    @Autowired
    public CarController(CarService carService) {
        this.carService = carService;
    }

    //POST
    @PostMapping("/add")
    public Car addCarController(@RequestBody Car car) {
        return carService.addCarService(car);
    }

    //GET
    @GetMapping("/all")
    public ResponseEntity< List<Car> > getAllCar() {
        List<Car> carList = carService.findAllCar();
        return new ResponseEntity<>(carList, HttpStatus.OK);
    }

    //PUT
    @PutMapping("/update/{id}")
    public Car updateCarController(
            @PathVariable ("id") Long id,
            @RequestBody Car car) {
        return carService.updateCarService(id, car);
    }

    //DELETE
    @DeleteMapping("/delete/{id}")
    public void deleteCarController(@PathVariable ("id") Long id) {
        carService.deleteCarService(id);
    }
}
