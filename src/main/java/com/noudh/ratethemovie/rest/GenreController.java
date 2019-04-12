package com.noudh.ratethemovie.rest;

import com.noudh.ratethemovie.orm.entities.GenreEntity;
import com.noudh.ratethemovie.orm.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/genre")
public class GenreController {

    private final GenreRepository genreRepository;

    @Autowired
    public GenreController(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public Integer postReview(@RequestBody GenreEntity genre){
        return genreRepository.save(genre) != null ? 200 : 500;
    }
}
