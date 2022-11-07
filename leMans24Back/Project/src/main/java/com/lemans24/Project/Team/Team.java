package com.lemans24.Project.Team;
import com.lemans24.Project.Sponsor.Sponsor;

import javax.persistence.*;
import java.util.List;
@Entity
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String name;
    private String logoUrl;
    private float budget;
    private String bio;
    private List<Pilot> pilotList;
    private List<Car> carList;
    private List<Sponsor> sponsorList;

    public Team(Long id, String name, String logoUrl, float budget, String bio, List<Pilot> pilotList, List<Car> carList, List<Sponsor> sponsorList) {
        this.id = id;
        this.name = name;
        this.logoUrl = logoUrl;
        this.budget = budget;
        this.bio = bio;
        this.pilotList = pilotList;
        this.carList = carList;
        this.sponsorList = sponsorList;
    }

    public Team() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public float getBudget() {
        return budget;
    }

    public void setBudget(float budget) {
        this.budget = budget;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public List<Pilot> getPilotList() {
        return pilotList;
    }

    public void setPilotList(List<Pilot> pilotList) {
        this.pilotList = pilotList;
    }

    public List<Car> getCarList() {
        return carList;
    }

    public void setCarList(List<Car> carList) {
        this.carList = carList;
    }

    public List<Sponsor> getSponsorList() {
        return sponsorList;
    }

    public void setSponsorList(List<Sponsor> sponsorList) {
        this.sponsorList = sponsorList;
    }
}

