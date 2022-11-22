package com.lemans24.Project.domain.appuser;

import com.lemans24.Project.domain.role.Role;
import com.lemans24.Project.domain.role.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class AppUserService implements UserDetailsService {

    private final AppUserRepository appUserRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public AppUserService(AppUserRepository appUserRepository, RoleRepository roleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.appUserRepository = appUserRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser userAlreadyExists = appUserRepository.findByUsername(username);
        if(userAlreadyExists == null) {
            System.out.println("L'utilisateur n'a pas été trouvé en BDD");
            throw new UsernameNotFoundException("User could not be found in the database");
        } else {
            System.out.println("L'utilisateur a été trouvé 🥳 " + username);
        }
        // J'ai récupéré mon utilisateur. Cet utilisateur est lié à un ou plusieurs rôles.
        // Spring security ne comprend pas le "rôles" mais comprend la notion de "authorities"
        // La notion est la même : simplement Spring Security ne comprend que "authorities"
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        userAlreadyExists.getRoleList().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        // Je construis un nouvel objet User, qui est l'objet utilisateur de Spring Security
        // Cet objet User (Security) est construit à partir de l'objet User (AppUser) que j'ai créé
        return new User(userAlreadyExists.getUsername(), userAlreadyExists.getPassword(), authorities);
    }

    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    public AppUser saveUser(AppUser appUser) throws Exception {
       AppUser userAlreadyExists = appUserRepository.findByUsername(appUser.getUsername());
       if(userAlreadyExists == null) {
           System.out.println("Je sauvegarde l'utilisateur suivant en BDD 🥳: " + appUser.getUsername());
           appUser.setPassword(bCryptPasswordEncoder.encode(appUser.getPassword()));
           return appUserRepository.save(appUser);
       } else {
           System.out.println("Nom d'utilisateur déjà pris : Oh noOooOon 😱");
           throw new Exception("Username already taken");
       }
    }

    public void addRoleToAppUser(String username, String roleName) throws Exception {
        AppUser userAlreadyExists = appUserRepository.findByUsername(username);
        if(userAlreadyExists == null) {
            throw new Exception("Username dosen't exist");
        } else {
            Role role = roleRepository.findByName(roleName);
            userAlreadyExists.getRoleList().add(role);
            appUserRepository.save(userAlreadyExists);
        }
    }

}
