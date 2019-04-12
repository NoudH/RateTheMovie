package com.noudh.ratethemovie.rest;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/debug")
public class DebugController {

    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    @GetMapping(value = "/login", produces = "application/json")
    public int login(){
        return 200;
    }
}
