package com.lemans24.Project.pilot;

import com.lemans24.Project.car.Car;
import com.lemans24.Project.car.CarRepository;
import com.lemans24.Project.team.Team;
import com.lemans24.Project.team.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PilotService {

    private final PilotRepository pilotRepository;
    private final TeamRepository teamRepository;

    private final CarRepository carRepository;

    @Autowired
    public PilotService(PilotRepository pilotRepository, TeamRepository teamRepository, CarRepository carRepository) {
        this.pilotRepository = pilotRepository;
        this.teamRepository = teamRepository;
        this.carRepository = carRepository;
    }

    public List<Pilot> findAllPilot(){
        return pilotRepository.findAll();
    }

    public Pilot findPilotById(Long id) {
        return pilotRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("id " + id + " not found"));
    }

    public Pilot addPilot(Pilot pilot, Long carId) {
       if (carId > 0) {
           Car carToSet = carRepository.findById(carId)
                   .orElseThrow(() -> new IllegalArgumentException("id of team " + carId + " not found"));
           pilot.setCar(carToSet);
       }
        return pilotRepository.save(pilot);
    }

    public Pilot updatePilotById(Long id,Long teamId, Long carId, Pilot pilot) {
        Pilot pilotFound = pilotRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("No such"));
        pilotFound.setFirstName(pilot.getFirstName());
        pilotFound.setLastName(pilot.getLastName());
        pilotFound.setDateOfBirth(pilot.getDateOfBirth());
        pilotFound.setPalmares(pilot.getPalmares());
        pilotFound.setBio(pilot.getBio());
        pilotFound.setHeight(pilot.getHeight());
        pilotFound.setPhotoList(pilot.getPhotoList());
        pilotFound.setCar(pilot.getCar());
        Team teamToSet = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("id of team " + teamId + " not found"));
        pilotFound.setTeam(teamToSet);
        if (carId > 0){
            Car carToSet = carRepository.findById(carId)
                    .orElseThrow(() -> new IllegalStateException("No such"));
            pilotFound.setCar(carToSet);
        }
        return pilotRepository.save(pilotFound);
    }
    public void deletePilotById(Long id) {
        pilotRepository.deleteById(id);
    }
}
