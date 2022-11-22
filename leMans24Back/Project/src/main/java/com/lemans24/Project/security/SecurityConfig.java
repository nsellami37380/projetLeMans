package com.lemans24.Project.security;


import com.lemans24.Project.domain.role.ERole;
import com.lemans24.Project.filter.CustomAuthenticationFilter;
import com.lemans24.Project.filter.JwtAuthorizationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public SecurityConfig(UserDetailsService userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDetailsService = userDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    // Cette méthode permet d'authentifier un utilisateur.
    // Elle a recours au service UserDetails (déjà configuré par Spring Security)
    // Elle utilise un système de cryptage de mots de passe, également déja défini par Spring Security
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors(); // On délègue à Spring la gestion des CORS
        http.csrf().disable(); // On implémente le JWT : pas besoin de la protection csrf
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.authorizeRequests()
                .antMatchers(POST, "/login").permitAll() // Tout le monde peut accéder à l'URL "/login"
                .antMatchers(GET, "/api/users/all").hasRole(ERole.ADMIN.name()) // Seuls les utilisateurs au rôle ADMIN sont autorisés à accéder à l'url "/users/**"
                .antMatchers(GET,"/api/roles/**").hasRole(ERole.USER.name()) // idem mais pour USER et "/roles/**"
                .anyRequest().authenticated(); // Chaque requête (sauf celles en .permitAll()) doivent être des requêtes authentifiées

        // J'ajoute mes filtres personnalisés (écrits dans le package filter)
        http.addFilter(new CustomAuthenticationFilter(authenticationManagerBean()));
        // J'ajoute le filtre JwtAuthorizationFilter AVANT le filtre UsernamePasswordAuthenticationFilter
        // Ce filtre UsernamePasswordAuthenticationFilter correspond à notre CustomAuthenticationFilter.
        http.addFilterBefore(new JwtAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

    }

    // Implémentation de la configuration des CORS
    // Le nom de la méthode (corsConfigurationSource) est  très important : car Spring Security appelle cette méthode par défaut
    // Lorsque je lui délègue la gestion des CORS
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean // #Mister
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


}
