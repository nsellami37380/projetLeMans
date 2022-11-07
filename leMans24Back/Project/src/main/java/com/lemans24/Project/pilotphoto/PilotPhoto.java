package com.lemans24.Project.pilotphoto;



import javax.persistence.*;
import javax.persistence.Id;


@Entity
public class PilotPhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    private String urlPhoto;

    public PilotPhoto() {
    }

    public PilotPhoto(String urlPhoto) {
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


}
