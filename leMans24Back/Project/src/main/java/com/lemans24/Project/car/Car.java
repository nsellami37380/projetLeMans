package com.lemans24.Project.car;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.lemans24.Project.carphoto.CarPhoto;
import com.lemans24.Project.pilot.Pilot;
import com.lemans24.Project.team.Team;

import javax.persistence.*;
import java.util.List;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)

    private Long id;
    private List<CarPhoto> photoList;
    private String modelName;
    private String engine;
    private float power;
    private float maxSpeed;
    private float acceleration;
    private String bio;
    private Team team;
    private Pilot pilot;

    public Car(Long id,
               List<CarPhoto> photoList,
               String modelName,
               String engine,
               float power,
               float maxSpeed,
               float acceleration,
               String bio,
               Team team,
               Pilot pilot) {
        this.id = id;
        this.photoList = photoList;
        this.modelName = modelName;
        this.engine = engine;
        this.power = power;
        this.maxSpeed = maxSpeed;
        this.acceleration = acceleration;
        this.bio = bio;
        this.team = team;
        this.pilot = pilot;
    }

    public Car() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<CarPhoto> getPhotoList() {
        return photoList;
    }

    public void setPhotoList(List<CarPhoto> photoList) {
        this.photoList = photoList;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getEngine() {
        return engine;
    }

    public void setEngine(String engine) {
        this.engine = engine;
    }

    public float getPower() {
        return power;
    }

    public void setPower(float power) {
        this.power = power;
    }

    public float getMaxSpeed() {
        return maxSpeed;
    }

    public void setMaxSpeed(float maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    public float getAcceleration() {
        return acceleration;
    }

    public void setAcceleration(float acceleration) {
        this.acceleration = acceleration;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public Pilot getPilot() {
        return pilot;
    }

    public void setPilot(Pilot pilot) {
        this.pilot = pilot;
    }
}
