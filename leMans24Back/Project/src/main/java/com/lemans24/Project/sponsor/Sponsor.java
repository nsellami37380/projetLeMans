package com.lemans24.Project.sponsor;

import javax.persistence.Entity;

@Entity
public class Sponsor {

    private Long id;
    private String name;
    private String urlLogo;

    public Sponsor(Long id, String name, String urlLogo) {
        this.id = id;
        this.name = name;
        this.urlLogo = urlLogo;
    }

    public Sponsor() {
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

    public String getUrlLogo() {
        return urlLogo;
    }

    public void setUrlLogo(String urlLogo) {
        this.urlLogo = urlLogo;
    }
}
