package com.lemans24.Project.sponsor;

import com.lemans24.Project.team.Team;

import javax.persistence.*;
import java.util.List;

@Entity
public class Sponsor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // AUTO_INCREMENT
    @Column(nullable = false, updatable = false) // NOT NULL NOT UPDATE
    private Long id;
    private String name;
    private String urlLogo;
    @ManyToMany(mappedBy = "sponsorList")
    private List<Team> teamList;

    public Sponsor() {
    }
    public Sponsor(Long id, String name, String urlLogo, List<Team> teamList) {
        this.id = id;
        this.name = name;
        this.urlLogo = urlLogo;
        this.teamList = teamList;
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

    public List<Team> getTeamList() {
        return teamList;
    }

    public void setTeamList(List<Team> teamList) {
        this.teamList = teamList;
    }
}
