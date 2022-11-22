package com.lemans24.Project.filter;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lemans24.Project.util.JwtUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

public class JwtAuthorizationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        if(request.getServletPath().equals("/login")){
            filterChain.doFilter(request, response);
        } else {
            String authorizationHeader = request.getHeader(AUTHORIZATION);
            if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
                try {
                    JwtUtil jwtUtil = new JwtUtil();
                    DecodedJWT decodedJWT = jwtUtil.verifyAndGetDecoderJwt(authorizationHeader);
                    String username = decodedJWT.getSubject();
                    Collection<SimpleGrantedAuthority> authorities = getRolesAndGrantedAuthorities(decodedJWT);
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, null , authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);

                    filterChain.doFilter(request, response);
                } catch (Exception exception) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType(APPLICATION_JSON_VALUE);
                    response.setHeader("error", exception.getMessage());

                    Map<String, String> error = new HashMap<>();
                    error.put("error_message", exception.getMessage());

                    if(exception.getClass().getName().equals("com.auth0.jwt.exceptions.TokenExpiredException")){
                        error.put("is_token_expired", "true");
                    }

                    new ObjectMapper().writeValue(response.getOutputStream(), error);
                }
            } else{
                filterChain.doFilter(request, response);
            }
        }

    }

    private Collection<SimpleGrantedAuthority> getRolesAndGrantedAuthorities(DecodedJWT decodedJWT){
        String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

        stream(roles).forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role));
        });

        return authorities;
    }
}
