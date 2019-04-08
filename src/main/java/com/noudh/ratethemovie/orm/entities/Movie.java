package com.noudh.ratethemovie.orm.entities;

import com.noudh.ratethemovie.models.Genre;

import javax.persistence.*;
import java.util.List;

@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String trailerUrl;
    private String imageUrl;
    private List<Review> reviews;
    @ManyToOne
    private User user;
    @ManyToOne
    private Person director;
    @ManyToMany
    private List<Person> actors;
    @ManyToMany
    private List<Genre> genres;

    public Movie(String title, String trailerUrl, String imageUrl, List<Review> reviews, User user, Person director, List<Person> actors, List<Genre> genres) {
        this.title = title;
        this.trailerUrl = trailerUrl;
        this.imageUrl = imageUrl;
        this.reviews = reviews;
        this.user = user;
        this.director = director;
        this.actors = actors;
        this.genres = genres;
    }

    public Movie() { }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTrailerUrl() {
        return trailerUrl;
    }

    public void setTrailerUrl(String trailerUrl) {
        this.trailerUrl = trailerUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Person getDirector() {
        return director;
    }

    public void setDirector(Person director) {
        this.director = director;
    }

    public List<Person> getActors() {
        return actors;
    }

    public void setActors(List<Person> actors) {
        this.actors = actors;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }
}
