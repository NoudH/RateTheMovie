package com.noudh.ratethemovie.rest;

import com.noudh.ratethemovie.orm.entities.GenreEntity;
import com.noudh.ratethemovie.orm.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genre")
public class GenreController {

    private final GenreRepository genreRepository;

    @Autowired
    public GenreController(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public Integer postGenre(@RequestBody GenreEntity genre){
        return genreRepository.save(genre) != null ? 200 : 500;
    }

    @GetMapping(produces = "application/json")
    public List<GenreEntity> allGenres(){
        return (List<GenreEntity>) genreRepository.findAll();
    }
}
