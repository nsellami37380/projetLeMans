package com.lemans24.Project.sponsor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/sponsors")
public class SponsorController {

    private final SponsorService sponsorService;

    @Autowired
    public SponsorController(SponsorService sponsorService) {
        this.sponsorService = sponsorService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Sponsor>> getAllSponsor(){
        List<Sponsor> sponsorList=  sponsorService.getAllSponsor();
        return new ResponseEntity<>(sponsorList, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Sponsor> addSponsor(@RequestBody Sponsor sponsor){
        Sponsor addSponsorService = sponsorService.addSponsor(sponsor);
        return new ResponseEntity<>(addSponsorService, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Sponsor> updateSponsor(@PathVariable("id") Long id,
                                                 @RequestBody Sponsor sponsor){
        Sponsor sponsorUpdated = sponsorService.updateSponsor(id, sponsor);
        return  new ResponseEntity<>(sponsorUpdated, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSponsor(@PathVariable("id") Long id){
        sponsorService.deleteSponsor(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
