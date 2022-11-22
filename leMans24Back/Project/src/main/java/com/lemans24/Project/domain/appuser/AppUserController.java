package com.lemans24.Project.domain.appuser;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class AppUserController {

    private final AppUserService appUserService;

    @Autowired
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<AppUser>> getAllUsers() {
        List<AppUser> userList = appUserService.getAllUsers();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<AppUser> createUser(@RequestBody AppUser appUser) throws Exception {
       AppUser newAppUser = appUserService.saveUser(appUser);
       return new ResponseEntity<>(newAppUser, HttpStatus.CREATED);
    }

    @PostMapping("/add-role-to-user")
    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserForm form) throws Exception {
        appUserService.addRoleToAppUser(form.getUsername(), form.getRoleName());
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

// On aimerait extraire les paramètres username et roleName du @RequestBody de ma méthode addRoleToUser().
// Problème : On ne peut pas écrire plus d'un seul @RequestBody
// Solution : on créé une classe pour modéliser l'objet que je reçois, à savoir :
// un objet comportant un username ainsi qu'un roleName
@Data // Lombok génère pour moi les getters & setters
class RoleToUserForm {
    private String username;
    private String roleName;
}


