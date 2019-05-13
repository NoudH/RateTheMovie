package com.noudh.ratethemovie.rest;

import com.noudh.ratethemovie.configuration.JwtTokenProvider;
import com.noudh.ratethemovie.orm.entities.User;
import com.noudh.ratethemovie.orm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserController(UserRepository userRepository, JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping(value = "/login", produces = "application/json")
    public ResponseEntity login(@RequestBody User user) throws IOException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            String token = jwtTokenProvider.createToken(user.getUsername(), Collections.singletonList(this.userRepository.findByUsername(user.getUsername()).getUserRole().toString()));

            Map<Object, Object> model = new HashMap<>();
            model.put("username", user.getUsername());
            model.put("token", token);
            return ResponseEntity.ok(model);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password supplied");
        }
    }

    @PostMapping(value = "/register", consumes = "application/json", produces = "application/json")
    public int register(User user){
        return userRepository.save(user) != null ? 200 : 500;
    }

    @GetMapping(value = "/details", produces = "application/json")
    public Map<Object, Object> userDetails(@RequestHeader (name="Authorization") String token){
        Map<Object, Object> model = new HashMap<>();
        model.put("username", jwtTokenProvider.getUsername(token));
        model.put("roles", jwtTokenProvider.getAuthentication(token).getAuthorities());
        return model;
    }
}
