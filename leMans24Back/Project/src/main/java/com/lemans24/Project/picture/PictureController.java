package com.lemans24.Project.picture;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

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
    public void addPicture(@RequestParam("myFile")MultipartFile file) throws IOException{
        //String pathname  = "Images/Teams/" + file.getOriginalFilename();
       // projectPath : C:\Users\nourr\OneDrive\Bureau\projetLeMans\leMans24Back\Project
      /*  String projectPath = System.getProperty("user.dir");
        Path path = Paths.get(projectPath);
        Path parent = path.getParent().getParent() ;

        System.out.println("Parent :" + parent);
        String assetsPath = parent.toString() + ("/leMans24/src/assets/");

        System.out.println("Existence du path : " + Files.exists(Paths.get(assetsPath)));*/
         String pathname  = System.getenv("assetsPath") + file.getOriginalFilename();

         System.out.println("PathVariable" + System.getenv("assetsPath"));

        FileOutputStream fos = new FileOutputStream(pathname);
        fos.write(file.getBytes());

        /*Picture img = new Picture
                (
                file.getOriginalFilename(),
                file.getContentType(),
                file.getBytes()
                );
        final Picture savedImage = pictureService.addPicture(img);

        System.out.println("savedImage");

        return savedImage;*/

    }
}
