package com.lemans24.Project.team;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.lemans24.Project.car.Car;
import com.lemans24.Project.pilot.Pilot;
import com.lemans24.Project.sponsor.Sponsor;

import javax.persistence.*;
import java.util.List;
@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String name;
    private String logoUrl;
    private float budget;
    @Column(name = "bio", length = 6000)
    private String bio;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "team_id", referencedColumnName = "id")
    private List<Pilot> pilotList;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "team_id", referencedColumnName = "id")
    private List<Car> carList;
   @ManyToMany(cascade = CascadeType.ALL)
    private List<Sponsor> sponsorList;// Set instead of list ???

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

