package com.noudh.ratethemovie.rest;

import com.noudh.ratethemovie.orm.entities.Movie;
import com.noudh.ratethemovie.orm.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/movie")
public class MovieController {

    private MovieRepository movieRepository;

    @Autowired
    public MovieController(MovieRepository movieRepository){
        this.movieRepository = movieRepository;
    }

    @GetMapping(value = "/", params = "id", produces = "application/json")
    public Optional<Movie> getMovieById(@RequestParam long id){
        return movieRepository.findById(id);
    }

    @Secured("ROLE_USER")
    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public Integer postMovie(@RequestBody Movie movie){
        return movieRepository.save(movie) != null ? 200 : 500;
    }

    @GetMapping(value = "/findByDirector", params = {"page", "size", "director"}, produces = "application/json")
    public Page<Movie> findMovieByDirector(@RequestParam int page, @RequestParam int size, @RequestParam String director){
        return movieRepository.findByDirectorName(PageRequest.of(page, size), director);
    }

    @GetMapping(value = "findByActor", params = {"page", "size", "actor"}, produces = "application/json")
    public Page<Movie> findMovieByActor(@RequestParam int page, @RequestParam int size, @RequestParam String actor){
        return movieRepository.findByActors_Actor_Name(PageRequest.of(page, size), actor);
    }
}
