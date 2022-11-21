package com.lemans24.Project.pilot;

import com.lemans24.Project.team.Team;
import com.lemans24.Project.team.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PilotService {

    private final PilotRepository pilotRepository;
    private final TeamRepository teamRepository;

    @Autowired
    public PilotService(PilotRepository pilotRepository, TeamRepository teamRepository) {
        this.pilotRepository = pilotRepository;
        this.teamRepository = teamRepository;
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

    public Pilot updatePilotById(Long id,Long teamId, Pilot pilot) {
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

        return pilotRepository.save(pilotFound);
    }
    public void deletePilotById(Long id) {
        pilotRepository.deleteById(id);
    }
}
