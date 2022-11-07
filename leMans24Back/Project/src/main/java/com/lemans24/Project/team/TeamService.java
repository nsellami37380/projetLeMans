package com.lemans24.Project.team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {

    private final  TeamRepository teamRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<Team> getAllTeam(){
        return teamRepository.findAll();
    }

    public Team addTeam(Team team){
        return teamRepository.save(team);
    }

    public Team updateTeam(Long id, Team team){
        Team teamFoundToUpdate = teamRepository.findById(id)
                .orElseThrow(()-> new IllegalStateException("id" + id + " not found"));
        teamFoundToUpdate.setName(team.getName());
        teamFoundToUpdate.setBio(team.getBio());
        teamFoundToUpdate.setLogoUrl(team.getLogoUrl());
        teamFoundToUpdate.setBudget(team.getBudget());
        teamFoundToUpdate.setPilotList(team.getPilotList());
        teamFoundToUpdate.setCarList(team.getCarList());
        return teamRepository.save(teamFoundToUpdate);
    }

    public void deleteTeam(Long id){
        teamRepository.deleteById(id);
    }
}
