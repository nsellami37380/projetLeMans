package com.lemans24.Project.carphoto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.lemans24.Project.car.Car;

import javax.persistence.*;

@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class CarPhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT
    @Column(nullable = false, updatable = false) // NOT NULL NOT UPDATE
    private Long id;

    @ManyToOne()
    private Car car;
    private String urlPhoto;

    public CarPhoto() {
    }
    public CarPhoto(Long id, Car car, String urlPhoto) {
        this.id = id;
        this.car = car;
        this.urlPhoto = urlPhoto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrlPhoto() {
        return urlPhoto;
    }

    public void setUrlPhoto(String urlPhoto) {
        this.urlPhoto = urlPhoto;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }
}
