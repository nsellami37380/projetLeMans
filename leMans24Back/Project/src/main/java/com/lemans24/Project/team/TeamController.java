package com.lemans24.Project.team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/teams")

public class TeamController {

    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Team>> getAllTeam(){
        List<Team> teamList = teamService.getAllTeam();
        return new ResponseEntity<>(teamList, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Team> addTeam(@RequestBody Team team){
        Team newTeam = teamService.addTeam(team);
        return new ResponseEntity<>(newTeam, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable("id") Long id,
                                           @RequestBody Team team){
    Team updateTeam = teamService.updateTeam(id, team);
    return new ResponseEntity<>(updateTeam, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTeam(@PathVariable("id") Long id) {
    teamService.deleteTeam(id);
    return new ResponseEntity<>(HttpStatus.OK);
    }
}
