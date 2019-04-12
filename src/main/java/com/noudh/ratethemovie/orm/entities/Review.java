package com.noudh.ratethemovie.orm.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Integer rating;

    @ManyToOne
    private User user;

    @ManyToOne
    @JsonIgnore
    private Movie movie;

    private String comment;

    public Review(Integer rating, User user, Movie movie, String comment) {
        this.rating = rating;
        this.user = user;
        this.movie = movie;
        this.comment = comment;
    }

    public Review() { }

    public Long getId() {
        return id;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }
}
