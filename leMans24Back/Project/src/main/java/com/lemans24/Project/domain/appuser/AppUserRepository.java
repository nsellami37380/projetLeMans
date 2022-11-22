package com.lemans24.Project.domain.appuser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    // La méthode n'est pas présente par défaut avec JPA
    // Comme notre authentification est basée sur le username, on ajoute ici une méthode findByUsername
    // les mots "findBy" sont importants : JPA comprend de lui-même ce que cela signifie
    public AppUser findByUsername(String username);
}
