package com.lemans24.Project.picture;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
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
        //String pathname  = "Images/Teams/" + file.getOriginalFilename();
        String pathname  = "C:/Users/nourr/OneDrive/Bureau/projetLeMans/leMans24/src/assets/" + file.getOriginalFilename();
        FileOutputStream fos = new FileOutputStream(pathname);
        fos.write(file.getBytes());

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
