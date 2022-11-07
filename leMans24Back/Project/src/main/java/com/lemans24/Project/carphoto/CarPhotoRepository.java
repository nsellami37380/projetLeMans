package com.lemans24.Project.carphoto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarPhotoRepository extends JpaRepository<CarPhoto, Long> {
}
