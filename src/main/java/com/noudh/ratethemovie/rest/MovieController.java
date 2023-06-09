package com.noudh.ratethemovie.rest;

import com.noudh.ratethemovie.models.Genre;
import com.noudh.ratethemovie.orm.entities.GenreEntity;
import com.noudh.ratethemovie.orm.entities.Movie;
import com.noudh.ratethemovie.orm.repository.GenreRepository;
import com.noudh.ratethemovie.orm.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private MovieRepository movieRepository;
    private GenreRepository genreRepository;

    @Autowired
    public MovieController(MovieRepository movieRepository, GenreRepository genreRepository) {
        this.movieRepository = movieRepository;
        this.genreRepository = genreRepository;
    }

    @GetMapping(value = "/", params = "id", produces = "application/json")
    public Optional<Movie> getMovieById(@RequestParam long id) {
        return movieRepository.findById(id);
    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public Integer postMovie(@RequestBody Movie movie) {
        movie.setGenres(genreRepository.findByGenreIn(movie.getGenres().stream().map(GenreEntity::getGenre).collect(Collectors.toList())));
        return movieRepository.save(movie) != null ? 200 : 500;
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping(value = "/", produces = "application/json")
    public Integer deleteMovie(@RequestParam Long id){
        movieRepository.deleteById(id);
        return 200;
    }

    @GetMapping(value = "/findByDirector", params = {"page", "size", "director"}, produces = "application/json")
    public Page<Movie> findMovieByDirector(@RequestParam int page, @RequestParam int size, @RequestParam String director) {
        return movieRepository.findByDirectorName(director, PageRequest.of(page, size));
    }

    @GetMapping(value = "/findByGenre", produces = "application/json")
    public Page<Movie> findMovieByGenre(@RequestParam int page, @RequestParam int size, @RequestParam Genre genre) {
        return movieRepository.findByGenres_Genre(genre, PageRequest.of(page, size));
    }

    @GetMapping(value = "/findByReleaseYear", produces = "application/json")
    public Page<Movie> findMovieByReleaseYear(@RequestParam int page, @RequestParam int size, @RequestParam Integer year) {
        return movieRepository.findByReleaseYear(year, PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "releaseYear")));
    }

    @GetMapping(value = "/all", produces = "application/json")
    public Page<Movie> allMoviesSortedByReleaseYear(@RequestParam int page, @RequestParam int size) {
        return movieRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "releaseYear")));
    }

    @GetMapping(value = "/findByMinRating", produces = "application/json")
    public Page<Movie> findByMinRating(@RequestParam int page, @RequestParam int size, @RequestParam Double rating){
        return movieRepository.findByRating(rating, PageRequest.of(page, size));
    }

    @GetMapping(value = "/findByTitle", produces = "application/json")
    public Page<Movie> findByTitle(@RequestParam int page, @RequestParam int size, @RequestParam String title){
        return movieRepository.findByTitleContaining(title, PageRequest.of(page, size));
    }

    @GetMapping(value = "/browse", produces = "application/json")
    public Page<Movie> browseMovies(@RequestParam int page,
                                    @RequestParam int size,
                                    @RequestParam(required = false) String title,
                                    @RequestParam(required = false, defaultValue = "0") Integer year,
                                    @RequestParam(required = false, defaultValue = "0") Double rating,
                                    @RequestParam(required = false) Genre genre
    ){
        return movieRepository.findByTitleContainingAndRatingAndReleaseYearAndGenres(title == null ? "" : title, rating, year, genre, PageRequest.of(page, size));
    }
}
