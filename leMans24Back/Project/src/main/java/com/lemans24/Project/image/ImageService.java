package com.lemans24.Project.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.awt.desktop.FilesEvent;
import java.awt.image.ImageObserver;
import java.awt.image.ImageProducer;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class ImageService {

    private static final String UPLOAD_ROOT = "upload-dir";
    private final ImageRepository repository;
    private final ResourceLoader resourceLoader;

    @Autowired
    public ImageService(ImageRepository repository, ResourceLoader resourceLoader) {
        
        this.repository = repository;
        this.resourceLoader = resourceLoader;
    }
    
    public Resource findOneImage(String filename) {
        return resourceLoader.getResource("file://" + UPLOAD_ROOT + "/" + filename);
    }
    
    public void createImage(MultipartFile file) throws IOException {
        
        if(!file.isEmpty()) {
            Files.copy(file.getInputStream(), Paths.get(UPLOAD_ROOT, file.getOriginalFilename()));
            repository.save(new Image(file.getOriginalFilename());
        }
    }

    public void deleteImage(String filename) throws IOException {
        final Image byName = repository.findByName(filename);
        repository.delete(byName);
        Files.deleteIfExists(Paths.get(UPLOAD_ROOT, filename));




}
