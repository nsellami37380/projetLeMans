package com.lemans24.Project.CarPhoto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarPhotoRepository extends JpaRepository<CarPhoto, Long> {
}
