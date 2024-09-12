package com.lemans24.Project;

import com.lemans24.Project.domain.appuser.AppUser;
import com.lemans24.Project.domain.appuser.AppUserService;
import com.lemans24.Project.domain.role.Role;
import com.lemans24.Project.domain.role.RoleService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class LeMans24Application {

	public static void main(String[] args) {
		SpringApplication.run(LeMans24Application.class, args);
	}

	@Bean
	BCryptPasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner run(AppUserService appUserService, RoleService roleService){
		return args -> {
			roleService.saveRole(new Role(null,"ROLE_USER"));
			roleService.saveRole(new Role(null, "ROLE_MANAGER"));
			roleService.saveRole(new Role(null, "ROLE_ADMIN"));

			appUserService.saveUser(new AppUser(null,"James","james-bond","007", new ArrayList<>()));
			appUserService.saveUser(new AppUser(null,"Calamity","calamity-jane","008", new ArrayList<>()));
			appUserService.saveUser(new AppUser(null,"MarvinWizard","marvin-wizard","009", new ArrayList<>()));

			appUserService.addRoleToAppUser("james-bond","ROLE_USER");
			appUserService.addRoleToAppUser("james-bond","ROLE_MANAGER");
			appUserService.addRoleToAppUser("james-bond","ROLE_ADMIN");

			appUserService.addRoleToAppUser("calamity-jane","ROLE_USER");

			appUserService.addRoleToAppUser("marvin-wizard","ROLE_USER");
			appUserService.addRoleToAppUser("marvin-wizard","ROLE_MANAGER");
		};
	}

}

