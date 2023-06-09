package com.noudh.ratethemovie.orm.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

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

    @Column(length = 100000)
    private String comment;

    private Date date;

    public Review(Integer rating, User user, Movie movie, String comment, Date date) {
        this.rating = rating;
        this.user = user;
        this.movie = movie;
        this.comment = comment;
        this.date = date;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
