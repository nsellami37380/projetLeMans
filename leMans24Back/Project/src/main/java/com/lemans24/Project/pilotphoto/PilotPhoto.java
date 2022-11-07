package com.lemans24.Project.pilotphoto;



import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.lemans24.Project.pilot.Pilot;

import javax.persistence.*;
import javax.persistence.Id;


@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class PilotPhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @ManyToOne()
    private Pilot pilot;
    private String urlPhoto;

    public PilotPhoto() {
    }

    public PilotPhoto(Long id, Pilot pilot, String urlPhoto) {
        this.id = id;
        this.pilot = pilot;
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

    public Pilot getPilot() {
        return pilot;
    }

    public void setPilot(Pilot pilot) {
        this.pilot = pilot;
    }
}
