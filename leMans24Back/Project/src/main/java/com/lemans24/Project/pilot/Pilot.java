package com.lemans24.Project.pilot;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.lemans24.Project.car.Car;
import com.lemans24.Project.pilotphoto.PilotPhoto;
import com.lemans24.Project.team.Team;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Pilot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String firstName;
    private String lastName;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "pilot_id", referencedColumnName = "id")
    private List<PilotPhoto> photoList;
    private Date dateOfBirth;
    private float height;
    @Column(name = "palmares", length = 6000)
    private String palmares;
    @Column(name = "bio", length = 6000)
    private String bio;
    @OneToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "car_id", referencedColumnName = "id")
    private Car car;

    @ManyToOne
    private Team team;


    public Pilot(Long id, String firstName, String lastName,
                 List<PilotPhoto> photoList, Date dateOfBirth,
                 String palmares, String bio,
                 Car car, Team team, float height) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photoList = photoList;
        this.dateOfBirth = dateOfBirth;
        this.palmares = palmares;
        this.bio = bio;
        this.car = car;
        this.team = team;
        this.height = height;
    }

    public Pilot() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public List<PilotPhoto> getPhotoList() {
        return photoList;
    }

    public void setPhotoList(List<PilotPhoto> photoList) {
        this.photoList = photoList;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPalmares() {
        return palmares;
    }

    public void setPalmares(String palmares) {
        this.palmares = palmares;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public float getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;
    }
}
