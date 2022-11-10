package com.lemans24.Project.picture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin()
@RequestMapping(path = "picture")
public class PictureController {

    private final PictureService pictureService;

    @Autowired
    public PictureController(PictureService pictureService) {
        this.pictureService = pictureService;
    }

    @PostMapping("/add")
    public Picture addPicture(@RequestParam("myFile")MultipartFile file) throws IOException{
        Picture img = new Picture
                (
                file.getOriginalFilename(),
                file.getContentType(),
                file.getBytes()
                );
        final Picture savedImage = pictureService.addPicture(img);

        System.out.println("savedImage");

        return savedImage;

    }
}
