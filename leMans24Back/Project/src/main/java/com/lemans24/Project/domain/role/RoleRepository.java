package com.lemans24.Project.domain.role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    // Méthode personnalisée : c'est la même démarche que pour la méthode findByUsername() du AppUserRepository
    public Role findByName(String name);
}
