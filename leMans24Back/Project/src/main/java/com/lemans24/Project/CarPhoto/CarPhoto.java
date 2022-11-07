package com.lemans24.Project.CarPhoto;

import javax.persistence.Entity;

@Entity
public class CarPhoto {

    private Long id;
    private String urlPhoto;

    public CarPhoto(Long id, String urlPhoto) {
        this.id = id;
        this.urlPhoto = urlPhoto;
    }

    public CarPhoto() {
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
}
