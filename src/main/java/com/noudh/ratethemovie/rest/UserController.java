package com.noudh.ratethemovie.rest;

import com.noudh.ratethemovie.orm.entities.User;
import com.noudh.ratethemovie.orm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    @GetMapping(value = "/login", produces = "application/json")
    public void login(HttpServletResponse response) throws IOException {
        response.sendRedirect("http://localhost:3000/");
    }

    @PostMapping(value = "/register", consumes = "application/json", produces = "application/json")
    public int register(User user){
        return userRepository.save(user) != null ? 200 : 500;
    }
}
