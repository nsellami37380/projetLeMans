package com.lemans24.Project.sponsor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SponsorService {
    private final SponsorRepository sponsorRepository;

    @Autowired
    public SponsorService(SponsorRepository sponsorRepository) {
        this.sponsorRepository = sponsorRepository;
    }

    public List<Sponsor> getAllSponsor(){
        return sponsorRepository.findAll();
    }

    public Sponsor addSponsor(Sponsor sponsor){
        return sponsorRepository.save(sponsor);
    }

    public Sponsor updateSponsor(Long id, Sponsor sponsor){
        Sponsor sponsorFoundById = sponsorRepository.findById(id)
                .orElseThrow(()-> new IllegalStateException("id " + id + " not found"));
        sponsorFoundById.setName(sponsor.getName());
        sponsorFoundById.setUrlLogo(sponsor.getUrlLogo());
        return sponsorRepository.save(sponsorFoundById);
    }

    public void deleteSponsor(Long id){
        sponsorRepository.deleteById(id);
    }
}


