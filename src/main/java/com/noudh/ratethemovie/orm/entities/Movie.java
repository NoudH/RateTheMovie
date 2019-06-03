package com.noudh.ratethemovie.orm.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private String trailerUrl;

    @Column(length = 100000)
    private String imageUrl;

    @Column(length = 100000)
    private String description;

    private Integer releaseYear;

    @OneToMany(mappedBy = "movie")
    private List<Review> reviews;

    @ManyToOne
    private User user;

    @ManyToOne
    private Person director;

    @ManyToMany
    @JsonIgnoreProperties({"movies"})
    private List<Person> actors;

    @ManyToMany
    private List<GenreEntity> genres;

    public Movie(String title, String trailerUrl, String imageUrl, String description, Integer releaseYear, List<Review> reviews, User user, Person director, List<Person> actors, List<GenreEntity> genres) {
        this.title = title;
        this.trailerUrl = trailerUrl;
        this.imageUrl = imageUrl;
        this.description = description;
        this.releaseYear = releaseYear;
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

    public List<GenreEntity> getGenres() {
        return genres;
    }

    public void setGenres(List<GenreEntity> genres) {
        this.genres = genres;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
