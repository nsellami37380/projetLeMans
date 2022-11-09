package com.lemans24.Project.image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.awt.*;

@Repository
public interface ImageRepository extends PagingAndSortingRepository<Image, Long> {
    public Image findByName(String filename);
}
