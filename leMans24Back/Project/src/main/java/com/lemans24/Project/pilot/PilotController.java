package com.lemans24.Project.pilot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pilot")
public class PilotController {

    private final PilotService pilotService;

    @Autowired
    public PilotController(PilotService pilotService) {
        this.pilotService = pilotService;
    }

    @GetMapping("/pilotlist")
    public ResponseEntity<List<Pilot>> getALlPilot(){
        List<Pilot> pilotList = pilotService.findAllPilot();
        return new ResponseEntity<>(pilotList, HttpStatus.OK);
    }

    @PostMapping("/addPilot")
    public ResponseEntity<Pilot> addPilot(@RequestBody Pilot pilot){
        Pilot newpilot = pilotService.addPilot(pilot);
        return new ResponseEntity<>(newpilot, HttpStatus.CREATED);
    }

    @PutMapping("/updatedpilot/{id}")
    public ResponseEntity<Pilot> updatePilot(@PathVariable("id") Long id, @RequestBody Pilot pilot){
        Pilot updatedpilot = pilotService.updatePilotById(id, pilot);
        return new ResponseEntity<>(updatedpilot, HttpStatus.OK);
    }

    @DeleteMapping("/deletepilot/{id}")
    public ResponseEntity<String> deletePilot(@PathVariable("id") Long id){
        pilotService.deletePilotById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
