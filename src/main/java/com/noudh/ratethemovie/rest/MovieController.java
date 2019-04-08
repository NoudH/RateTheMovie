package com.noudh.ratethemovie.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/movie")
public class MovieController {

    @RolesAllowed({"ROLE_ADMIN"})
    @GetMapping(value = "/{id}", produces = "application/json")
    public String getMovie(@PathVariable int id){
        return "movie " + id;
    }

    @RolesAllowed({"ROLE_ADMIN", "ROLE_USER"})
    @GetMapping(value = "/test/{id}", produces = "application/json")
    public String getTest(@PathVariable int id){
        return "movie " + id;
    }

    @GetMapping(value = "/nosec/{id}", produces = "application/json")
    public String getTestNoSec(@PathVariable int id){
        return "movie " + id;
    }

}
