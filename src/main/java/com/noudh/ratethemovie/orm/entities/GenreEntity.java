package com.noudh.ratethemovie.orm.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.noudh.ratethemovie.models.Genre;

import javax.persistence.*;
import java.util.List;

@Entity(name = "genre")
public class GenreEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private Long id;

    @Enumerated(EnumType.STRING)
    private Genre genre;

    @ManyToMany
    @JsonIgnore
    private List<Movie> movies;

    public GenreEntity(Long id, Genre genre, List<Movie> movies) {
        this.id = id;
        this.genre = genre;
        this.movies = movies;
    }

    public GenreEntity() { }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Long getId() {
        return id;
    }
}
