package com.lemans24.Project.pilot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PilotService {

    private final PilotRepository pilotRepository;

    @Autowired
    public PilotService(PilotRepository pilotRepository) {
        this.pilotRepository = pilotRepository;
    }

    public List<Pilot> findAllPilot(){
        return pilotRepository.findAll();
    }

    public Pilot findPilotById(Long id) {
        return pilotRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("id " + id + " not found"));
    }

    public Pilot addPilot(Pilot pilot) {
        return pilotRepository.save(pilot);
    }

    public Pilot updatePilotById(Long id, Pilot pilot) {
        Pilot pilotFound = pilotRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("No such"));
        pilotFound.setFirstName(pilot.getFirstName());
        pilotFound.setLastName(pilot.getLastName());
        pilotFound.setDateOfBirth(pilot.getDateOfBirth());
        pilotFound.setPalmares(pilot.getPalmares());
        pilotFound.setBio(pilot.getBio());
        pilotFound.setHeight(pilot.getHeight());

        return pilotRepository.save(pilotFound);
    }
    public void deletePilotById(Long id) {
        pilotRepository.deleteById(id);
    }
}
