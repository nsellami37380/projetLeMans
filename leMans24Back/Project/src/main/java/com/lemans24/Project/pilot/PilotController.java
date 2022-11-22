package com.lemans24.Project.pilot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/pilots")
public class PilotController {

    private final PilotService pilotService;

    @Autowired
    public PilotController(PilotService pilotService) {
        this.pilotService = pilotService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Pilot>> getALlPilot(){
        List<Pilot> pilotList = pilotService.findAllPilot();
        return new ResponseEntity<>(pilotList, HttpStatus.OK);
    }

    @PostMapping("/add/{carId}")
    public ResponseEntity<Pilot> addPilot(@RequestBody Pilot pilot,
                                          @PathVariable ("carId") Long carId){
        Pilot newpilot = pilotService.addPilot(pilot, carId);
        return new ResponseEntity<>(newpilot, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}/{teamId}/{carId}")
    public ResponseEntity<Pilot> updatePilot(@PathVariable("id") Long id,
                                             @PathVariable ("teamId") Long teamId,
                                             @PathVariable ("carId") Long carId,
                                             @RequestBody Pilot pilot){
        Pilot updatedPilot = pilotService.updatePilotById(id, teamId, carId, pilot);
        return new ResponseEntity<>(updatedPilot, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePilot(@PathVariable("id") Long id){
        pilotService.deletePilotById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
