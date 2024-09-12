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

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "car_id", referencedColumnName = "id")
    private List<CarPhoto> carPhotoList;
    private String modelName;
    private String engine;
    private float power;
    private float maxSpeed;
    private float acceleration;
    @Column(name = "bio", length = 6000)
    private String bio;
    @ManyToOne()
    private Team team;
    @OneToOne(mappedBy = "car")
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
        this.carPhotoList = photoList;
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

    public List<CarPhoto> getCarPhotoList() {
        return carPhotoList;
    }

    public void setCarPhotoList(List<CarPhoto> carPhotoList) {
        this.carPhotoList = carPhotoList;
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
